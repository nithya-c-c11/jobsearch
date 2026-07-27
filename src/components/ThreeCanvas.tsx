import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  theme?: 'constellation' | 'cyber' | 'neon' | 'glowing';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ theme = 'constellation' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    // Color Theme configuration
    let primaryColor = 0x3b82f6; // Blue
    let secondaryColor = 0x8b5cf6; // Purple
    let accentColor = 0x06b6d4; // Cyan
    let count = 350;

    if (theme === 'cyber') {
      primaryColor = 0x06b6d4;
      secondaryColor = 0x10b981;
      accentColor = 0x3b82f6;
      count = 400;
    } else if (theme === 'neon') {
      primaryColor = 0xec4899;
      secondaryColor = 0x8b5cf6;
      accentColor = 0x06b6d4;
      count = 450;
    } else if (theme === 'glowing') {
      primaryColor = 0xf59e0b;
      secondaryColor = 0xef4444;
      accentColor = 0x8b5cf6;
      count = 320;
    }

    // 1. Interactive 3D Particles Stream
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const color1 = new THREE.Color(primaryColor);
    const color2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Constellation Network Line Mesh
    const lineMaterial = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.15
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    const posAttr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i += 2) {
      for (let j = i + 1; j < count; j += 4) {
        const dx = posAttr[i * 3] - posAttr[j * 3];
        const dy = posAttr[i * 3 + 1] - posAttr[j * 3 + 1];
        const dz = posAttr[i * 3 + 2] - posAttr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 13) {
          linePositions.push(
            posAttr[i * 3], posAttr[i * 3 + 1], posAttr[i * 3 + 2],
            posAttr[j * 3], posAttr[j * 3 + 1], posAttr[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 3. Floating 3D Geometric Objects (Wireframe Icosahedron, Octahedron, Torus Ring)
    const floatingGroup = new THREE.Group();

    // Object A: Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(22, -8, -5);
    floatingGroup.add(icoMesh);

    // Object B: Octahedron
    const octaGeo = new THREE.OctahedronGeometry(5, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(-22, 10, -8);
    floatingGroup.add(octaMesh);

    // Object C: Torus Ring
    const torusGeo = new THREE.TorusGeometry(8, 0.4, 12, 48);
    const torusMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(0, 18, -12);
    torusMesh.rotation.x = Math.PI / 3;
    floatingGroup.add(torusMesh);

    scene.add(floatingGroup);

    // Mouse Parallax tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous 3D rotations
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;
      lines.rotation.y = elapsedTime * 0.05;
      lines.rotation.x = elapsedTime * 0.02;

      icoMesh.rotation.x += 0.005;
      icoMesh.rotation.y += 0.008;

      octaMesh.rotation.x -= 0.006;
      octaMesh.rotation.z += 0.007;

      torusMesh.rotation.z += 0.004;

      // Floating wave movement
      floatingGroup.position.y = Math.sin(elapsedTime * 0.8) * 1.5;

      // Smooth camera parallax based on cursor
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
