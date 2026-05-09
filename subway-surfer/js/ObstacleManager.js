import * as THREE from 'three';

export class ObstacleManager {
    constructor(scene) {
        this.scene = scene;
        this.lanes = [-2, 0, 2];
        
        this.activeObstacles = [];
        this.activeCoins = [];
        
        this.spawnTimer = 0;
        this.coinSpawnTimer = 0;
        
        // Materials
        this.obsMat1 = new THREE.MeshStandardMaterial({ color: 0xff3366, roughness: 0.4 }); // Tall
        this.obsMat2 = new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.4 }); // Low
        this.coinMat = new THREE.MeshStandardMaterial({ 
            color: 0xffe600, 
            metalness: 1, 
            roughness: 0.2,
            emissive: 0xffe600,
            emissiveIntensity: 0.5
        });
        
        // Geometries
        this.tallGeo = new THREE.BoxGeometry(1.5, 3, 1);
        this.lowGeo = new THREE.BoxGeometry(1.5, 1, 1);
        this.coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
        this.coinGeo.rotateX(Math.PI / 2);
    }
    
    reset() {
        this.activeObstacles.forEach(obs => this.scene.remove(obs.mesh));
        this.activeCoins.forEach(coin => this.scene.remove(coin.mesh));
        this.activeObstacles = [];
        this.activeCoins = [];
        this.spawnTimer = 0;
        this.coinSpawnTimer = 0;
    }
    
    spawnObstacle(speed) {
        // Determine type: 0 = Tall (slide), 1 = Low (jump), 2 = Block (avoid)
        const type = Math.floor(Math.random() * 3);
        const lane = this.lanes[Math.floor(Math.random() * this.lanes.length)];
        const zPos = -100 - (speed * 0.5); // Spawn further away when faster
        
        let mesh;
        if (type === 0) {
            mesh = new THREE.Mesh(this.tallGeo, this.obsMat1);
            mesh.position.set(lane, 1.5, zPos);
        } else if (type === 1) {
            mesh = new THREE.Mesh(this.lowGeo, this.obsMat2);
            mesh.position.set(lane, 0.5, zPos);
        } else {
            mesh = new THREE.Mesh(this.tallGeo, this.obsMat1);
            mesh.position.set(lane, 1.5, zPos);
        }
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        
        this.activeObstacles.push({
            mesh: mesh,
            type: type,
            boundingBox: new THREE.Box3().setFromObject(mesh)
        });
    }
    
    spawnCoinPattern(speed) {
        const lane = this.lanes[Math.floor(Math.random() * this.lanes.length)];
        const zStart = -100 - (speed * 0.5);
        const count = 5;
        const spacing = 3;
        
        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(this.coinGeo, this.coinMat);
            
            // Arc pattern
            const arcY = Math.sin((i / (count - 1)) * Math.PI) * 2;
            
            mesh.position.set(lane, 1 + arcY, zStart - (i * spacing));
            mesh.castShadow = true;
            this.scene.add(mesh);
            
            this.activeCoins.push({
                mesh: mesh,
                boundingBox: new THREE.Box3().setFromObject(mesh)
            });
        }
    }
    
    update(deltaTime, speed) {
        // Spawn Logic
        this.spawnTimer -= deltaTime;
        if (this.spawnTimer <= 0) {
            this.spawnObstacle(speed);
            // Spawn rate based on speed (max 3 per sec)
            this.spawnTimer = Math.max(0.3, 1.5 - (speed * 0.02)); 
        }
        
        this.coinSpawnTimer -= deltaTime;
        if (this.coinSpawnTimer <= 0) {
            if (Math.random() > 0.5) {
                this.spawnCoinPattern(speed);
            }
            this.coinSpawnTimer = Math.max(1.0, 3.0 - (speed * 0.05));
        }
        
        // Move Obstacles
        for (let i = this.activeObstacles.length - 1; i >= 0; i--) {
            const obs = this.activeObstacles[i];
            obs.mesh.position.z += speed * deltaTime;
            obs.boundingBox.setFromObject(obs.mesh);
            
            if (obs.mesh.position.z > 10) {
                this.scene.remove(obs.mesh);
                this.activeObstacles.splice(i, 1);
            }
        }
        
        // Move & Rotate Coins
        for (let i = this.activeCoins.length - 1; i >= 0; i--) {
            const coin = this.activeCoins[i];
            coin.mesh.position.z += speed * deltaTime;
            coin.mesh.rotation.y += 5 * deltaTime;
            coin.boundingBox.setFromObject(coin.mesh);
            
            if (coin.mesh.position.z > 10) {
                this.removeCoin(i);
            }
        }
    }
    
    removeCoin(index) {
        const coin = this.activeCoins[index];
        this.scene.remove(coin.mesh);
        this.activeCoins.splice(index, 1);
    }
}
