import React, { useState , useRef} from 'react';
import { XR } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const Cube = ({ store }) => {
    const [red, setRed] = useState(false);

    const cubeRef = useRef();

    const handleTouch = () => {
        setRed((prev) => !prev); // Toggle color on touch
    };

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
            <XR store={store}>
                {/* Mesh with touch interaction */}
                <mesh
                    ref={cubeRef}
                    position={[0, 0, -2]}
                    pointerEventsType={{ deny: 'grab' }}
                    scale={[1,1,1]}
                    onPointerDown={handleTouch} // Handle touch interaction
                >
                    <boxGeometry />
                    <meshBasicMaterial color={red ? 'red' : 'blue'} />
                </mesh>
            </XR>
        </>
    );
}

export default Cube;