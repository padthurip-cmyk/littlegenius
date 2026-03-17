// ═══ WHISPER AI WEB WORKER ═══
// Runs OpenAI's Whisper speech recognition model off the main thread.
// Model loads once (~40MB) and is cached in IndexedDB permanently.
// Subsequent loads take 1-2 seconds from cache.

import { pipeline } from '@huggingface/transformers';

let transcriber = null;
let isLoading = false;

// ═══ LOAD MODEL ═══
async function loadModel() {
  if (transcriber) {
    self.postMessage({ type: 'ready' });
    return;
  }
  if (isLoading) return;
  isLoading = true;

  try {
    self.postMessage({ type: 'loading', progress: 0, message: 'Downloading Whisper AI...' });

    transcriber = await pipeline(
      'automatic-speech-recognition',
      'onnx-community/whisper-tiny.en',
      {
        dtype: 'q4',          // 4-bit quantized — smallest + fastest
        device: 'wasm',       // WebAssembly — universal mobile support
        progress_callback: (p) => {
          if (p.status === 'progress' && p.total) {
            const pct = Math.round((p.loaded / p.total) * 100);
            self.postMessage({ type: 'loading', progress: pct, message: `Loading AI model... ${pct}%`, file: p.file });
          } else if (p.status === 'done') {
            self.postMessage({ type: 'loading', progress: 100, message: 'Model piece loaded', file: p.file });
          } else if (p.status === 'ready') {
            self.postMessage({ type: 'loading', progress: 100, message: 'Almost ready...' });
          }
        }
      }
    );

    isLoading = false;
    self.postMessage({ type: 'ready' });
  } catch (err) {
    isLoading = false;
    self.postMessage({ type: 'error', error: err.message || 'Failed to load Whisper model' });
  }
}

// ═══ TRANSCRIBE AUDIO ═══
async function transcribe(audioData, sampleRate) {
  if (!transcriber) {
    self.postMessage({ type: 'result', transcript: '', error: 'Model not loaded' });
    return;
  }

  try {
    // Whisper expects Float32Array at 16kHz
    // If not 16kHz, we need to resample (the main thread should handle this,
    // but we do a safety check)
    const result = await transcriber(audioData, {
      language: 'en',
      task: 'transcribe',
      chunk_length_s: 0,    // Don't chunk — our clips are short (< 8s)
      return_timestamps: false,
    });

    const text = (result?.text || '').toLowerCase().trim();
    self.postMessage({ type: 'result', transcript: text });
  } catch (err) {
    self.postMessage({ type: 'result', transcript: '', error: err.message });
  }
}

// ═══ MESSAGE HANDLER ═══
self.onmessage = (e) => {
  const { type, audioData, sampleRate } = e.data;
  if (type === 'load') loadModel();
  else if (type === 'transcribe') transcribe(audioData, sampleRate);
};
