import { GameEngine } from './GameEngine.js';
import { PlayerController } from './PlayerController.js';
import { ObstacleManager } from './ObstacleManager.js';
import { UIManager } from './UIManager.js';
import { AudioManager } from './AudioManager.js';

class Game {
    constructor() {
        this.engine = new GameEngine();
        this.audio = new AudioManager();
        this.ui = new UIManager(this);
        
        // Game State
        this.state = 'MENU'; // MENU, PLAYING, PAUSED, GAMEOVER
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = 20; // Units per second
        this.multiplier = 1;
        
        // Subsystems
        this.player = new PlayerController(this.engine.scene, this);
        this.obstacleManager = new ObstacleManager(this.engine.scene);
        
        this.engine.setUpdateCallback(this.update.bind(this));
        
        // Input bindings for global actions (Pause)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'Escape') {
                this.togglePause();
            }
        });
        
        // Start engine loop
        this.engine.start();
    }
    
    start() {
        this.state = 'PLAYING';
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = 20;
        this.multiplier = 1;
        
        this.player.reset();
        this.obstacleManager.reset();
        this.ui.updateHUD(this);
        this.ui.showScreen('hud');
        
        if (this.audio.enabled) {
            this.audio.playBGM();
        }
    }
    
    togglePause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            this.ui.showScreen('pause-menu');
            this.audio.pauseBGM();
        } else if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            this.ui.showScreen('hud');
            if (this.audio.enabled) this.audio.playBGM();
        }
    }
    
    gameOver() {
        this.state = 'GAMEOVER';
        this.audio.playSound('crash');
        this.audio.stopBGM();
        
        // Save high score
        const highScore = parseInt(localStorage.getItem('cyberRunnerHighScore') || '0');
        if (this.score > highScore) {
            localStorage.setItem('cyberRunnerHighScore', Math.floor(this.score).toString());
        }
        
        this.ui.showGameOver(this.score, this.coins);
    }
    
    collectCoin() {
        this.coins++;
        this.score += 10 * this.multiplier;
        this.audio.playSound('coin');
        this.ui.updateHUD(this);
    }
    
    update(deltaTime) {
        if (this.state !== 'PLAYING') return;
        
        // Difficulty scaling
        this.speed += deltaTime * 0.1; 
        
        // Update distance & score
        this.distance += this.speed * deltaTime;
        this.score += this.speed * deltaTime * 0.1 * this.multiplier;
        
        this.ui.updateHUD(this);
        
        // Update entities
        this.player.update(deltaTime);
        this.obstacleManager.update(deltaTime, this.speed);
        
        // Collision Detection
        this.checkCollisions();
    }
    
    checkCollisions() {
        const playerBox = this.player.getBoundingBox();
        
        // Check Obstacles
        for (const obs of this.obstacleManager.activeObstacles) {
            if (playerBox.intersectsBox(obs.boundingBox)) {
                this.gameOver();
                return;
            }
        }
        
        // Check Coins
        for (let i = this.obstacleManager.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.obstacleManager.activeCoins[i];
            if (playerBox.intersectsBox(coin.boundingBox)) {
                this.collectCoin();
                this.obstacleManager.removeCoin(i);
            }
        }
    }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
