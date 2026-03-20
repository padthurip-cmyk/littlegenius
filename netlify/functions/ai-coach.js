export default async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers });
  }

  const apiKey = process.env.ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_KEY not set in Netlify environment variables" }),
      { status: 500, headers }
    );
  }

  try {
    const body = await req.json();

    const models = ["claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"];
    let lastError = null;

    for (const model of models) {
      try {
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
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

        const data = await resp.json();

        if (resp.ok) {
          return new Response(JSON.stringify(data), { status: 200, headers });
        }

        if (resp.status === 404 || (data.error && data.error.type === "not_found_error")) {
          lastError = data;
          continue;
        }

        return new Response(JSON.stringify(data), { status: resp.status, headers });
      } catch (fetchErr) {
        lastError = { error: fetchErr.message };
        continue;
      }
    }

    return new Response(
      JSON.stringify({ error: "All models failed: " + JSON.stringify(lastError) }),
      { status: 500, headers }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error: " + e.message }),
      { status: 500, headers }
    );
  }
};
