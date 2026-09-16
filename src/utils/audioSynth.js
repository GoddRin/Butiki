// Web Audio API Procedural Romantic Music Engine
// Independent of external files, guaranteed 0 latency & CORS-free

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.timerId = null;
    this.volume = 0.45;
    this.masterGain = null;
    this.step = 0;

    // Chord progressions in frequencies (Hz)
    this.tracks = [
      {
        title: "September Starlight & Roses",
        bpm: 76,
        chords: [
          // Dmaj9
          [146.83, 220.00, 277.18, 329.63, 370.00, 440.00],
          // F#m7
          [185.00, 220.00, 277.18, 329.63, 440.00, 554.37],
          // Gmaj7
          [196.00, 246.94, 293.66, 370.00, 440.00, 493.88],
          // A7sus4 -> A
          [220.00, 293.66, 329.63, 440.00, 493.88, 587.33]
        ]
      },
      {
        title: "Ikaw at Ako (550 Days of Us)",
        bpm: 68,
        chords: [
          // Cmaj9
          [130.81, 196.00, 246.94, 293.66, 329.63, 392.00],
          // Em7
          [164.81, 196.00, 246.94, 293.66, 329.63, 493.88],
          // Fmaj9
          [174.61, 220.00, 261.63, 329.63, 392.00, 523.25],
          // Gsus4
          [196.00, 261.63, 293.66, 392.00, 440.00, 587.33]
        ]
      },
      {
        title: "Moonlit Graduation Waltz (For Ross Ann)",
        bpm: 82,
        chords: [
          // Bm7
          [123.47, 185.00, 220.00, 277.18, 370.00, 440.00],
          // Gmaj9
          [98.00, 196.00, 246.94, 293.66, 370.00, 440.00],
          // Dadd9
          [146.83, 220.00, 293.66, 329.63, 370.00, 440.00],
          // A7
          [110.00, 220.00, 277.18, 329.63, 440.00, 554.37]
        ]
      }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  playPluck(freq, time, decay = 2.4, bright = false) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = bright ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm gentle filtering (kalimba / soft piano timbre)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(bright ? 2400 : 1200, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + decay);

    // Envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + decay + 0.1);
  }

  scheduleNotes() {
    if (!this.isPlaying) return;
    const track = this.tracks[this.currentTrackIndex];
    const secondsPerBeat = 60 / track.bpm;
    const chordIndex = Math.floor(this.step / 6) % track.chords.length;
    const noteInChord = this.step % 6;
    const chord = track.chords[chordIndex];

    const freq = chord[noteInChord] || chord[0];
    const now = this.ctx.currentTime;

    // Arpeggiate with subtle melodic variation
    this.playPluck(freq, now, 2.2, noteInChord === 4 || noteInChord === 5);

    // Add bass root on downbeats
    if (noteInChord === 0) {
      this.playPluck(chord[0] / 2, now, 3.5, false);
    }

    this.step++;
    const intervalMs = (secondsPerBeat / 2) * 1000;
    this.timerId = setTimeout(() => this.scheduleNotes(), intervalMs);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNotes();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.step = 0;
    return this.tracks[this.currentTrackIndex];
  }

  // Sound Effects
  playSparkle() {
    this.init();
    const now = this.ctx.currentTime;
    [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.12, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.45);
    });
  }

  playSealCrack() {
    this.init();
    const now = this.ctx.currentTime;
    // Low frequency crunch & high parchment rustle
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.2);

    // Followed by sweet chime
    setTimeout(() => this.playSparkle(), 120);
  }

  playHeartPop() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playWaterDrop() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.28);
  }
}

export const audio = new RomanticAudioEngine();
