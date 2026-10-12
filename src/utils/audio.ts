/**
 * Soft romantic ambient chime synthesizer using Web Audio API
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  // Gentle pentatonic romantic notes (F# major / D# minor warm chime frequencies)
  private readonly notes = [277.18, 329.63, 369.99, 440.0, 493.88, 554.37, 659.25, 739.99];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (typeof window === 'undefined') return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.scheduleNextChime();
    } catch {
      // Audio might be restricted by user agent until interaction
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playChime(freq: number) {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope (gentle attack, smooth lingering decay like a music box or kalimba)
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.6);
    } catch {
      // Ignore audio glitch
    }
  }

  private scheduleNextChime() {
    if (!this.isPlaying) return;

    // Pick 1 or 2 harmonious notes
    const note1 = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.playChime(note1);

    if (Math.random() > 0.5) {
      setTimeout(() => {
        if (this.isPlaying) {
          const note2 = this.notes[Math.floor(Math.random() * this.notes.length)];
          this.playChime(note2);
        }
      }, 350);
    }

    const nextDelay = 2200 + Math.random() * 2600;
    this.timer = window.setTimeout(() => {
      this.scheduleNextChime();
    }, nextDelay);
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
