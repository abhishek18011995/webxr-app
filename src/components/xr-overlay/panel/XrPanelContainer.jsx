import React from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { Outlet } from 'react-router-dom';

const store = createXRStore();

const XrPanelContainer = () => {

    return (
        <>
            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <XR store={store} sessionInit={{
                    requiredFeatures: ['hit-test', 'local-floor', 'bounded-floor', 'dom-overlay'],
                    optionalFeatures: ['bounded-floor', 'plane-detection', 'viewer']
                }}>
                    <Outlet />
                </XR>
            </Canvas>
        </>
    )
};

export default XrPanelContainer;

