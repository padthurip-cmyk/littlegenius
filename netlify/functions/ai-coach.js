const https = require("https");

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "POST only" }) };
  }

  const apiKey = process.env.ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "ANTHROPIC_KEY env var not set" }) };
  }

  let body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Bad JSON" }) };
  }

  // Use node https instead of fetch for maximum compatibility
  const callAnthropic = (model) => new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model,
      max_tokens: 500,
      system: body.system || "",
      messages: body.messages || [],
    });

    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: { error: "Parse fail: " + data.slice(0, 200) } });
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.setTimeout(25000, () => { req.destroy(); reject(new Error("Timeout")); });
    req.write(payload);
    req.end();
  });

  const models = ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"];

  for (const model of models) {
    try {
      const result = await callAnthropic(model);
      if (result.status === 200) {
        return { statusCode: 200, headers, body: JSON.stringify(result.data) };
      }
      if (result.status === 404) continue; // model not found, try next
      // Other error — return it with details
      return { statusCode: result.status, headers, body: JSON.stringify(result.data) };
    } catch (e) {
      continue;
    }
  }

  return { statusCode: 500, headers, body: JSON.stringify({ error: "All models failed. Check API key." }) };
};
