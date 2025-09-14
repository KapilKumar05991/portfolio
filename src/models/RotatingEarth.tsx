import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../providers/AppProvider';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import { useInView } from 'framer-motion';

function Model() {
    const { state } = useContext(AppContext)
    const meshRef = useRef<THREE.Mesh>(null);
    const earthTexture = state.textures.EARTH_TEXTURE

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.004;
        }
    });
    useEffect(() => {
        const mesh = meshRef.current
        return () => {
            if (mesh) {
                mesh.geometry.dispose()
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((m) => m.dispose());
                } else if (mesh.material) {
                    mesh.material.dispose();
                }
            }
        }
    }, [])
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.4, 32, 32]} />
            <meshStandardMaterial map={earthTexture} />
        </mesh>
    );
}

function RotatingEarth() {
    const canvasRef = useRef(null)
    const inView = useInView(canvasRef)
    return (
        <Canvas ref={canvasRef} camera={{ position: [0, 0, 4], fov: 50 }}
            style={{ height: '100%', width: '100%' }}
            frameloop={inView ? 'always' : 'demand'}
        >
            {inView &&
                <>
                    <Stars radius={10} depth={10} count={200} factor={1} saturation={1} fade speed={1} />
                    <ambientLight intensity={2.5} />
                    <directionalLight position={[5, 5, 5]} intensity={2.5} />
                    <Model />
                    <OrbitControls enablePan={false} minDistance={2.5} maxDistance={8} />
                </>
            }
        </Canvas>
    )
}

export default RotatingEarth