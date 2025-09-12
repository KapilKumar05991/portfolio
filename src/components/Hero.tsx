import { useContext, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { AppContext } from '../providers/AppProvider';
import Button from './Button';
import { ArrowRight, FileDown } from 'lucide-react';

function RotatingEarth() {
  const context = useContext(AppContext)
  const meshRef = useRef<THREE.Mesh>(null);
  const earthTexture = context?.state.textures.EARTH_TEXTURE
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.004;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-stretch items-center justify-between gap-4">
        {/* Left: Animated Text */}
        <div ref={textRef} className="glass p-4 px-8 py-4 lg:py-6 flex flex-col gap-4">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Hi, I'm <span className="text-blue-400">Kapil Kumar</span>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold">
            Full Stack Developer & Tech Enthusiast
          </h2>
          <p className="lg:text-xl max-w-xl">
            I build interactive, visually stunning web experiences with React, Next.js, and modern web technology.
          </p>
          <p className="lg:text-xl max-w-xl">
            Whether it’s crafting sleek interfaces, optimizing performance, I bring creativity and precision to every challenge. Let’s build something great together!
          </p>
          <div className='flex gap-1.5'>
            <Button size='small'><a href="#about">Explore<ArrowRight className='inline' /></a></Button>
            <Button size='small'><a href='/kapilkumar.pdf' download={true}>Resume <FileDown className='inline' /></a></Button>
          </div>
        </div>
        {/* Right: 3D Rotating Earth */}
        <div className="md:w-2/5 h-80 md:h-[400px] border-4 rounded-lg border-gray-400 bg-gray-950 flex items-center justify-center w-full">

          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ height: '100%', width: '100%' }}
          >
            <Stars radius={10} depth={10} count={200} factor={1} saturation={1} fade speed={1} />
            <ambientLight intensity={2.5} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <RotatingEarth />
            <OrbitControls enablePan={false} minDistance={2.5} maxDistance={8} />
          </Canvas>
        </div>
      </div>
    </section>
  );
} 