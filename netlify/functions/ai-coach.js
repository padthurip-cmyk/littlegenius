const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "POST only" }) };
  }

  const apiKey = process.env.ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Set ANTHROPIC_KEY in Netlify > Site Settings > Environment Variables" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const models = [
    "claude-3-5-sonnet-20241022",
    "claude-3-haiku-20240307"
  ];

  for (const model of models) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 500,
          system: body.system || "",
          messages: body.messages || []
        })
      });

      const data = await response.json();

      if (response.ok) {
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      }

      // Model not found — try next
      if (response.status === 404) continue;

      // Other error — return it
      return { statusCode: response.status, headers, body: JSON.stringify(data) };
    } catch (fetchError) {
      continue;
    }
  }

  return { statusCode: 500, headers, body: JSON.stringify({ error: "All models failed. Check your API key." }) };
};

module.exports = { handler };
