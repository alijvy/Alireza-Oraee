'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const device = navigator as Navigator & { deviceMemory?: number };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = window.innerWidth < 760;
    const isConstrained = prefersReducedMotion || isCompact || (device.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4;
    let performanceTier: 'balanced' | 'eco' = isConstrained ? 'eco' : 'balanced';
    let pixelRatioCap = performanceTier === 'eco' ? 0.9 : 1.25;
    document.documentElement.dataset.performance = performanceTier;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.055);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: performanceTier !== 'eco',
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x070707, 0);

    const world = new THREE.Group();
    scene.add(world);

    const particleCount = prefersReducedMotion ? 160 : performanceTier === 'eco' ? 300 : 680;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const copper = new THREE.Color(0xe7692a);
    const bone = new THREE.Color(0xc7c0b2);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.8 + Math.random() * 7.5;
      const angle = Math.random() * Math.PI * 2;
      const band = (Math.random() - 0.5) * 3.3;
      const index = i * 3;
      positions[index] = Math.cos(angle) * radius;
      positions[index + 1] = band + Math.sin(angle * 2.5) * 0.35;
      positions[index + 2] = Math.sin(angle) * radius - 3;
      const color = Math.random() > 0.76 ? copper : bone;
      colors[index] = color.r;
      colors[index + 1] = color.g;
      colors[index + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.rotation.x = -0.24;
    world.add(particles);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe7692a,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const paleMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8d1c4,
      wireframe: true,
      transparent: true,
      opacity: 0.075,
    });

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(2.1, 0.3, 96, 9, 2, 5), ringMaterial);
    torus.position.set(3.2, 0.3, -2.8);
    torus.rotation.set(0.4, 0.2, -0.4);
    world.add(torus);

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 1), paleMaterial);
    core.position.set(-3.7, -1.2, -3.5);
    world.add(core);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.008, 5, 96),
      new THREE.MeshBasicMaterial({ color: 0xe7692a, transparent: true, opacity: 0.22 }),
    );
    orbit.rotation.set(1.15, 0.35, 0.4);
    orbit.position.z = -3.8;
    world.add(orbit);

    const pointer = new THREE.Vector2();
    const smoothed = new THREE.Vector2();
    let scrollProgress = 0;
    let frame = 0;
    let isRunning = !document.hidden;
    let lastRender = 0;
    let lastActivity = performance.now();
    let sampleStarted = performance.now();
    let renderedFrames = 0;

    const handlePointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
      lastActivity = performance.now();
    };

    const handleScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = window.scrollY / max;
      lastActivity = performance.now();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const startRendering = () => {
      if (isRunning || document.hidden) return;
      isRunning = true;
      lastRender = 0;
      sampleStarted = performance.now();
      renderedFrames = 0;
      frame = window.requestAnimationFrame(render);
    };

    const stopRendering = () => {
      isRunning = false;
      window.cancelAnimationFrame(frame);
    };

    const handleVisibility = () => {
      if (document.hidden) stopRendering();
      else startRendering();
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('blur', stopRendering);
    window.addEventListener('focus', startRendering);
    document.addEventListener('visibilitychange', handleVisibility);

    function render(now: number) {
      if (!isRunning) return;
      frame = window.requestAnimationFrame(render);

      const idle = now - lastActivity > 2800;
      const activeFps = performanceTier === 'eco' ? 24 : 30;
      const idleFps = performanceTier === 'eco' ? 12 : 18;
      const interval = 1000 / (idle ? idleFps : activeFps);
      if (now - lastRender < interval) return;
      lastRender = now - ((now - lastRender) % interval);

      const elapsed = now * 0.001;
      smoothed.lerp(pointer, 0.035);
      world.rotation.y = smoothed.x * 0.16 + scrollProgress * 1.8;
      world.rotation.x = smoothed.y * 0.1 + Math.sin(elapsed * 0.08) * 0.03;
      particles.rotation.y = elapsed * 0.014;
      torus.rotation.x = elapsed * 0.06 + scrollProgress * 2.2;
      torus.rotation.y = elapsed * 0.085;
      core.rotation.x = -elapsed * 0.055;
      core.rotation.y = elapsed * 0.075;
      camera.position.x += (smoothed.x * 0.48 - camera.position.x) * 0.025;
      camera.position.y += (smoothed.y * 0.3 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, -2.2);
      renderer.render(scene, camera);
      renderedFrames += 1;

      const sampleDuration = now - sampleStarted;
      if (performanceTier === 'balanced' && sampleDuration > 5000) {
        const measuredFps = renderedFrames / (sampleDuration / 1000);
        if (measuredFps < 23) {
          performanceTier = 'eco';
          pixelRatioCap = 0.85;
          particlesGeometry.setDrawRange(0, Math.floor(particleCount * 0.55));
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.documentElement.dataset.performance = 'eco';
        }
        sampleStarted = now;
        renderedFrames = 0;
      }
    }
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blur', stopRendering);
      window.removeEventListener('focus', startRendering);
      document.removeEventListener('visibilitychange', handleVisibility);
      delete document.documentElement.dataset.performance;
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torus.geometry.dispose();
      core.geometry.dispose();
      orbit.geometry.dispose();
      ringMaterial.dispose();
      paleMaterial.dispose();
      (orbit.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl-canvas" aria-hidden="true" />;
}
