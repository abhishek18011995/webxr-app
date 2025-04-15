import React, { useRef, useState } from 'react';
import { XRHitTest } from '@react-three/xr';
import { Box, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3 } from 'three';
import XrHitCube from './XrHitCube';

const matrixHelper = new THREE.Matrix4()
let position ;
const hitTestPosition = new Vector3()

const XrHitReticle = () => {
    const reticleRef = useRef(null);


    const [red, setRed] = useState(false);
    const [placedObjects, setPlacedObjects] = useState([]);

    useFrame(() => {
        reticleRef.current?.position.copy(hitTestPosition);
        console.log('useFrame');
    })

    const handleTouch = () => {
        console.log('ring touched!'); // Log touch event
        setRed(!red);
        if (reticleRef.current) {
            const { x, y, z } = reticleRef.current.position;
            setPlacedObjects([...placedObjects, { position: [x, y, z] }]);
        }
    };

    const handleHitTestResults = (results, getWorldMatrix) => {
        if (results.length > 0 && reticleRef.current) {
            getWorldMatrix(matrixHelper, results[0]);
            hitTestPosition.setFromMatrixPosition(matrixHelper);
            console.log(matrixHelper);

            ///// temp
            const temPosition = new THREE.Vector3();
            const quaternion = new THREE.Quaternion();
            const scale = new THREE.Vector3();
            matrixHelper.decompose(temPosition, quaternion, scale);
            reticleRef.current.quaternion.copy(quaternion);

            console.log('quaternion', quaternion);

            reticleRef.current.rotation.set(-(Math.PI / 2), '0', '0'); 
            reticleRef.current.visible = true;

            // reticleRef.current.updateMatrix();
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
                visible={true}
                position={position}
                matrixAutoUpdate={true}
                rotateX={Math.PI / 2} // Rotate the ring to be horizontal
                onPointerDown={handleTouch} // Handle touch interaction
            >
                <ringGeometry args={[0.1, 0.2, 32]} />

                <meshBasicMaterial color={red ? 'red' : 'white'} />
            </mesh>

            {placedObjects.map((obj, index) => (
                <XrHitCube key={index} index={index} position={obj.position} />
            ))}
        </>
    );
}

export default XrHitReticle;