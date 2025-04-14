import React from 'react';
import { Canvas } from '@react-three/fiber';
import XrHitReticle from './XrHitReticle.jsx';
import { XR, createXRStore } from '@react-three/xr';

const store = createXRStore();

function XrHitCubeContainer() {
    return (
        <>

            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                {/* <XR store={store} sessionInit={{ requiredFeatures: ['hit-test', 'local-floor'] }}> */}
                <XR store={store}
                    sessionInit={{
                        requiredFeatures: ['hit-test', 'local-floor', 'bounded-floor'],
                        optionalFeatures: ['bounded-floor', 'plane-detection', 'viewer']
                    }}>
                    <XrHitReticle />
                </XR>
            </Canvas>
        </>
    );
}

export default XrHitCubeContainer;