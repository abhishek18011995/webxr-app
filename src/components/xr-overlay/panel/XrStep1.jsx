import React, { useRef, useEffect } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const XrStep1 = () => {
    const navigate = useNavigate();
    const relativePosition = [0, 1, -2];
    const nextStep = () => {
        navigate('/xrpanel');
    }

    const pointerDownRef = useRef(false)
    const meshRef = useRef(null)
    const offsetRef = useRef(null);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.set(relativePosition[0], relativePosition[1], relativePosition[2]);
        }
    }, []);

    return (
        <>
            <ambientLight intensity={1} />

            <group>
                <mesh
                    position={relativePosition}
                    ref={meshRef}
                    onPointerDown={(e) => {
                        pointerDownRef.current = true;
                        // meshRef.current.position.copy(e.point)

                        offsetRef.current = {
                            x: meshRef.current.position.x - e.point.x,
                            y: meshRef.current.position.y - e.point.y,
                            z: meshRef.current.position.z - e.point.z,
                        };

                        console.log('onPointerDown', meshRef.current.position);
                    }}
                    onPointerMove={(e) => {
                        if (!pointerDownRef.current) {
                            return
                        }

                        e.stopPropagation();
                        meshRef.current.position.set(
                            e.point.x + offsetRef.current.x,
                            e.point.y + offsetRef.current.y,
                            meshRef.current.position.z // Keep Z constant
                        );

                        console.log('onPointerMove', meshRef.current.position);
                    }}
                    onPointerUp={() => {
                        offsetRef.current = null;
                        pointerDownRef.current = false;
                    }}>
                    <RoundedBox args={[1, 0.7, 0.02]} radius={0.02}  >
                        <meshStandardMaterial color="#add8e6" />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.05]}
                        fontSize={0.07}
                        color="black"
                    >
                        Step 1 Guide
                    </Text>
                </mesh>
                <mesh
                    position={[relativePosition[0], relativePosition[1] - 0.45, relativePosition[2] + 0.02]}>
                    <RoundedBox
                        args={[0.3, 0.09, 0.02]}
                        radius={0.01}
                        onClick={(e) => { e.stopPropagation(); nextStep(); }}
                    >
                        <meshStandardMaterial color="#007bff" />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.03}
                        color="white"
                    >
                        Next
                    </Text>
                </mesh>
            </group>
        </>
    )
};

export default XrStep1;

