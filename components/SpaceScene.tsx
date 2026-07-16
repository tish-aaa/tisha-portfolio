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
    camera.position.set(3.0, 0.2, 4.4);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // background starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPositions[i] = (Math.random() - 0.5) * 60;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf5f5f7,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // dotted "data globe" — points distributed evenly on a sphere via
    // the golden-angle (Fibonacci sphere) method, silver with a scatter
    // of accent-cyan "active node" points
    const globeGroup = new THREE.Group();
    globeGroup.position.set(1, 0.2, -1);
    scene.add(globeGroup);

    const pointCount = 2400;
    const radius = 2.3;
    const globePositions = new Float32Array(pointCount * 3);
    const globeColors = new Float32Array(pointCount * 3);

    const silver = new THREE.Color('#D8D9DE');
    const silverBright = new THREE.Color('#F5F5F7');
    const accent = new THREE.Color('#1FDCD2');

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
    // the below line is for tweaking the position of globe via console, REMOVE THIS LATER
    (window as unknown as { __globe?: THREE.Group }).__globe = globeGroup;

    // faint outer halo for depth
    const haloGeo = new THREE.SphereGeometry(radius * 1.08, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x1fdcd2,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(haloGeo, haloMat));

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
      globeGroup.rotation.y = currentRotation;
      globeGroup.rotation.y += 0.0009;
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
