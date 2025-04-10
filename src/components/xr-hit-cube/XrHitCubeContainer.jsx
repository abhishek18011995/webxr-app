import React from 'react';
import { Canvas } from '@react-three/fiber';
import XrHitCube from './XrHitCube.jsx';
import { XR, createXRStore } from '@react-three/xr';

const store = createXRStore();

function XrHitCubeContainer() {
    return (
        <>

            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <XR store={store} sessionInit={{ requiredFeatures: ['hit-test', 'local-floor'] }}>
                    <XrHitCube />
                </XR>
            </Canvas>
        </>
    );
}

export default XrHitCubeContainer;