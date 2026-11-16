/**
 * Orchestrated Sound Engine & Interactive Sound Studio
 * Generative Web Audio API ambient synthesizer and UI sound effects
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.tracks = {
      bass: { active: true, gain: null, osc: null },
      chords: { active: true, gain: null, oscs: [] },
      melody: { active: true, gain: null },
      drums: { active: true, gain: null },
      lamp: { active: true, gain: null },
      air: { active: true, gain: null, noiseNode: null },
      particles: { active: true, gain: null }
    };
    this.ambientInterval = null;

    this.initListeners();
  }

  initContext() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Initialize track gain nodes
    Object.keys(this.tracks).forEach((trackKey) => {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.5, this.ctx.currentTime);
      g.connect(this.masterGain);
      this.tracks[trackKey].gain = g;
    });

    this.startAmbientGenerative();
  }

  toggleMute() {
    if (!this.ctx) {
      this.initContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    const targetGain = this.isMuted ? 0 : 0.7;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.15);
    }

    this.playTone(this.isMuted ? 220 : 440, 'sine', 0.08, 0.05);
    this.updateSoundButtonUI();
    return this.isMuted;
  }

  updateSoundButtonUI() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundLabel = document.getElementById('sound-label');
    if (!soundToggle || !soundLabel) return;

    if (this.isMuted) {
      soundLabel.textContent = 'UNMUTE';
      soundToggle.setAttribute('aria-label', 'Unmute audio');
    } else {
      soundLabel.textContent = 'MUTE';
      soundToggle.setAttribute('aria-label', 'Mute audio');
    }
  }

  // Synthesizes a clean micro-tone for UI interactions
  playTone(freq, type = 'sine', duration = 0.05, vol = 0.04) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Generative Ambient Atmospheric Chords
  startAmbientGenerative() {
    if (!this.ctx) return;

    // Atmospheric warm pink noise (Air layer)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const airGain = this.ctx.createGain();
    airGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(airGain);
    airGain.connect(this.tracks.air.gain);
    whiteNoise.start();

    // Subtle ambient arpeggios & chords
    const chordFrequencies = [
      [130.81, 164.81, 196.00], // C
      [146.83, 174.61, 220.00], // Dm
      [164.81, 196.00, 246.94], // Em
      [174.61, 220.00, 261.63]  // F
    ];

    let currentChordIndex = 0;
    setInterval(() => {
      if (this.isMuted || !this.ctx || !this.tracks.chords.active) return;
      const chord = chordFrequencies[currentChordIndex % chordFrequencies.length];
      currentChordIndex++;

      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playPadTone(freq, 3.5, 0.02);
        }, idx * 120);
      });
    }, 4500);
  }

  playPadTone(freq, duration = 3, vol = 0.025) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.tracks.chords.gain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // Sound Effects for UI actions
  playHover() {
    this.playTone(587.33, 'sine', 0.04, 0.02); // D5
  }

  playClick() {
    this.playTone(880, 'triangle', 0.06, 0.04); // A5
  }

  playModalOpen() {
    this.playTone(392, 'sine', 0.18, 0.05);
    setTimeout(() => this.playTone(523.25, 'sine', 0.22, 0.05), 50);
  }

  playModalClose() {
    this.playTone(523.25, 'sine', 0.14, 0.04);
    setTimeout(() => this.playTone(392, 'sine', 0.18, 0.04), 40);
  }

  initListeners() {
    // Keyboard shortcut 'M' toggles mute
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          this.toggleMute();
        }
      }
    });

    // Unlock audio context on first user click anywhere
    const unlockAudio = () => {
      this.initContext();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
  }
}

window.soundEngine = new SoundEngine();
