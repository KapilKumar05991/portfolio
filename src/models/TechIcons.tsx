import { OrbitControls } from "@react-three/drei";
import { Suspense, useContext } from "react";
import { AppContext } from '../providers/AppProvider';
import { Canvas } from "@react-three/fiber";
import { Loading } from "../components/Loading";
import Icon from "./Icon";



function TechIcons() {
    const { state } = useContext(AppContext)
    const icons = state.icons
    return (
        icons.map((icon: any, i: number) => (
            <div key={i} className="flex flex-col items-center">
                <h1 className='text-lg sm:text-2xl font-bold'>{icon.name}</h1>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '150px', height: '150px' }}
                >
                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 0.5, 10]} intensity={0.5} color="#fff" />
                    <Suspense fallback={<Loading/>}>
                        <Icon position={[0, 0, 0]} texture={icon.texture} />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                        maxPolarAngle={Math.PI / 2}  // Lock vertical angle (X axis)
                    />
                </Canvas>
            </div>
        ))
    )
}

export default TechIcons