import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { Mesh } from "three";
import { AppContext } from "../providers/AppProvider";
import { useInView } from "framer-motion";

function Model({ position, texture }: { position: [number, number, number]; texture: any }) {
    const [hovered, setHovered] = useState(false);
    const groupRef = useRef(null)
    useEffect(() => {
        const group: any = groupRef.current
        return () => {
            if (group) {
                group.children.forEach((mesh: Mesh) => {
                    mesh.geometry.dispose()
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((m) => m.dispose());
                    } else if (mesh.material) {
                        mesh.material.dispose();
                    }
                })
            }
        }
    }, [])
    return (
        <group
            ref={groupRef}
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
    );
}


function Icon({ texture }: any) {
    const canvasRef = useRef(null)
    const inView = useInView(canvasRef)
    return (
        <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '150px', height: '150px' }}
            frameloop={inView ? 'always' : 'demand'}
        >
            {inView &&
                <>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 0.5, 10]} intensity={0.5} color="#fff" />
                    <Model position={[0, 0, 0]} texture={texture} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                        maxPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                    />
                </>
            }
        </Canvas>
    )
}

function TechIcons() {
    const { state } = useContext(AppContext)
    const icons = state.icons
    const [isSmallS,setIsSmallS] = useState(false)
    useEffect(()=>{
        const width = window.innerWidth
        if(width < 1024) {
            setIsSmallS(true)
        }
    },[])

    const fIcons = isSmallS ? icons.slice(0,6): icons
    return (
        fIcons.map((icon: any, i: number) => (
            <div key={i} className="flex flex-col items-center">
                <h1 className='text-lg sm:text-2xl font-bold'>{icon.name}</h1>
                <Icon texture={icon.texture} />
            </div>
        ))
    )
}

export default TechIcons