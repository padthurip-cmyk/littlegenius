// netlify/functions/transcribe.js
// Serverless proxy: receives audio blob from app, sends to Deepgram, returns transcript
// API key is stored in Netlify environment variable — never exposed to client

export default async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const DEEPGRAM_KEY = process.env.DEEPGRAM_API_KEY;
  if (!DEEPGRAM_KEY) {
    return new Response(JSON.stringify({ error: "Server not configured" }), { status: 500 });
  }

  try {
    // Get audio blob and expected word from request
    const contentType = req.headers.get("content-type") || "audio/webm";
    const expectedWord = req.headers.get("x-expected-word") || "";
    const audioBody = await req.arrayBuffer();

    if (audioBody.byteLength < 500) {
      return new Response(JSON.stringify({ transcript: "", alternatives: [] }), { status: 200 });
    }

    // Build Deepgram query params
    const params = new URLSearchParams({
      model: "nova-3",
      language: "en",
      smart_format: "true",
      punctuate: "false",
      diarize: "false",
      alternatives: "5",
    });

    // Add keyword boosting for expected word
    if (expectedWord) {
      params.append("keywords", expectedWord);
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
      return new Response(JSON.stringify({ transcript: "", error: "transcription_failed" }), { status: 200 });
    }

    const data = await dgResp.json();
    const channel = data?.results?.channels?.[0];

    if (channel?.alternatives?.length) {
      const alts = channel.alternatives
        .map(a => (a.transcript || "").toLowerCase().trim())
        .filter(Boolean);
      const confidence = channel.alternatives[0]?.confidence || 0;
      return new Response(JSON.stringify({ transcript: alts[0] || "", alternatives: alts, confidence }), { status: 200 });
    }

    return new Response(JSON.stringify({ transcript: "", alternatives: [] }), { status: 200 });
  } catch (e) {
    console.error("Transcribe function error:", e);
    return new Response(JSON.stringify({ transcript: "", error: e.message }), { status: 200 });
  }
};
