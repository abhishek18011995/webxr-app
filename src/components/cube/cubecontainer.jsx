import React from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from './cube.jsx';
import { createXRStore } from '@react-three/xr';

const store = createXRStore();

function CubeContainer() {
    return (
        <>

            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <Cube store={store}/>
            </Canvas>
        </>
    );
}

export default CubeContainer;