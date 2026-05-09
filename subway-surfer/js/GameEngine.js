import * as THREE from 'three';

export class GameEngine {
    constructor() {
        this.container = document.getElementById('game-container');
        
        // Setup Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a1a);
        this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02);
        
        // Setup Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, -10);
        
        // Setup Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Setup Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0x00f3ff, 0.8);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 50;
        dirLight.shadow.camera.left = -10;
        dirLight.shadow.camera.right = 10;
        dirLight.shadow.camera.top = 10;
        dirLight.shadow.camera.bottom = -10;
        this.scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xff00ea, 1, 20);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);

        // Ground / Track
        this.createWorld();
        
        // Window resize handler
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Game Loop
        this.clock = new THREE.Clock();
        this.updateCallback = null;
    }
    
    createWorld() {
        // Create 3 Lanes visual
        const trackWidth = 6;
        const trackLength = 200;
        
        const geo = new THREE.PlaneGeometry(trackWidth, trackLength);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x111122,
            roughness: 0.8,
            metalness: 0.2
        });
        this.ground = new THREE.Mesh(geo, mat);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.position.z = -trackLength / 2 + 20; // extend forward
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);

        // Grid helper for cyber feel
        const gridHelper = new THREE.GridHelper(200, 100, 0x00f3ff, 0x00f3ff);
        gridHelper.position.y = 0.01;
        gridHelper.position.z = -80;
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
    }
    
    setUpdateCallback(cb) {
        this.updateCallback = cb;
    }
    
    start() {
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }
    
    animate() {
        const delta = this.clock.getDelta();
        
        if (this.updateCallback) {
            this.updateCallback(delta);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
