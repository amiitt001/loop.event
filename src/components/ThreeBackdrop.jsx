import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 85;

    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 220;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.32,
      transparent: true,
      opacity: 0.55
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const grid = new THREE.GridHelper(200, 40, 0x0d2416, 0x0d2416);
    grid.position.y = -42;
    scene.add(grid);

    const cursor = { x: 0, y: 0 };
    const cursorTarget = { x: 0, y: 0 };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event) => {
      cursorTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursorTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);

    let frameId;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005; // Sped up the time delta slightly for more visible animation
      cursor.x += (cursorTarget.x - cursor.x) * 0.06;
      cursor.y += (cursorTarget.y - cursor.y) * 0.06;

      points.rotation.y = t * 0.1;
      points.rotation.x = t * 0.04;
      points.position.x = cursor.x * 7;
      points.position.y = cursor.y * 5;
      grid.position.x = cursor.x * 4;
      
      material.opacity = 0.35 + Math.sin(t * 3) * 0.2; // pulse effect
      
      camera.position.x += ((cursor.x * 12) - camera.position.x) * 0.04;
      camera.position.y += ((Math.sin(t) * 6) + cursor.y * 8 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-30" aria-hidden="true" />;
}
