import React, { useRef, useState } from 'react';
import { XRHitTest } from '@react-three/xr';
import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import XrHitCube from './XrHitCube';

const XrHitReticle = () => {
    const reticleRef = useRef(null);


    const [red, setRed] = useState(false);
    const [placedObjects, setPlacedObjects] = useState([]);

    const handleTouch = () => {
        console.log('ring touched!'); // Log touch event
        setRed(!red);
        if (reticleRef.current) {
            const { x, y, z } = reticleRef.current.position;
            setPlacedObjects([...placedObjects, { position: [x, y, z] }]);
        }
    };

    const handleHitTestResults = (results, getWorldMatrix) => {
        //   console.log(results);
        //   console.log(getWorldMatrix);
        //   setRed(!red);
        if (results.length > 0 && reticleRef.current) {
            const hitMatrix = new THREE.Matrix4();
            const success = getWorldMatrix(hitMatrix, results[0]);

            if (success) {
                // console.log('hitmatrix');
                reticleRef.current.visible = true;
                reticleRef.current.matrix.copy(hitMatrix);
                reticleRef.current.matrix.decompose(
                    reticleRef.current.position,
                    reticleRef.current.quaternion,
                    reticleRef.current.scale
                );

                // console.log(reticleRef.current.rotation);
                reticleRef.current.rotation.set(-(Math.PI / 2), 0, 0);

                // console.log('jhgjkhjkg', reticleRef.current.rotation);
                // reticleRef.current.updateMatrixWorld(true); // Update the world matrix
            }
        } else if (reticleRef.current) {
            reticleRef.current.visible = false;
        }
    };

    return (
        <>
            <ambientLight intensity={0.5} />
            <OrbitControls
                enableZoom={false} // Enable zooming
            />
            <XRHitTest
                space="viewer"
                onResults={handleHitTestResults}
            />

            <mesh
                ref={reticleRef}
                visible={false}
                position={[0, 0, -1]}
                rotateX={Math.PI / 2} // Rotate the ring to be horizontal
                onPointerDown={handleTouch} // Handle touch interaction
            >
                <ringGeometry args={[0.03, 0.05, 32]} />
                <meshBasicMaterial color={red ? 'red' : 'white'} />
            </mesh>

            {placedObjects.map((obj, index) => (
                // <mesh key={index} position={obj.position}>
                //     <Box args={[0.1, 0.1, 0.1]} />
                //     <meshStandardMaterial color="blue" />
                // </mesh>  
               <XrHitCube key={index} index={index} position={obj.position} /> 
            ))}
        </>
    );
}

export default XrHitReticle;