
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useContext, useState } from 'react';
import { AppContext } from '../providers/AppProvider';


function TechIcon3D({ position, texture }: { position: [number, number, number]; texture: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Icon body as a bigger rounded box */}
      <RoundedBox args={[3.5, 3.5, 0.38]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color={"#b9b4b1"}
          metalness={0.8}
          roughness={0.3}
          emissive={hovered ? "#b9b4b1" : "#000000"}
          emissiveIntensity={hovered ? 0.15 : 0}
        />
      </RoundedBox>
      {/* Front face */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[2.7, 2.7]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI, 0, 0]}>
        <planeGeometry args={[2.7, 2.7]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
      
    </group>
    </>
  );
}

export default function Skills() {
  const context = useContext(AppContext)
  const icons = context?.state.icons
  
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="glass max-w-7xl py-6 w-full mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400">Skills</h2>
        <p className="font-semibold text-lg sm:text-xl max-w-2xl mx-auto my-4">
          My core technologies, visualized in 3D
        </p>
        <div className="w-full flex flex-wrap justify-center sm:gap-6">
          {icons.map((icon:any, i:number) => (
            <div key={i} className="flex flex-col items-center">
              <h1 className='text-lg sm:text-2xl font-bold'>{icon.name}</h1>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ width: '150px', height: '150px' }}
              >
                <ambientLight intensity={1} />
                <directionalLight position={[0, 1, 1]} intensity={1} color="#fff" />
                <TechIcon3D position={[0, 0, 0]} texture={icon.texture} />
                <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                maxPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                />
              </Canvas>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 