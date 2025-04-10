import React, {  useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const XrHitCube = ({ index, position }) => {

    const cubeRef = useRef();

    useFrame(() => {
        // Rotate the cube continuously
        if (cubeRef.current) {
            cubeRef.current.rotation.y -= 0.02;
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <OrbitControls
                enableZoom={true} // Enable zooming
                maxDistance={5} // Maximum zoom-out distance
                minDistance={1} // Minimum zoom-in distance
            />
                {/* Mesh with touch interaction */}
                <mesh key={index} position={position} ref={cubeRef}
                >
                    <boxGeometry args={[0.05, 0.05, 0.05]}/>
                    <meshBasicMaterial color='red' />
                </mesh>
        </>
    );
}

export default XrHitCube;