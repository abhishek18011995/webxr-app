import React, { useRef, useState } from 'react';
import { Text, Tube, RoundedBox } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import {  useController} from '@react-three/xr';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const XrStep1 = () => {
    const navigate = useNavigate();
    const relativePosition = [0, 1, -2];
    const nextStep = () => {
        navigate('/xrpanel');
    }

    const controller = useController('none')

    const dragRef = useRef()
    const [dragging, setDragging] = useState(false)
    const [offset, setOffset] = useState(new THREE.Vector3())
  
    // const { player } = useXR()
    // const controller = player?.controllers?.[0]
  
    // Select Start (touch/press)
    if (controller && !controller.userData.bound) {
      controller.controller.addEventListener('selectstart', () => {
        const controllerPos = controller.controller.position.clone()
        const meshPos = dragRef.current.position.clone()
  
        const offset = meshPos.clone().sub(controllerPos)
        setOffset(offset)
        setDragging(true)
      })
  
      controller.controller.addEventListener('selectend', () => {
        setDragging(false)
      })
  
      controller.userData.bound = true // prevent re-binding every render
    }
  
    // Move object when dragging
    useFrame(() => {
      if (dragging && controller && dragRef.current) {
        const newPos = controller.controller.position.clone().add(offset)
        dragRef.current.position.copy(newPos)
      }
    })

    return (
        <>
            <ambientLight intensity={1} />

            <group position={relativePosition} ref={dragRef} dra>
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

                {/* Button */}
                <group
                    position={[relativePosition[0], 0 - ((relativePosition[1] / 2) + 0.5), relativePosition[2] + 0.2]}>
                    <RoundedBox
                        args={[0.5, 0.15, 0.02]}
                        radius={0.02} 
                        onClick={() => nextStep()}
                    >
                        <meshStandardMaterial color="#007bff" />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.04}
                        color="white"
                    >
                        Next
                    </Text>
                </group>
            </group>
        </>
    )
};

export default XrStep1;

