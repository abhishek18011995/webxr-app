import React, { useMemo, useState } from 'react';
import XrDraggablePanel from './XrDraggablePanel';
import { XRLayer } from '@react-three/xr';
// import { Text, RoundedBox } from '@react-three/drei';
// import { useNavigate } from 'react-router-dom';


const XrFeatures = () => {
    const [showVideo, setShowVideo] = useState(false);
    const [showCube, setShowCube] = useState(false);

    const video = useMemo(() => {
        const result = document.createElement('video')
        result.src = './../vd1.mp4'
        return result
    }, [])

    const renderHtml = useMemo(() => {
        const result = document.createElement('img');
        result.src = './../react.png';
        result.alt = './../react.png';
        result.width = 300;
        result.height = 200;
        return result
    }, [])

    return (
        <>
            <XrDraggablePanel
                panelContent="Draggable Panel"
                panelBtns={[{ text: "Show Video", action: () => setShowVideo(true) },
                { text: "Hide Video", action: () => setShowVideo(false) },
                { text: "Show Cube", action: () => setShowCube(true) },
                { text: "Hide Cube", action: () => setShowCube(false) }
                ]} />

            {
                showCube && (

                    <mesh
                        position={[-1, 1, -2]}
                        pointerEventsType={{ deny: 'grab' }}
                    >
                        <boxGeometry args={[0.5,0.5,0.5]}/>
                        <meshBasicMaterial color='blue' />
                    </mesh>)
            }

            {
                showVideo && (
                    <XRLayer position={[0.8, 1, -1.5]} onClick={() => video.play()} scale={0.5} src={video} />)
            }
            <XRLayer position={[2, 1, -2]} scale={0.5} src={renderHtml} />
        </>
    )
};

export default XrFeatures;

