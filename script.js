// Prevent browser from restoring scroll position
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force immediate scroll to top
window.scrollTo(0, 0);

// ============================================
// TYPING ANIMATION - CURSOR MOVES WITH TEXT
// ============================================

const titles = [
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Data Analyst",
  "DevOps Engineer",
  "Prompt Engineer",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function initTitleAnimation() {
  const titleElement = document.getElementById("changing-title");

  if (!titleElement) {
    console.error("Title element not found!");
    return;
  }

  console.log("✅ Typing animation initialized");

  function typeWriter() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      charIndex--;
      titleElement.innerHTML =
        currentTitle.substring(0, charIndex) +
        '<span class="typing-cursor">|</span>';
      typingDelay = 50;

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingDelay = 100;
      }
    } else {
      charIndex++;
      titleElement.innerHTML =
        currentTitle.substring(0, charIndex) +
        '<span class="typing-cursor">|</span>';
      typingDelay = 100;

      if (charIndex === currentTitle.length) {
        isDeleting = true;
        typingDelay = 2000;
      }
    }

    setTimeout(typeWriter, typingDelay);
  }

  typeWriter();
}

// ============================================
// 3D CHARACTER TILT - ULTRA SMOOTH & OPTIMIZED
// ============================================

function initCharacterTilt() {
  const characterContainer = document.getElementById("model-container");
  if (!characterContainer) {
    console.warn("Character container not found");
    return;
  }

  console.log("✅ Character tilt initialized");

  const isMobile = window.innerWidth <= 768;
  const maxTilt = isMobile ? 15 : 20;

  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let isHovering = false;
  let animationFrameId = null;

  characterContainer.style.transformStyle = "preserve-3d";
  characterContainer.style.backfaceVisibility = "hidden";
  characterContainer.style.willChange = "transform";

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateLoop() {
    currentRotateX = lerp(currentRotateX, targetRotateX, 0.1);
    currentRotateY = lerp(currentRotateY, targetRotateY, 0.1);

    characterContainer.style.transform = `
      perspective(1000px) 
      rotateY(${currentRotateY}deg) 
      rotateX(${currentRotateX}deg)
    `;

    animationFrameId = requestAnimationFrame(updateLoop);
  }

  updateLoop();

  if (!isMobile) {
    let mouseUpdateScheduled = false;

    function handleMouseMove(event) {
      if (!isHovering || mouseUpdateScheduled) return;

      mouseUpdateScheduled = true;
      requestAnimationFrame(() => {
        const rect = characterContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (event.clientX - centerX) / (rect.width / 2);
        const deltaY = (event.clientY - centerY) / (rect.height / 2);

        const clampedX = Math.max(-1, Math.min(1, deltaX));
        const clampedY = Math.max(-1, Math.min(1, deltaY));

        targetRotateY = clampedX * maxTilt;
        targetRotateX = -clampedY * maxTilt;

        mouseUpdateScheduled = false;
      });
    }

    function handleMouseEnter() {
      isHovering = true;
    }

    function handleMouseLeave() {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
    }

    characterContainer.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });
    characterContainer.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    characterContainer.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      characterContainer.removeEventListener("mouseenter", handleMouseEnter);
      characterContainer.removeEventListener("mouseleave", handleMouseLeave);
      characterContainer.removeEventListener("mousemove", handleMouseMove);
    };
  } else {
    let touchUpdateScheduled = false;

    function handleTouchStart() {
      isHovering = true;
    }

    function handleTouchMove(e) {
      if (!isHovering || touchUpdateScheduled) return;

      touchUpdateScheduled = true;
      requestAnimationFrame(() => {
        const touch = e.touches[0];
        const rect = characterContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (touch.clientX - centerX) / (rect.width / 2);
        const deltaY = (touch.clientY - centerY) / (rect.height / 2);

        const clampedX = Math.max(-1, Math.min(1, deltaX));
        const clampedY = Math.max(-1, Math.min(1, deltaY));

        targetRotateY = clampedX * maxTilt;
        targetRotateX = -clampedY * maxTilt;

        touchUpdateScheduled = false;
      });
    }

    function handleTouchEnd() {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
    }

    characterContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    characterContainer.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });
    characterContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      characterContainer.removeEventListener("touchstart", handleTouchStart);
      characterContainer.removeEventListener("touchmove", handleTouchMove);
      characterContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }
}

// ============================================
// GREETING OVERLAY
// ============================================

(function initGreeting() {
  const SHOW_MS = 250;
  const FADE_MS = 120;
  const OVERLAY_DELAY_MS = 50;
  const OVERLAY_FADE_MS = 220;
  const ZOOM_DELAY_MS = 100;

  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "Ciao",
    "नमस्ते",
    "こんにちは",
    "안녕하세요",
    "مرحبا",
    "नमस्कार",
  ];

  const overlay = document.getElementById("greetingOverlay");
  const text = document.getElementById("greetingText");
  const mainContent = document.getElementById("mainContent");
  const topNav = document.getElementById("topNav");
  const dotsNav = document.getElementById("dotsNav");
  const canvas = document.getElementById("canvas");

  if (!overlay || !text || !mainContent) return;

  text.style.transition = `opacity ${FADE_MS}ms ease`;
  text.style.willChange = "opacity";

  let index = -1;

  function next() {
    index += 1;

    if (index >= greetings.length) {
      setTimeout(() => {
        if (canvas) {
          canvas.classList.remove("initially-hidden");
        }

        const explosionHint = document.querySelector(".explosion-hint");
        const interactionHint = document.querySelector(".interaction-hint");
        if (explosionHint) {
          explosionHint.classList.remove("initially-hidden");
          explosionHint.classList.add("show");
        }
        if (interactionHint) {
          interactionHint.classList.remove("initially-hidden");
          interactionHint.classList.add("show");
        }

        mainContent.classList.remove("content-hidden");
        mainContent.classList.add("content-visible");
        window.scrollTo(0, 0);

        overlay.style.transition = `opacity ${OVERLAY_FADE_MS}ms ease`;
        overlay.style.opacity = "0";

        setTimeout(() => {
          if (topNav) {
            topNav.classList.remove("initially-hidden");
            topNav.classList.add("show");
          }

          if (dotsNav) {
            dotsNav.classList.remove("initially-hidden");
            dotsNav.classList.add("show");
          }

          mainContent.classList.add("zoom-in");
          window.scrollTo({ top: 0, behavior: "instant" });
        }, ZOOM_DELAY_MS);

        setTimeout(() => {
          overlay.style.display = "none";
          overlay.remove();
        }, OVERLAY_FADE_MS + 20);
      }, OVERLAY_DELAY_MS);
      return;
    }

    text.textContent = greetings[index];
    text.style.opacity = "1";

    setTimeout(() => {
      text.style.opacity = "0";
      setTimeout(next, FADE_MS);
    }, SHOW_MS);
  }

  text.style.opacity = "0";
  next();
})();

// ============================================
// PERFORMANCE DETECTION
// ============================================

const isLowEndDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
  const cores = navigator.hardwareConcurrency || 2;
  return isMobile && cores < 4;
};

// ============================================
// SPHERE ANIMATION CLASS
// ============================================

class SphereAnimation {
  constructor(scene, currentColor) {
    this.scene = scene;
    this.currentColor = currentColor;
    const baseCount = isLowEndDevice()
      ? 800
      : window.innerWidth <= 768
      ? 1000
      : 1500;
    this.PARTICLE_COUNT = baseCount;
    this.SPHERE_RADIUS = 1.2;
    this.SCATTER_DISTANCE = 12;
    this.ANIMATION_DURATION = 3000;
    this.RECONSTRUCTION_DURATION = 4000;
    this.isAnimating = false;
    this.animationPhase = "idle";
    this.particles = [];
    this.originalPositions = [];
    this.particleSystem = null;
    this.lineSystem = null;
    this.animationFrameId = null;
    this.initializeParticles();
    this.createLineSystem();
  }

  initializeParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.PARTICLE_COUNT * 3);
    const colors = new Float32Array(this.PARTICLE_COUNT * 3);

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / this.PARTICLE_COUNT);
      const theta = Math.sqrt(this.PARTICLE_COUNT * Math.PI) * phi;
      const x = this.SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi);
      const y = this.SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = this.SPHERE_RADIUS * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      this.originalPositions.push({ x, y, z });

      const particle = {
        originalPosition: { x, y, z },
        scatteredPosition: {
          x: x + (Math.random() - 0.5) * this.SCATTER_DISTANCE * 2,
          y: y + (Math.random() - 0.5) * this.SCATTER_DISTANCE * 2,
          z: z + (Math.random() - 0.5) * this.SCATTER_DISTANCE * 2,
        },
        currentPosition: { x, y, z },
      };
      this.particles.push(particle);

      const color = new THREE.Color(this.currentColor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: window.innerWidth <= 768 ? 0.035 : 0.04,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.particleSystem.position.x = 0;
    this.scene.add(this.particleSystem);
  }

  createLineSystem() {
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = window.innerWidth <= 768 ? 100 : 200;
    const positions = new Float32Array(maxConnections * 6);
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.currentColor,
      transparent: true,
      opacity: 0,
      linewidth: 1,
    });

    this.lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.lineSystem.visible = false;
    this.lineSystem.position.x = 0;
    this.scene.add(this.lineSystem);
  }

  updateColor(newColor) {
    this.currentColor = newColor;
    if (this.particleSystem) {
      const colors = this.particleSystem.geometry.attributes.color.array;
      const color = new THREE.Color(newColor);
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
      this.particleSystem.geometry.attributes.color.needsUpdate = true;
    }
    if (this.lineSystem) {
      this.lineSystem.material.color.setHex(newColor);
    }
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  startScatterAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animationPhase = "scattering";

    const startTime = Date.now();
    const positions = this.particleSystem.geometry.attributes.position.array;
    const colors = this.particleSystem.geometry.attributes.color.array;

    const scatterStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.ANIMATION_DURATION, 1);
      const easedProgress = this.easeOutCubic(progress);

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        const original = particle.originalPosition;
        const scattered = particle.scatteredPosition;
        const index3 = i * 3;

        particle.currentPosition.x =
          original.x + (scattered.x - original.x) * easedProgress;
        particle.currentPosition.y =
          original.y + (scattered.y - original.y) * easedProgress;
        particle.currentPosition.z =
          original.z + (scattered.z - original.z) * easedProgress;

        positions[index3] = particle.currentPosition.x;
        positions[index3 + 1] = particle.currentPosition.y;
        positions[index3 + 2] = particle.currentPosition.z;

        const hue = (0.6 + Math.sin(elapsed * 0.002 + i * 0.01) * 0.2) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors[index3] = color.r;
        colors[index3 + 1] = color.g;
        colors[index3 + 2] = color.b;
      }

      this.particleSystem.geometry.attributes.position.needsUpdate = true;
      this.particleSystem.geometry.attributes.color.needsUpdate = true;

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(scatterStep);
      } else {
        this.isAnimating = false;
        this.animationPhase = "scattered";
        this.animationFrameId = null;
      }
    };
    scatterStep();
  }

  startReconstructAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animationPhase = "reconstructing";

    const startTime = Date.now();
    const positions = this.particleSystem.geometry.attributes.position.array;
    const colors = this.particleSystem.geometry.attributes.color.array;
    const targetColor = new THREE.Color(this.currentColor);

    const reconstructStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.RECONSTRUCTION_DURATION, 1);
      const easedProgress = this.easeInOutCubic(progress);

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        const original = particle.originalPosition;
        const scattered = particle.scatteredPosition;
        const index3 = i * 3;

        particle.currentPosition.x =
          scattered.x + (original.x - scattered.x) * easedProgress;
        particle.currentPosition.y =
          scattered.y + (original.y - scattered.y) * easedProgress;
        particle.currentPosition.z =
          scattered.z + (original.z - scattered.z) * easedProgress;

        positions[index3] = particle.currentPosition.x;
        positions[index3 + 1] = particle.currentPosition.y;
        positions[index3 + 2] = particle.currentPosition.z;

        const currentColor = new THREE.Color(
          colors[index3],
          colors[index3 + 1],
          colors[index3 + 2]
        );
        currentColor.lerp(targetColor, easedProgress * 0.1);
        colors[index3] = currentColor.r;
        colors[index3 + 1] = currentColor.g;
        colors[index3 + 2] = currentColor.b;
      }

      this.particleSystem.geometry.attributes.position.needsUpdate = true;
      this.particleSystem.geometry.attributes.color.needsUpdate = true;

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(reconstructStep);
      } else {
        this.isAnimating = false;
        this.animationPhase = "complete";
        this.animationFrameId = null;

        for (let i = 0; i < this.particles.length; i++) {
          const particle = this.particles[i];
          const original = particle.originalPosition;
          particle.currentPosition = { ...original };
          const index3 = i * 3;
          positions[index3] = original.x;
          positions[index3 + 1] = original.y;
          positions[index3 + 2] = original.z;
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
      }
    };
    reconstructStep();
  }

  updatePosition() {}

  updateRotation(mouseX, mouseY, lastMouseX, lastMouseY, autoRotation) {
    if (!this.particleSystem) return;

    if (this.animationPhase === "scattered") {
      this.particleSystem.rotation.x += autoRotation.x * 2;
      this.particleSystem.rotation.y += autoRotation.y * 2;
      this.particleSystem.rotation.z += autoRotation.z * 2;
      if (this.lineSystem) {
        this.lineSystem.rotation.copy(this.particleSystem.rotation);
      }
    } else if (!this.isAnimating) {
      this.particleSystem.rotation.x += autoRotation.x;
      this.particleSystem.rotation.y += autoRotation.y;
      this.particleSystem.rotation.z += autoRotation.z;

      if (this.lineSystem) {
        this.lineSystem.rotation.copy(this.particleSystem.rotation);
      }
    }
  }

  checkHover(mouse, camera, raycaster) {
    if (this.particleSystem && !this.isAnimating) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(this.particleSystem);
      return intersects.length > 0;
    }
    return false;
  }

  handleDoubleClick(event, mouse, camera, raycaster) {
    if (!this.isAnimating && this.particleSystem) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(this.particleSystem);
      if (intersects.length > 0) {
        if (
          this.animationPhase === "idle" ||
          this.animationPhase === "complete"
        ) {
          this.startScatterAnimation();
        } else if (this.animationPhase === "scattered") {
          this.startReconstructAnimation();
        }
        return true;
      }
    }
    return false;
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// ============================================
// WIREFRAME SPHERE CLASS
// ============================================

class InteractiveSphere {
  constructor(scene, currentColor) {
    this.scene = scene;
    this.currentColor = currentColor;
    this.isAnimating = false;
    this.isHovering = false;
    this.explosionPoint = new THREE.Vector3();
    this.particles = [];
    this.sphereVertices = [];
    this.animationProgress = 0;
    this.animationSpeed = 0.012;
    this.animationFrameId = null;

    this.createMainSphere();
    this.extractSphereVertices();
    this.createParticleSystem();
    this.createLineSystem();
  }

  createMainSphere() {
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const material = new THREE.MeshPhongMaterial({
      color: this.currentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  extractSphereVertices() {
    const positionAttribute = this.mesh.geometry.attributes.position;
    this.sphereVertices = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionAttribute, i);
      this.sphereVertices.push(vertex);
    }
  }

  createParticleSystem() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = Math.min(150, this.sphereVertices.length);
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = 0;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: this.currentColor,
      size: window.innerWidth <= 768 ? 0.05 : 0.07,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.particleSystem.visible = false;
    this.scene.add(this.particleSystem);
  }

  createLineSystem() {
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = window.innerWidth <= 768 ? 75 : 120;
    const positions = new Float32Array(maxConnections * 6);

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.currentColor,
      transparent: true,
      opacity: 0,
      linewidth: 1,
    });

    this.lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.lineSystem.visible = false;
    this.scene.add(this.lineSystem);
  }

  updateColor(newColor) {
    this.currentColor = newColor;
    if (this.mesh) this.mesh.material.color.setHex(newColor);
    if (this.particleSystem)
      this.particleSystem.material.color.setHex(newColor);
    if (this.lineSystem) this.lineSystem.material.color.setHex(newColor);
  }

  checkHover(mouse, camera, raycaster) {
    if (this.mesh && this.mesh.visible && !this.isAnimating) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(this.mesh);
      this.isHovering = intersects.length > 0;
      return this.isHovering;
    } else {
      this.isHovering = false;
      return false;
    }
  }

  handleDoubleClick(event, mouse, camera, raycaster) {
    if (this.isAnimating) return false;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(this.mesh);

    if (intersects.length > 0) {
      this.explosionPoint.copy(intersects[0].point);
      this.triggerExplosion();
      return true;
    }
    return false;
  }

  triggerExplosion() {
    this.isAnimating = true;
    this.animationProgress = 0;
    this.mesh.visible = false;
    this.particleSystem.visible = true;
    this.lineSystem.visible = false;

    const positions = this.particleSystem.geometry.attributes.position.array;
    this.particles = [];
    const particleCount = positions.length / 3;

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;

      positions[index] = this.explosionPoint.x;
      positions[index + 1] = this.explosionPoint.y;
      positions[index + 2] = this.explosionPoint.z;

      const angle = (i / particleCount) * (Math.PI * 2) + Math.random() * 0.5;
      const distance = 6 + Math.random() * 10;
      const height = (Math.random() - 0.5) * 6;

      const explosionTarget = new THREE.Vector3(
        this.explosionPoint.x + Math.cos(angle) * distance,
        this.explosionPoint.y + Math.sin(angle) * distance + height,
        this.explosionPoint.z + (Math.random() - 0.5) * 5
      );

      const vertexIndex = i % this.sphereVertices.length;
      const sphereVertex = this.sphereVertices[vertexIndex].clone();
      sphereVertex.applyMatrix4(this.mesh.matrixWorld);

      const particle = {
        explosionStart: this.explosionPoint.clone(),
        explosionTarget: explosionTarget,
        sphereTarget: sphereVertex,
        currentPos: this.explosionPoint.clone(),
      };

      this.particles.push(particle);
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  updateLineConnections() {
    if (!this.lineSystem.visible || this.particles.length === 0) return;

    const linePositions = this.lineSystem.geometry.attributes.position.array;
    const maxConnections = Math.min(40, Math.floor(linePositions.length / 6));
    let lineIndex = 0;

    for (
      let i = 0;
      i < this.particles.length && lineIndex < maxConnections;
      i++
    ) {
      for (
        let j = i + 1;
        j < this.particles.length && lineIndex < maxConnections;
        j++
      ) {
        const dist = this.particles[i].currentPos.distanceTo(
          this.particles[j].currentPos
        );

        if (dist < 1.8) {
          const baseIndex = lineIndex * 6;
          linePositions[baseIndex] = this.particles[i].currentPos.x;
          linePositions[baseIndex + 1] = this.particles[i].currentPos.y;
          linePositions[baseIndex + 2] = this.particles[i].currentPos.z;
          linePositions[baseIndex + 3] = this.particles[j].currentPos.x;
          linePositions[baseIndex + 4] = this.particles[j].currentPos.y;
          linePositions[baseIndex + 5] = this.particles[j].currentPos.z;
          lineIndex++;
        }
      }
    }

    for (let i = lineIndex * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
    }

    this.lineSystem.geometry.attributes.position.needsUpdate = true;
  }

  updateAnimation() {
    if (!this.isAnimating || this.particles.length === 0) return;

    this.animationProgress += this.animationSpeed;
    const positions = this.particleSystem.geometry.attributes.position.array;

    if (this.particleSystem.visible) {
      this.particleSystem.rotation.x += 0.02;
      this.particleSystem.rotation.y += 0.03;
      this.particleSystem.rotation.z += 0.01;
    }

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      let t;

      if (this.animationProgress <= 0.5) {
        t = this.animationProgress * 2;
        t = 1 - Math.pow(1 - t, 3);
        particle.currentPos.lerpVectors(
          particle.explosionStart,
          particle.explosionTarget,
          t
        );
        this.lineSystem.visible = false;
      } else {
        t = 1 - (this.animationProgress - 0.5) * 2;
        t = Math.pow(t, 3);
        particle.currentPos.lerpVectors(
          particle.sphereTarget,
          particle.explosionTarget,
          t
        );

        if (this.animationProgress > 0.65) {
          this.lineSystem.visible = true;
          const lineOpacity = Math.min(1, (this.animationProgress - 0.65) * 6);
          this.lineSystem.material.opacity = lineOpacity * 0.5;
          this.updateLineConnections();
        }

        if (this.animationProgress > 0.9) {
          const fadeOut = 1 - (this.animationProgress - 0.9) * 8;
          this.lineSystem.material.opacity *= fadeOut;
        }
      }

      const index = i * 3;
      positions[index] = particle.currentPos.x;
      positions[index + 1] = particle.currentPos.y;
      positions[index + 2] = particle.currentPos.z;
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;

    if (this.animationProgress >= 1) {
      this.isAnimating = false;
      this.animationProgress = 0;
      this.particleSystem.visible = false;
      this.lineSystem.visible = false;
      this.lineSystem.material.opacity = 0;
      this.mesh.visible = true;
      this.particles = [];
      this.particleSystem.rotation.set(0, 0, 0);
    }
  }

  updateRotation(mouseX, mouseY, lastMouseX, lastMouseY, autoRotation) {
    if (!this.mesh || !this.mesh.visible || this.isAnimating) return;

    this.mesh.rotation.x += autoRotation.x;
    this.mesh.rotation.y += autoRotation.y;
    this.mesh.rotation.z += autoRotation.z;
    this.mesh.updateMatrixWorld();
  }

  updatePosition() {}

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// ============================================
// THREE.JS SETUP & ANIMATION
// ============================================

let scene,
  camera,
  renderer,
  sphereAnimation,
  interactiveSphere,
  raycaster,
  mouse;
let mouseX = 0,
  mouseY = 0,
  lastMouseX = 0,
  lastMouseY = 0;
let currentColor = 0x8000ff;
let currentMode = "particles";
const autoRotation = { x: 0.01, y: 0.015, z: 0.005 };

const colorThemes = {
  blue: { primary: "#0080ff" },
  purple: { primary: "#8000ff" },
  red: { primary: "#ff4757" },
  green: { primary: "#00ff88" },
  orange: { primary: "#ff9500" },
};

function initThree() {
  if (!window.THREE) {
    console.error("THREE.js not loaded");
    return;
  }

  console.log("✅ Initializing THREE.js");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    alpha: true,
    antialias: !isLowEndDevice(),
    powerPreference: "high-performance",
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  sphereAnimation = new SphereAnimation(scene, currentColor);
  interactiveSphere = new InteractiveSphere(scene, currentColor);

  interactiveSphere.mesh.visible = false;

  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  const directionalLight = new THREE.DirectionalLight(currentColor, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(ambientLight, directionalLight);

  camera.position.z = 5;

  document.addEventListener("dblclick", onDoubleClick);
  document.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("keydown", onKeyDown);

  console.log("✅ THREE.js initialized, starting animation loop");
  animate();
}

function switchMode() {
  if (currentMode === "wireframe") {
    currentMode = "particles";
    interactiveSphere.mesh.visible = false;
    sphereAnimation.particleSystem.visible = true;
    console.log("🔄 Switched to particles mode");
  } else {
    currentMode = "wireframe";
    sphereAnimation.particleSystem.visible = false;
    interactiveSphere.mesh.visible = true;
    console.log("🔄 Switched to wireframe mode");
  }
}

function onKeyDown(event) {
  if (event.code === "Space") {
    event.preventDefault();
    switchMode();
  }
}

let mouseMoveRaf = null;
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  lastMouseX = mouseX;
  lastMouseY = mouseY;
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;

  if (!mouseMoveRaf) {
    mouseMoveRaf = requestAnimationFrame(() => {
      let isHovering = false;
      if (currentMode === "wireframe" && interactiveSphere) {
        isHovering = interactiveSphere.checkHover(mouse, camera, raycaster);
      } else if (currentMode === "particles" && sphereAnimation) {
        isHovering = sphereAnimation.checkHover(mouse, camera, raycaster);
      }

      const canvas = document.getElementById("canvas");
      if (canvas) {
        canvas.style.cursor = isHovering ? "grab" : "pointer";
      }
      mouseMoveRaf = null;
    });
  }
}

function onDoubleClick(event) {
  if (currentMode === "wireframe" && interactiveSphere) {
    interactiveSphere.handleDoubleClick(event, mouse, camera, raycaster);
  } else if (currentMode === "particles" && sphereAnimation) {
    sphereAnimation.handleDoubleClick(event, mouse, camera, raycaster);
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (currentMode === "wireframe" && interactiveSphere) {
    interactiveSphere.updateRotation(
      mouseX,
      mouseY,
      lastMouseX,
      lastMouseY,
      autoRotation
    );
    interactiveSphere.updateAnimation();
  } else if (currentMode === "particles" && sphereAnimation) {
    sphereAnimation.updateRotation(
      mouseX,
      mouseY,
      lastMouseX,
      lastMouseY,
      autoRotation
    );
  }

  renderer.render(scene, camera);
}

function updateTheme(theme) {
  const colors = colorThemes[theme];
  currentColor = parseInt(colors.primary.replace("#", "0x"));
  document.documentElement.style.setProperty("--accent", colors.primary);

  if (interactiveSphere) interactiveSphere.updateColor(currentColor);
  if (sphereAnimation) sphereAnimation.updateColor(currentColor);

  const dirLight = scene.children.find(
    (child) => child.type === "DirectionalLight"
  );
  if (dirLight) dirLight.color.setHex(currentColor);
}

// ============================================
// ECHARTS SKILLS VISUALIZATION
// ============================================

function initSkillsChart() {
  if (typeof echarts === "undefined") {
    console.warn("ECharts not loaded");
    return;
  }

  const chartDom = document.getElementById("skillsChart");
  if (!chartDom) {
    console.warn("Skills chart container not found");
    return;
  }

  const myChart = echarts.init(chartDom);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "rgba(0, 255, 136, 0.5)",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    legend: {
      data: ["Proficiency"],
      textStyle: {
        color: "#a0a0a0",
        fontSize: 12,
      },
      top: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100,
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisLabel: {
        color: "#a0a0a0",
        fontSize: 10,
      },
    },
    yAxis: {
      type: "category",
      data: ["Python", "React", "AI/ML", "DevOps", "Data Science"],
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      axisLabel: {
        color: "#a0a0a0",
        fontSize: 11,
      },
    },
    series: [
      {
        name: "Proficiency",
        type: "bar",
        data: [90, 85, 80, 85, 82],
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#00ff88" },
            { offset: 1, color: "#0080ff" },
          ]),
        },
        label: {
          show: true,
          position: "right",
          color: "#fff",
          fontSize: 11,
          formatter: "{c}%",
        },
        barWidth: "60%",
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });

  console.log("✅ Skills chart initialized");
}

// ============================================
// SCROLL & NAVIGATION - FIXED
// ============================================
function updateCameraPosition(scrollPercent) {
  const aspect = window.innerWidth / window.innerHeight;
  const baseDistance = 5;
  const maxX = aspect * baseDistance * 0.8;

  camera.position.x = Math.sin(scrollPercent * Math.PI * 2) * maxX;
  camera.position.y = Math.cos(scrollPercent * Math.PI * 0.5) * 0.8;
  camera.position.z = baseDistance;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

let scrollRaf = null;
function handleScroll() {
  if (!scrollRaf) {
    scrollRaf = requestAnimationFrame(() => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);

      updateCameraPosition(scrollPercent);

      if (scrollPercent < 0.12) updateTheme("purple");
      else if (scrollPercent < 0.25) updateTheme("green");
      else if (scrollPercent < 0.38) updateTheme("blue");
      else if (scrollPercent < 0.52) updateTheme("orange");
      else if (scrollPercent < 0.66) updateTheme("red");
      else if (scrollPercent < 0.8) updateTheme("purple");
      else updateTheme("green");

      updateDotsNavigation();
      scrollRaf = null;
    });
  }
}

function updateDotsNavigation() {
  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "hackathons",
    "achievements",
    "contact",
  ];

  const scrollPosition = window.scrollY + window.innerHeight / 2;
  let currentSection = "home";

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = sectionId;
      }
    }
  });

  document
    .querySelectorAll("nav.dots a")
    .forEach((dot) => dot.classList.remove("active"));
  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));

  const activeDot = document.querySelector(
    `nav.dots a.scroll-${currentSection}`
  );
  if (activeDot) activeDot.classList.add("active");

  const activeLink = document.querySelector(
    `.nav-link[href="#${currentSection}"]`
  );
  if (activeLink) activeLink.classList.add("active");
}

// ============================================
// MENU CONTROLS
// ============================================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

const toggleMenu = () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  document.body.style.overflow = isOpen ? "" : "hidden";
  iconOpen.classList.toggle("hidden", !isOpen);
  iconClose.classList.toggle("hidden", isOpen);
};

if (hamburger) hamburger.addEventListener("click", toggleMenu);
if (mobileMenu) {
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.id === "mobileMenu") toggleMenu();
  });
}

function smoothScrollTo(targetId, closeMenu = false) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const navHeight = 80;
    const targetPosition = targetElement.offsetTop - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    if (closeMenu) toggleMenu();
  }
}

// ============================================
// NAVIGATION - FIXED CLICK HANDLERS
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 DOM loaded - Initializing navigation");

  // Add scroll class to all nav links
  document
    .querySelectorAll(
      ".nav-link, .mobile-link, .nav-brand, .nav-cta, nav.dots a"
    )
    .forEach((link) => {
      if (!link.classList.contains("scroll")) {
        link.classList.add("scroll");
      }
    });

  // Handle all scroll links
  document.querySelectorAll(".scroll").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const href = link.getAttribute("href");
      console.log("Clicked:", href);

      if (href && href.startsWith("#")) {
        // Remove active from all
        document
          .querySelectorAll("nav.dots a, .nav-link")
          .forEach((el) => el.classList.remove("active"));

        // Add active to clicked items
        document
          .querySelectorAll(
            `nav.dots a[href="${href}"], .nav-link[href="${href}"]`
          )
          .forEach((el) => el.classList.add("active"));

        // Scroll to section
        smoothScrollTo(href, link.classList.contains("mobile-link"));
      }
    });
  });

  // Initialize Lucide icons
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }

  // Initialize title animation
  setTimeout(() => {
    const titleElement = document.getElementById("changing-title");
    if (titleElement) {
      initTitleAnimation();
    }
  }, 4000);
});

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    const originalText = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "Message Sent!";
      setTimeout(() => {
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// ============================================
// RESIZE HANDLER
// ============================================

let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (sphereAnimation && sphereAnimation.particleSystem) {
        const isMobile = window.innerWidth <= 768;
        sphereAnimation.particleSystem.material.size = isMobile ? 0.035 : 0.04;
      }

      if (interactiveSphere && interactiveSphere.particleSystem) {
        const isMobile = window.innerWidth <= 768;
        interactiveSphere.particleSystem.material.size = isMobile ? 0.05 : 0.07;
      }
    }
  }, 250);
}

// ============================================
// INITIALIZATION SEQUENCE
// ============================================

window.addEventListener("load", () => {
  console.log("🚀 Page loaded, starting initialization");

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 400);

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 900);

  setTimeout(() => initThree(), 1000);
  setTimeout(() => initCharacterTilt(), 2500);
  setTimeout(() => initSkillsChart(), 3000);

  initContactForm();
  updateTheme("purple");

  setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 100);
});

window.addEventListener("resize", handleResize, { passive: true });
window.addEventListener("scroll", handleScroll, { passive: true });
