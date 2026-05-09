export class AudioManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = true;
        
        // Background Music Oscillator
        this.bgmOscillator = null;
        this.bgmGain = null;
        this.isPlayingBGM = false;
        this.bgmInterval = null;
    }
    
    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        } else {
            this.stopBGM();
        }
    }
    
    playSound(type) {
        if (!this.enabled) return;
        
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        const now = this.ctx.currentTime;
        
        switch (type) {
            case 'jump':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
                gainNode.gain.setValueAtTime(0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
                
            case 'swipe':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.1);
                gainNode.gain.setValueAtTime(0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
                
            case 'coin':
                osc.type = 'square';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.setValueAtTime(1200, now + 0.1);
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
                
            case 'crash':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(10, now + 0.5);
                gainNode.gain.setValueAtTime(0.5, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
                
            case 'ui_click':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                gainNode.gain.setValueAtTime(0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
        }
    }
    
    playBGM() {
        if (!this.enabled) return;
        if (this.isPlayingBGM) return;
        
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        
        this.isPlayingBGM = true;
        
        // Simple procedural bassline loop using intervals
        const notes = [220, 220, 261.63, 293.66, 220, 196, 220, 329.63];
        let step = 0;
        
        const playNote = () => {
            if (!this.isPlayingBGM) return;
            
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.value = notes[step] / 2; // Bass octave
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            const now = this.ctx.currentTime;
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            
            osc.start(now);
            osc.stop(now + 0.2);
            
            step = (step + 1) % notes.length;
        };
        
        this.bgmInterval = setInterval(playNote, 250); // 4 notes per second (120 BPM 8th notes roughly)
    }
    
    pauseBGM() {
        this.isPlayingBGM = false;
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    }
    
    stopBGM() {
        this.pauseBGM();
    }
}
