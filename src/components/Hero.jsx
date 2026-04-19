import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const globeCanvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    const updateSize = () => {
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    container.appendChild(renderer.domElement);

    // Globe
    const geo = new THREE.SphereGeometry(1.8, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0d1f0d,
      roughness: 0.75,
      metalness: 0.2,
    });
    const globe = new THREE.Mesh(geo, mat);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wire = new THREE.Mesh(geo, wireMat);
    
    const globeGroup = new THREE.Group();
    globeGroup.add(globe);
    globeGroup.add(wire);
    scene.add(globeGroup);

    // Lights
    scene.add(Object.assign(new THREE.AmbientLight(0x00ff9d, 0.15)));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 3, 5);
    scene.add(dir);
    
    const pointLight = new THREE.PointLight(0x004422, 0.8);
    pointLight.position.set(-5, -3, -5);
    scene.add(pointLight);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.1;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Scroll parallax
    const onScroll = () => {
      const offset = window.scrollY;
      if (globeCanvasRef.current) {
         globeCanvasRef.current.style.transform = `translateY(${offset * 0.15}px)`;
      }
      if (heroContentRef.current) {
         heroContentRef.current.style.transform = `translateY(${offset * 0.08}px)`;
      }
    };
    window.addEventListener('scroll', onScroll);

    // Animate
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!document.hidden) {
        // Slow rotation (6-10s loop)
        globe.rotation.y += 0.01;
        wire.rotation.y += 0.01;
        
        // Subtle floating motion
        globeGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Slight cursor-based parallax (tilt)
        globeGroup.rotation.x += (mouseY - globeGroup.rotation.x) * 0.05;
        globeGroup.rotation.y += (mouseX - globeGroup.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
      }
    }
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden pt-20">
      <div 
        ref={globeCanvasRef}
        className="absolute bottom-0 left-0 w-full md:w-[45%] h-full pointer-events-none z-0"
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 flex justify-end relative z-10 pointer-events-none">
        <div ref={heroContentRef} className="w-full md:w-[55%] flex flex-col justify-center pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 self-start px-4 py-1.5 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs font-semibold tracking-wide uppercase bg-[var(--accent-dim)]"
          >
            Powered by AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(52px,8vw,96px)] font-bold tracking-tight leading-[1.05] mb-6 whitespace-pre-line text-[var(--text-primary)]"
          >
            {"Plan Smarter.\nTravel Better."}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl leading-[1.7]"
          >
            YATRAsathi builds your complete journey — from routes to restaurants, bookings to budgets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <button className="px-8 py-4 rounded-full bg-white text-[#0A0A0A] font-semibold hover:opacity-90 transition-opacity">
              Start Planning →
            </button>
            <button className="px-8 py-4 rounded-full text-white font-semibold border border-white/20 hover:bg-white/5 transition-colors">
              See How It Works
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-8 text-sm font-medium text-[var(--text-secondary)] border-t border-[var(--border)] pt-8"
          >
            <div>
              <div className="text-white text-xl font-bold mb-1">50K+</div>
              <div>Trips Planned</div>
            </div>
            <div>
              <div className="text-white text-xl font-bold mb-1">1200+</div>
              <div>Destinations</div>
            </div>
            <div>
              <div className="text-[var(--accent)] text-xl font-bold mb-1">4.9★</div>
              <div>Rating</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
