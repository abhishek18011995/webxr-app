import React, { useRef } from 'react';
import { useXRHitTest } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';

const XrHitCube = () => {
    const reticleRef = useRef(null);

    const handleTouch = () => {
        console.log('ring touched!'); // Log touch event
    };

    useXRHitTest((hitMatrix) => {
        if (hitMatrix) {
            reticleRef.current.visible = true;
            reticleRef.current.matrix.fromArray(hitMatrix);
            console.log('hitMatrix', hitMatrix);
            console.log('reticleRef.current.matrix', reticleRef.current.matrix);

            reticleRef.current.matrix.decompose(
                reticleRef.current.position,
                reticleRef.current.quaternion,
                reticleRef.current.scale
            );


            console.log('reticleRef.current.matrix', reticleRef.current.matrix);
        } else {
            // Hide the reticle if no hit test result is available
            reticleRef.current.visible = false;
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <OrbitControls
                minDistance={1} // Minimum zoom-in distance
            />
            {/* Mesh with touch interaction */}
            <mesh
                ref={reticleRef}
                visible={true}
                position={[0, 0, -1]}
                rotateX={Math.PI / 2} // Rotate the ring to be horizontal
                onPointerDown={handleTouch} // Handle touch interaction
            >
                <ringGeometry args={[0.2, 0.6, 32]} />
                <meshBasicMaterial color={'black'} />
            </mesh>
        </>
    );
}

export default XrHitCube;