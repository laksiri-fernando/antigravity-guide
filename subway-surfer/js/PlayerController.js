import * as THREE from 'three';

export class PlayerController {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        
        // Settings
        this.laneWidth = 2;
        this.lanes = [-this.laneWidth, 0, this.laneWidth]; // Left, Center, Right
        this.currentLane = 1; // Start in center
        
        this.jumpForce = 15;
        this.gravity = 35;
        this.yVelocity = 0;
        this.isJumping = false;
        
        this.isSliding = false;
        this.slideTimer = 0;
        this.slideDuration = 0.8; // seconds
        
        // Character Mesh
        this.createCharacter();
        
        // Setup Inputs
        this.setupInputs();
    }
    
    createCharacter() {
        this.group = new THREE.Group();
        
        // Simple Body (Capsule/Box)
        const bodyGeo = new THREE.BoxGeometry(1, 2, 0.5);
        const bodyMat = new THREE.MeshStandardMaterial({ 
            color: 0xff00ea, 
            roughness: 0.2, 
            metalness: 0.8,
            emissive: 0xff00ea,
            emissiveIntensity: 0.2
        });
        this.body = new THREE.Mesh(bodyGeo, bodyMat);
        this.body.position.y = 1; // Bottom at 0
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.group.add(this.body);
        
        // Add point light to player
        const light = new THREE.PointLight(0xff00ea, 0.5, 5);
        light.position.set(0, 1, 0);
        this.group.add(light);
        
        this.scene.add(this.group);
        
        // Collision Box (AABB)
        this.boundingBox = new THREE.Box3();
    }
    
    reset() {
        this.currentLane = 1;
        this.group.position.set(this.lanes[this.currentLane], 0, 0);
        this.yVelocity = 0;
        this.isJumping = false;
        this.isSliding = false;
        this.body.scale.y = 1;
        this.body.position.y = 1;
        this.updateBoundingBox();
    }
    
    setupInputs() {
        // Desktop
        window.addEventListener('keydown', (e) => {
            if (this.game.state !== 'PLAYING') return;
            switch(e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.moveLane(-1);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.moveLane(1);
                    break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                case ' ':
                    this.jump();
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.slide();
                    break;
            }
        });

        // Mobile Swipes
        let touchStartX = 0;
        let touchStartY = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: false});

        window.addEventListener('touchmove', (e) => {
            if (this.game.state === 'PLAYING') {
                e.preventDefault(); // prevent scroll
            }
        }, {passive: false});

        window.addEventListener('touchend', (e) => {
            if (this.game.state !== 'PLAYING') return;
            
            let touchEndX = e.changedTouches[0].screenX;
            let touchEndY = e.changedTouches[0].screenY;
            
            let dx = touchEndX - touchStartX;
            let dy = touchEndY - touchStartY;
            
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal
                if (Math.abs(dx) > 30) {
                    if (dx > 0) this.moveLane(1);
                    else this.moveLane(-1);
                }
            } else {
                // Vertical
                if (Math.abs(dy) > 30) {
                    if (dy < 0) this.jump();
                    else this.slide();
                }
            }
        });
    }
    
    moveLane(dir) {
        let newLane = this.currentLane + dir;
        if (newLane >= 0 && newLane < this.lanes.length) {
            this.currentLane = newLane;
            this.game.audio.playSound('swipe');
        }
    }
    
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.yVelocity = this.jumpForce;
            this.game.audio.playSound('jump');
            
            // Cancel slide if jumping
            if (this.isSliding) {
                this.isSliding = false;
                this.body.scale.y = 1;
                this.body.position.y = this.group.position.y + 1;
            }
        }
    }
    
    slide() {
        if (!this.isJumping && !this.isSliding) {
            this.isSliding = true;
            this.slideTimer = this.slideDuration;
            
            // Visual squash
            this.body.scale.y = 0.5;
            this.body.position.y = 0.5;
            this.game.audio.playSound('swipe');
        }
    }
    
    update(deltaTime) {
        // Lateral movement (smooth interpolation)
        const targetX = this.lanes[this.currentLane];
        this.group.position.x += (targetX - this.group.position.x) * 15 * deltaTime;
        
        // Jump/Gravity
        if (this.isJumping) {
            this.yVelocity -= this.gravity * deltaTime;
            this.group.position.y += this.yVelocity * deltaTime;
            
            if (this.group.position.y <= 0) {
                this.group.position.y = 0;
                this.isJumping = false;
                this.yVelocity = 0;
            }
        }
        
        // Sliding
        if (this.isSliding) {
            this.slideTimer -= deltaTime;
            if (this.slideTimer <= 0) {
                this.isSliding = false;
                this.body.scale.y = 1;
                this.body.position.y = 1;
            }
        }
        
        // Bobbing animation if running
        if (!this.isJumping && !this.isSliding) {
            this.body.position.y = 1 + Math.sin(Date.now() * 0.01) * 0.1;
        }

        this.updateBoundingBox();
    }
    
    updateBoundingBox() {
        this.boundingBox.setFromObject(this.group);
        // Slightly shrink bounding box for forgiving gameplay
        this.boundingBox.expandByScalar(-0.2);
    }
    
    getBoundingBox() {
        return this.boundingBox;
    }
}
