'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    camera.position.set(2.2, 0.3, 3.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2400;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) positions[i] = (Math.random() - 0.5) * 60;
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xecf8f8,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // earth
    const earthGroup = new THREE.Group();
    earthGroup.position.set(1.3, -0.6, 0);
    scene.add(earthGroup);

    const earthGeo = new THREE.SphereGeometry(1.15, 64, 64);
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 512;
    canvas2d.height = 256;
    const ctx = canvas2d.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#298A90');
    grad.addColorStop(0.5, '#1D8A7A');
    grad.addColorStop(1, '#19A99F');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = 'rgba(236,248,248,0.55)';
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      ctx.beginPath();
      ctx.ellipse(x, y, 20 + Math.random() * 40, 12 + Math.random() * 20, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    const earthTexture = new THREE.CanvasTexture(canvas2d);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    const glowGeo = new THREE.SphereGeometry(1.22, 64, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x22e1df,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    earthGroup.add(new THREE.Mesh(glowGeo, glowMat));

    scene.add(new THREE.AmbientLight(0x70c2bd, 0.6));
    const sun = new THREE.DirectionalLight(0xecf8f8, 1.1);
    sun.position.set(-3, 2, 4);
    scene.add(sun);

    let targetRotation = 0;
    let currentRotation = 0;
    const onWheel = (e: WheelEvent) => {
      targetRotation += e.deltaY * 0.002;
    };
    window.addEventListener('wheel', onWheel);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      currentRotation += (targetRotation - currentRotation) * 0.06;
      earth.rotation.y = currentRotation;
      earth.rotation.y += 0.0007;
      stars.rotation.y += 0.00015;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      starGeo.dispose();
      starMat.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      earthTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block -z-10"
    />
  );
}
