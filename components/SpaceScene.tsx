'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { colors } from '@/lib/colors';

export default function SpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(3.0, 0.2, 4.4);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const starGeo = new THREE.BufferGeometry();
    const starCount = 2200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPositions[i] = (Math.random() - 0.5) * 60;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const spriteCtx = spriteCanvas.getContext('2d')!;
    const spriteGrad = spriteCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    spriteGrad.addColorStop(0, 'rgba(255,255,255,1)');
    spriteGrad.addColorStop(0.65, 'rgba(255,255,255,1)');
    spriteGrad.addColorStop(1, 'rgba(255,255,255,0)');
    spriteCtx.fillStyle = spriteGrad;
    spriteCtx.fillRect(0, 0, 32, 32);
    const starSprite = new THREE.CanvasTexture(spriteCanvas);

    const starMat = new THREE.PointsMaterial({
      color: colors.silverLight,
      size: 0.045,
      map: starSprite,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const globeGroup = new THREE.Group();
    globeGroup.position.set(1, 0.2, -1);
    scene.add(globeGroup);

    const pointCount = 2400;
    const radius = 2.3;
    const globePositions = new Float32Array(pointCount * 3);
    const globeColors = new Float32Array(pointCount * 3);

    const silver = new THREE.Color(colors.silver);
    const silverBright = new THREE.Color(colors.silverLight);
    const accent = new THREE.Color(colors.accent);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      globePositions[i * 3] = x * radius;
      globePositions[i * 3 + 1] = y * radius;
      globePositions[i * 3 + 2] = z * radius;

      const isNode = Math.random() < 0.035;
      const c = isNode ? accent : Math.random() < 0.5 ? silver : silverBright;
      globeColors[i * 3] = c.r;
      globeColors[i * 3 + 1] = c.g;
      globeColors[i * 3 + 2] = c.b;
    }

    const globeGeo = new THREE.BufferGeometry();
    globeGeo.setAttribute('position', new THREE.BufferAttribute(globePositions, 3));
    globeGeo.setAttribute('color', new THREE.BufferAttribute(globeColors, 3));
    const globeMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const globe = new THREE.Points(globeGeo, globeMat);
    globeGroup.add(globe);

    const haloGeo = new THREE.SphereGeometry(radius * 1.08, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: colors.accent,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(haloGeo, haloMat));

    let targetRotation = 0;
    let currentRotation = 0;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      targetRotation += delta * 0.002;
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      currentRotation += (targetRotation - currentRotation) * 0.06;
      globeGroup.rotation.y = currentRotation;
      globeGroup.rotation.y += 0.0009;
      stars.rotation.y += 0.00015;
      renderer.render(scene, camera);
    };
    animate();

    let lastWidth = window.innerWidth;
    const onResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      starGeo.dispose();
      starMat.dispose();
      starSprite.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block h-full w-full"
    />
  );
}