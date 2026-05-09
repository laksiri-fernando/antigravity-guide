export class UIManager {
    constructor(game) {
        this.game = game;
        
        // Cache DOM elements
        this.screens = {
            'start-menu': document.getElementById('start-menu'),
            'hud': document.getElementById('hud'),
            'pause-menu': document.getElementById('pause-menu'),
            'game-over-screen': document.getElementById('game-over-screen')
        };
        
        this.displays = {
            score: document.getElementById('score-display'),
            coins: document.getElementById('coins-display'),
            highScoreHUD: document.getElementById('high-score-hud'),
            multiplier: document.getElementById('multiplier-display'),
            finalScore: document.getElementById('final-score'),
            finalCoins: document.getElementById('final-coins'),
            finalHighScore: document.getElementById('final-high-score')
        };
        
        this.buttons = {
            start: document.getElementById('btn-start'),
            pause: document.getElementById('btn-pause'),
            resume: document.getElementById('btn-resume'),
            restartPause: document.getElementById('btn-restart-pause'),
            quit: document.getElementById('btn-quit'),
            restartGameOver: document.getElementById('btn-restart'),
            menu: document.getElementById('btn-menu'),
            soundMenu: document.getElementById('btn-sound-toggle-menu'),
            soundPause: document.getElementById('btn-sound-toggle-pause')
        };
        
        this.bindEvents();
        this.updateHighScores();
    }
    
    bindEvents() {
        this.buttons.start.addEventListener('click', () => {
            this.game.audio.playSound('ui_click');
            this.game.start();
        });
        
        this.buttons.pause.addEventListener('click', () => {
            this.game.audio.playSound('ui_click');
            this.game.togglePause();
        });
        
        this.buttons.resume.addEventListener('click', () => {
            this.game.audio.playSound('ui_click');
            this.game.togglePause();
        });
        
        const doRestart = () => {
            this.game.audio.playSound('ui_click');
            this.game.start();
        };
        
        this.buttons.restartPause.addEventListener('click', doRestart);
        this.buttons.restartGameOver.addEventListener('click', doRestart);
        
        const doMenu = () => {
            this.game.audio.playSound('ui_click');
            this.game.state = 'MENU';
            this.updateHighScores();
            this.showScreen('start-menu');
        };
        
        this.buttons.quit.addEventListener('click', doMenu);
        this.buttons.menu.addEventListener('click', doMenu);
        
        const toggleSound = () => {
            this.game.audio.toggle();
            const txt = `Sound: ${this.game.audio.enabled ? 'ON' : 'OFF'}`;
            this.buttons.soundMenu.innerText = txt;
            this.buttons.soundPause.innerText = txt;
            this.game.audio.playSound('ui_click');
        };
        
        this.buttons.soundMenu.addEventListener('click', toggleSound);
        this.buttons.soundPause.addEventListener('click', toggleSound);
        
        // Space to start
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.game.state === 'MENU') {
                this.buttons.start.click();
            }
        });
    }
    
    showScreen(screenId) {
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        if (this.screens[screenId]) {
            this.screens[screenId].classList.add('active');
        }
    }
    
    updateHUD(game) {
        this.displays.score.innerText = Math.floor(game.score);
        this.displays.coins.innerText = game.coins;
        
        if (game.multiplier > 1) {
            this.displays.multiplier.innerText = `x${game.multiplier}`;
            this.displays.multiplier.classList.remove('hidden');
        } else {
            this.displays.multiplier.classList.add('hidden');
        }
    }
    
    updateHighScores() {
        const hs = localStorage.getItem('cyberRunnerHighScore') || '0';
        this.displays.highScoreHUD.innerText = hs;
        this.displays.finalHighScore.innerText = hs;
    }
    
    showGameOver(score, coins) {
        this.showScreen('game-over-screen');
        this.displays.finalScore.innerText = Math.floor(score);
        this.displays.finalCoins.innerText = coins;
        this.updateHighScores();
    }
}
