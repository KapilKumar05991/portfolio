import { RoundedBox } from "@react-three/drei";
import { useState } from "react";

function Icon({ position, texture }: { position: [number, number, number]; texture: any }) {
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

export default Icon