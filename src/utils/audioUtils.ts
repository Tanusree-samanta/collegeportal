// PCM and Base64 audio utilities for Gemini 3.8 Live API

// Convert 32-bit float audio buffer (-1.0 to 1.0) to 16-bit signed PCM ArrayBuffer
export function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true); // little-endian
  }
  return buffer;
}

// Convert ArrayBuffer to base64 string
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert base64 16-bit PCM to Float32Array for 24kHz AudioBuffer
export function base64ToFloat32PCM(base64: string): Float32Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }
  return float32;
}

// Resample any input Float32 sample rate to 16000 Hz
export function downsampleTo16k(input: Float32Array, inputRate: number): Float32Array {
  if (inputRate === 16000) return input;
  const ratio = inputRate / 16000;
  const newLength = Math.round(input.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetInput = 0;
  while (offsetResult < result.length) {
    const nextOffsetInput = Math.round((offsetResult + 1) * ratio);
    let sum = 0;
    let count = 0;
    for (let i = offsetInput; i < nextOffsetInput && i < input.length; i++) {
      sum += input[i];
      count++;
    }
    result[offsetResult] = count > 0 ? sum / count : 0;
    offsetResult++;
    offsetInput = nextOffsetInput;
  }
  return result;
}

// Downsample or create 16kHz audio buffer
export function pcmToBase64(float32Array: Float32Array, sourceSampleRate = 16000): string {
  const resampled = sourceSampleRate === 16000 ? float32Array : downsampleTo16k(float32Array, sourceSampleRate);
  const pcmBuffer = floatTo16BitPCM(resampled);
  return arrayBufferToBase64(pcmBuffer);
}
