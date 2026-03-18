// netlify/functions/transcribe.js
// Serverless proxy: receives audio blob from app, sends to Deepgram, returns transcript
// API key is stored in Netlify environment variable — never exposed to client

const jsonResponse = (data, status = 200) => new Response(
  JSON.stringify(data),
  { status, headers: { "Content-Type": "application/json" } }
);

export default async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const DEEPGRAM_KEY = process.env.DEEPGRAM_API_KEY;
  if (!DEEPGRAM_KEY) {
    return jsonResponse({ error: "DEEPGRAM_API_KEY not set in Netlify env vars" }, 500);
  }

  try {
    // Get audio blob and expected word from request
    const contentType = req.headers.get("content-type") || "audio/webm";
    const expectedWord = req.headers.get("x-expected-word") || "";
    const audioBody = await req.arrayBuffer();

    if (audioBody.byteLength < 500) {
      return jsonResponse({ transcript: "", alternatives: [] });
    }

    // Build Deepgram query params — only safe Nova-3 params
    const params = new URLSearchParams({
      model: "nova-3",
      language: "en",
      punctuate: "false",
      diarize: "false",
    });

    // Add keyword boosting for expected word (Nova-3 uses "keyterm")
    if (expectedWord) {
      params.append("keyterm", expectedWord);
    }

    // Forward to Deepgram
    const dgResp = await fetch(`https://api.deepgram.com/v1/listen?${params.toString()}`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${DEEPGRAM_KEY}`,
        "Content-Type": contentType,
      },
      body: audioBody,
    });

    if (!dgResp.ok) {
      const errText = await dgResp.text().catch(() => "");
      console.error("Deepgram error:", dgResp.status, errText);
      return jsonResponse({ transcript: "", error: "deepgram_" + dgResp.status + ": " + errText.substring(0, 200) });
    }

    const data = await dgResp.json();
    const channel = data?.results?.channels?.[0];

    if (channel?.alternatives?.length) {
      const alts = channel.alternatives
        .map(a => (a.transcript || "").toLowerCase().trim())
        .filter(Boolean);
      const confidence = channel.alternatives[0]?.confidence || 0;
      return jsonResponse({ transcript: alts[0] || "", alternatives: alts, confidence });
    }

    return jsonResponse({ transcript: "", alternatives: [] });
  } catch (e) {
    console.error("Transcribe function error:", e);
    return jsonResponse({ transcript: "", error: e.message });
  }
};
