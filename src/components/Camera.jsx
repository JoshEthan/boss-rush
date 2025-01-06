import {
    Billboard,
    Box,
    CameraControls,
    Image,
    OrthographicCamera,
    Text,
    useGLTF,
  } from "@react-three/drei";
  import { useEffect, useState, useRef } from "react";
  import { Canvas, useFrame, useThree  } from "@react-three/fiber";
  import { MathUtils, Vector3 } from "three";

export const Camera = ({ players }) => {
    const controls = useRef();
  
    const viewport = useThree((state) => state.viewport);
    const cameraReference = useRef();

    // useFrame((_, delta) => {
    //   console.log(cameraReference.current.position);
    // });
  
    const adjustCamera = () => {
      const distFactor =
        10 /
        viewport.getCurrentViewport(cameraReference.current, new Vector3(0, 0, 0))
          .width;

      controls.current.setLookAt(
        4.2 * distFactor,
        2 * distFactor,
        7.5 * distFactor,
        0,
        0.15,
        0,
        true
      );
    };

    useEffect(() => {
        adjustCamera();
      }, [players]);

    return (
        <>
            <OrthographicCamera ref={cameraReference} position = {[2000, 1, 10]} />
            <CameraControls ref={controls} />
        </>
    );
};