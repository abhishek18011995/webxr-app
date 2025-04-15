import React from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { Text, RoundedBox } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const store = createXRStore();

const XrPanel = () => {
    const navigate = useNavigate();
    const relativePosition = [0, 1, -2];
    const initPanel = () => {
        navigate('/xrhitcube');
    }

    return (
        <>
            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas>
                <XR store={store} sessionInit={{
                    requiredFeatures: ['hit-test', 'local-floor', 'bounded-floor', 'dom-overlay'],
                    optionalFeatures: ['bounded-floor', 'plane-detection', 'viewer']
                }}>
                    <ambientLight intensity={1} />


                    <group position={relativePosition} >
                        <RoundedBox args={[1, 0.7, 0.02]} radius={0.02}  >
                            <meshStandardMaterial color="#add8e6" />
                        </RoundedBox>
                        <Text
                            position={[0, 0, 0.05]}
                            fontSize={0.07}
                            color="black"
                        >
                            👋 Welcome to AR Panel
                        </Text>

                        {/* Button */}
                        <group
                            position={[relativePosition[0], 0 - ((relativePosition[1] / 2) + 0.5), relativePosition[2] + 0.2]}>
                            <RoundedBox
                                args={[0.5, 0.15, 0.02]}
                                radius={0.02}
                                onClick={() => initPanel()}
                            >
                                <meshStandardMaterial color="#007bff" /> {/* Blue button */}
                            </RoundedBox>
                            <Text
                                position={[0, 0, 0.02]}
                                fontSize={0.04}
                                color="white"
                            >
                                Start
                            </Text>
                        </group>
                    </group>
                </XR>
            </Canvas>
        </>
    )
};

export default XrPanel;


// ,
// domOverlay: { root: document.body },

{/* <XRDomOverlay >
                        <button
                            style={{ backgroundColor: bool ? 'red' : 'green', padding: '1rem 2rem' }}
                            onClick={() => setBool((b) => !b)}
                        >
                            Hello World
                        </button>
                    </XRDomOverlay> */}



//     <Html
//     style={{ zIndex: 10 }}
//     scaleFactor={10}
//     pointerEvents="fill"
//     position={[0, 0, -10]}
//     center="true"
//     transform={true}
//     occlude="raycast"
//     distanceFactor={50}>
//     <button
//         style={{
//             backgroundColor: bool ? 'red' : 'green',
//             padding: '1rem 2rem',
//         }}
//         onClick={() => setBool((prev) => !prev)}
//     >
//         Hello World
//     </button>
// </Html>