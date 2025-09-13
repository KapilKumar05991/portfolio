import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model(props: any) {
    const { scene } = useGLTF('/model/scene.gltf');
    return <primitive object={scene} {...props} />;
}

function Telephone() {
    return (
        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 1, 10], fov: 30 }}>
            <ambientLight intensity={1.5} />
            <directionalLight intensity={4} position={[2, 1, 5]} />
            <Model
                position={[0, 0, 1]}
                scale={[12, 12, 12]}
            />
            <OrbitControls
                minPolarAngle={Math.PI / 3}  // Lock vertical angle (X axis)
                maxPolarAngle={Math.PI / 3}  // Lock vertical angle (X axis)
            />
        </Canvas>
    )
}

export default Telephone