import React, { useRef, useEffect } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import PropTypes from 'prop-types';


const XrDraggablePanel = ({ panelContent, panelBtns }) => {
    const relativePosition = [0, 1, -2];
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
    }

    const handlePointerUp = () => {
        offsetRef.current = null;
        pointerDownRef.current = false;
    }

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
                        {panelContent}
                    </Text>
                </mesh>

                {panelBtns && panelBtns.map((btn, index) => (
                    <mesh
                        key={index}
                        position={[relativePosition[0], relativePosition[1] - 0.45 - index * 0.1, relativePosition[2] + 0.02]}>
                        <RoundedBox
                            args={[0.3, 0.09, 0.02]}
                            radius={0.01}
                            onClick={(e) => { e.stopPropagation(); btn.action(); }}
                        >
                            <meshStandardMaterial color="#007bff" />
                        </RoundedBox>
                        <Text
                            position={[0, 0, 0.02]}
                            fontSize={0.03}
                            color="white"
                        >
                            {btn.text}
                        </Text>
                    </mesh>
                ))}
            </group>
        </>
    )
};

export default XrDraggablePanel;



XrDraggablePanel.propTypes = {
    panelContent: PropTypes.string,
    panelBtns: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })),
};
