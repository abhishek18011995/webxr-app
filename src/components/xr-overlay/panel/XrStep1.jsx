import React, { useRef, useEffect, useMemo } from 'react';
import { Text, RoundedBox, Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { XRLayer } from '@react-three/xr';
// import {HTMLImageElement} from 'three/examples/jsm/nodes/core/HTMLImageElement.js';


const XrStep1 = () => {
    const navigate = useNavigate();
    const relativePosition = [0, 1, -2];
    const nextStep = () => {
        navigate('/xrpanel');
    }

    const pointerDownRef = useRef(false)
    const meshRef = useRef(null)
    const offsetRef = useRef(null);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.set(relativePosition[0], relativePosition[1], relativePosition[2]);
        }
    }, []);

    const handlePointerDown = (e) => {
        pointerDownRef.current = true;
        offsetRef.current = {
            x: meshRef.current.position.x - e.point.x,
            y: meshRef.current.position.y - e.point.y,
            z: meshRef.current.position.z - e.point.z,
        };
    }

    const handlePointerMove = (e) => {
        if (!pointerDownRef.current) {
            return
        }

        e.stopPropagation();
        meshRef.current.position.set(
            e.point.x + offsetRef.current.x,
            e.point.y + offsetRef.current.y,
            meshRef.current.position.z // Keep Z constant
        );
        // console.log('onPointerMove', meshRef.current.position);
    }

    const handlePointerUp = () => {
        offsetRef.current = null;
        pointerDownRef.current = false;
    }

    const video = useMemo(() => {
        const result = document.createElement('video')
        result.src = './../vd1.mp4'
        // console.log(result);
        return result
    }, [])

    const renderHtml = useMemo(() => {
        // const result = document.createElement('div');
        // result.innerHTML = `Hello World!`;
        // result.style.width = '100%';
        // result.style.height = '100%';   
        // result.style.backgroundColor = 'white';
        // result.style.color = 'black';

        const result = document.createElement('img');
        // const result = new HTMLImageElement();
        result.src = './../react.png';
        result.alt = './../react.png';
        result.width = 300;
        result.height = 200;
        console.log(result);
        return result
    }, [])


    return (
        <>
            <ambientLight intensity={1} />

            <group>
                <mesh
                    position={relativePosition}
                    ref={meshRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}>
                    <RoundedBox args={[1, 0.7, 0.02]} radius={0.02}  >
                        <meshStandardMaterial color="#add8e6" />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.05]}
                        fontSize={0.07}
                        color="black"
                    >
                        Step 1 Guide
                    </Text>
                </mesh>

                <mesh
                    position={[relativePosition[0], relativePosition[1] - 0.45, relativePosition[2] + 0.02]}>
                    <RoundedBox
                        args={[0.3, 0.09, 0.02]}
                        radius={0.01}
                        onClick={(e) => { e.stopPropagation(); nextStep(); }}
                    >
                        <meshStandardMaterial color="#007bff" />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.03}
                        color="white"
                    >
                        Next
                    </Text>
                </mesh>

                <XRLayer position={[0, 1.8, -1]} onClick={() => video.play()} scale={0.5} src={video} />
                <XRLayer position={[0, 2.9, -2]} scale={0.5} src={renderHtml}/>
                {/* <XRLayer position={[0, 1.5, -1]} scale={0.5}>
                    <mesh>
                        <boxGeometry />
                        <meshBasicMaterial color="red" />
                    </mesh>
                </XRLayer> */}

            </group>
        </>
    )
};

export default XrStep1;

