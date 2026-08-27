"use client";

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let timerId: number | null = null;

// Relaxing lofi jazz 7th & 9th chords
const relaxingChords = [
  [130.81, 261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C2, C4, E4, G4, B4, D5)
  [110.00, 220.00, 261.63, 329.63, 392.00, 493.88], // Am9   (A2, A3, C4, E4, G4, B4)
  [87.31,  174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7 (F2, F3, A3, C4, E4, G4)
  [98.00,  196.00, 246.94, 293.66, 349.23, 440.00], // G9    (G2, G3, B3, D4, F4, A4)
];

function playLofiEPNote(ctx: AudioContext, freq: number, delay: number, duration: number, volume = 0.04) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = "sine";
  osc1.frequency.value = freq;

  osc2.type = "triangle";
  osc2.frequency.value = freq * 1.002; // Warm chorus detune

  // Warm lofi lowpass filter
  filter.type = "lowpass";
  filter.frequency.value = 520;

  const now = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);

  osc1.stop(now + duration + 0.2);
  osc2.stop(now + duration + 0.2);
}

function playSubtleBrush(ctx: AudioContext, time: number) {
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3500;
  filter.Q.value = 0.6;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.008, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.07);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(time);
  noise.stop(time + 0.08);
}

export function toggleLofiAudio(): boolean {
  if (isPlaying) {
    stopLofiAudio();
    return false;
  } else {
    startLofiAudio();
    return true;
  }
}

export function startLofiAudio() {
  if (isPlaying) return;

  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtx();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  isPlaying = true;
  let chordIndex = 0;

  const loop = () => {
    if (!isPlaying || !audioCtx) return;

    const currentChord = relaxingChords[chordIndex % relaxingChords.length];

    // Play lush, gentle chord pad with subtle arpeggio stagger
    currentChord.forEach((freq, idx) => {
      const delay = idx * 0.12;
      const vol = idx === 0 ? 0.05 : 0.035; // Soft bass foundation
      playLofiEPNote(audioCtx!, freq, delay, 4.2, vol);
    });

    // Soft ambient brushes
    const now = audioCtx.currentTime;
    playSubtleBrush(audioCtx, now + 0.5);
    playSubtleBrush(audioCtx, now + 1.8);
    playSubtleBrush(audioCtx, now + 3.1);

    chordIndex++;
    timerId = window.setTimeout(loop, 4000);
  };

  loop();
}

export function stopLofiAudio() {
  isPlaying = false;
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
  if (audioCtx && audioCtx.state === "running") {
    audioCtx.suspend();
  }
}
