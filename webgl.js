/**
 * WebGL 3D Landscape & Atmospheric Simulation
 * Exactly matching Orchestrated.nl's dynamic 3D rocky terrain hero with video texture projection
 */

class HeroScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, using fallback');
      return;
    }

    // 1. Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.038);

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 3.2, 9);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(ambientLight);

    this.pointLight = new THREE.PointLight(0x77aaff, 3, 30);
    this.pointLight.position.set(0, 5, 4);
    this.scene.add(this.pointLight);

    const rimLight = new THREE.DirectionalLight(0x335588, 1.4);
    rimLight.position.set(-6, 8, -4);
    this.scene.add(rimLight);

    // 3. Terrain Geometry
    const geometry = new THREE.PlaneGeometry(36, 26, 140, 100);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const elevation =
        Math.sin(x * 0.35) * Math.cos(y * 0.35) * 0.95 +
        Math.sin(x * 0.8 + 1.2) * 0.4 +
        Math.cos(y * 0.95) * 0.3;
      pos.setZ(i, elevation);
    }
    geometry.computeVertexNormals();

    // 4. Video & Rock Textures
    const textureLoader = new THREE.TextureLoader();
    const colTexture = textureLoader.load('assets/webgl/rocks02/rocks_ground_02_col_2k.webp', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2.5, 2.5);
    });

    // Hidden video element for 3D reel projection
    this.videoEl = document.getElementById('header-reel-video');
    let videoTexture = null;
    if (this.videoEl) {
      this.videoEl.play().catch(() => {
        // Autoplay policy fallback
        window.addEventListener('click', () => this.videoEl.play(), { once: true });
        window.addEventListener('scroll', () => this.videoEl.play(), { once: true });
      });
      videoTexture = new THREE.VideoTexture(this.videoEl);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;
    }

    const material = new THREE.MeshStandardMaterial({
      map: videoTexture || colTexture,
      roughness: 0.75,
      metalness: 0.2,
      flatShading: true,
      color: 0x999999
    });

    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.rotation.x = -Math.PI / 2.25;
    this.terrain.position.set(0, -1.9, -1.8);
    this.scene.add(this.terrain);

    // 5. Floating Dust Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 18;
      particlePositions[i + 1] = Math.random() * 6 - 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.038,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particles);

    // Listeners
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    this.clock = new THREE.Clock();
    this.animate();
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onScroll() {
    this.scrollY = window.scrollY;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (this.terrain) {
      this.terrain.rotation.z = this.mouse.x * 0.045;
      this.terrain.position.y = -1.9 - (this.scrollY * 0.0035) - (this.mouse.y * 0.18);
    }

    if (this.pointLight) {
      this.pointLight.position.x = this.mouse.x * 4.5;
      this.pointLight.position.y = 5 - (this.mouse.y * 2.2);
    }

    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.025;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Wave canvas animation for scroll indicator
function initWaveCanvas() {
  const canvas = document.querySelector('.ScrollIndicator_wave__wXE8T');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let step = 0;

  function renderWave() {
    step += 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';

    for (let x = 0; x < canvas.width; x++) {
      const y = Math.sin(x * 0.2 + step) * 4 + canvas.height / 2;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    requestAnimationFrame(renderWave);
  }
  renderWave();
}

window.addEventListener('DOMContentLoaded', () => {
  window.heroScene = new HeroScene('webgl-canvas');
  initWaveCanvas();
});
