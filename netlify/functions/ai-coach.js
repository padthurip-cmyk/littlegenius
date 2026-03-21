exports.handler = async (event) => {
  const H = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: H, body: "" };

  const apiKey = process.env.ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;

  if (event.httpMethod === "GET") {
    const masked = apiKey ? apiKey.slice(0,10) + "..." + apiKey.slice(-4) : "NOT SET";
    return { statusCode: 200, headers: H, body: JSON.stringify({ key_loaded: !!apiKey, key_preview: masked }) };
  }

  if (event.httpMethod !== "POST") return { statusCode: 405, headers: H, body: JSON.stringify({ error: "POST only" }) };
  if (!apiKey) return { statusCode: 500, headers: H, body: JSON.stringify({ error: "No API key" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) {
    return { statusCode: 400, headers: H, body: JSON.stringify({ error: "Bad JSON" }) };
  }

  const models = [
    "claude-haiku-4-5-20251001",
    "claude-sonnet-4-5-20250929",
    "claude-3-5-haiku-20241022",
  ];

  for (const model of models) {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 500,
          system: body.system || "",
          messages: body.messages || [],
        }),
      });

      const text = await r.text();
      if (r.status === 200) return { statusCode: 200, headers: H, body: text };
      if (r.status === 404) continue;
      return { statusCode: r.status, headers: H, body: text };
    } catch (e) { continue; }
  }

  return { statusCode: 500, headers: H, body: JSON.stringify({ error: "All models failed" }) };
};
