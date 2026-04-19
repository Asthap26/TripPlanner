import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Intro({ onEnter }) {
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    // Start very close for dramatic effect
    camera.position.z = 2.0;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // Solid black background
    container.appendChild(renderer.domElement);

    // High detail globe
    const geo = new THREE.SphereGeometry(1.8, 128, 128);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0a1a0a,
      roughness: 0.4,
      metalness: 0.8,
    });
    const globe = new THREE.Mesh(geo, mat);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wire = new THREE.Mesh(geo, wireMat);

    const globeGroup = new THREE.Group();
    globeGroup.add(globe);
    globeGroup.add(wire);
    scene.add(globeGroup);

    // Dramatic Lighting
    scene.add(new THREE.AmbientLight(0x00ff9d, 0.05));
    
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 5, 2);
    scene.add(dirLight1);

    const spotLight = new THREE.SpotLight(0x00ff9d, 5.0);
    spotLight.position.set(-5, -5, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    const updateSize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', updateSize);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId;
    let transitionVelocity = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);

      // Fast dramatic rotation
      globe.rotation.y += 0.003;
      wire.rotation.y += 0.003;
      
      // Idle float & Parallax
      if (!isTransitioningRef.current) {
        globeGroup.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        globeGroup.rotation.x += (mouseY * 0.1 - globeGroup.rotation.x) * 0.05;
        globeGroup.rotation.y += (mouseX * 0.1 - globeGroup.rotation.y) * 0.05;
        
        // Slow pull back
        if (camera.position.z < 3.5) {
          camera.position.z += (3.5 - camera.position.z) * 0.005;
        }
      } else {
        // Zoom-in Transition
        transitionVelocity += 0.015;
        camera.position.z -= transitionVelocity;
        globeGroup.rotation.y += transitionVelocity * 0.5; // Spin faster as we dive in
        
        if (camera.position.z < -0.5) {
          cancelAnimationFrame(animationId);
          onEnter();
          return;
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireMat.dispose();
    };
  }, [onEnter]);

  const handleEnter = () => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    isTransitioningRef.current = true;
  };

  const text1 = "YATRA";
  const text2 = "sathi";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(20px)",
      transition: { duration: 0.6, ease: "easeIn" }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, rotateX: 90, rotateY: 30, y: 100, z: -500, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      rotateY: 0, 
      y: 0, 
      z: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", damping: 15, stiffness: 300 } 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* HUD Elements */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        <motion.div 
          animate={isTransitioning ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start relative z-10"
        >
          <div className="text-white/40 font-mono text-xs tracking-widest uppercase">
            YATRAsathi / OS v1.0
          </div>
          <div className="text-white/40 font-mono text-xs tracking-widest uppercase text-right">
            System Online<br/>
            Awaiting Command
          </div>
        </motion.div>

        {/* Central 3D Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 perspective-[1000px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTransitioning ? "exit" : "visible"}
            className="text-[clamp(60px,12vw,140px)] font-bold tracking-tighter text-white flex items-baseline drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex">
              {text1.split("").map((c, i) => (
                <motion.span key={`1-${i}`} variants={letterVariants} className="inline-block origin-bottom">
                  {c}
                </motion.span>
              ))}
            </div>
            <div className="flex">
              {text2.split("").map((c, i) => (
                <motion.span key={`2-${i}`} variants={letterVariants} className="inline-block origin-bottom text-[var(--accent)] font-light">
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              isTransitioning 
                ? { opacity: 0, y: 20, transition: { duration: 0.3 } }
                : { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.0 } }
            }
            className="text-[var(--text-secondary)] text-xs md:text-sm tracking-[0.4em] uppercase font-light mt-6"
          >
            Intelligent Travel Architecture
          </motion.div>
        </div>

        <motion.div 
          animate={isTransitioning ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-end relative z-10"
        >
          <button 
            onClick={handleEnter}
            className="pointer-events-auto group relative px-8 py-4 overflow-hidden rounded-full border border-white/10 bg-black/20 backdrop-blur-md hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <span className="relative z-10 text-xs font-mono text-white tracking-[0.3em] uppercase flex items-center gap-3">
              Start <span className="text-[var(--accent)] group-hover:translate-x-2 transition-transform">→</span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
