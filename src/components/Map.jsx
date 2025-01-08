import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Map = () => {
  const map = useGLTF("./models/spinning_platform.glb");
  const ref = useRef();

  useEffect(() => {
    map.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
	child.recieveShadow = true;
      }
    });
  });
  
  let degrees = 10;

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    //const rigidBody = rigidBodyRef.current.raw(); // Access the raw Rapier object
    const quaternion = new THREE.Quaternion(); 
    degrees += 0.5
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(degrees));
    // console.log(quaternion);
    //console.log(ref.current.rotation().y + quaternion.y);
    const y = ref.current.rotation().y;
    const w = ref.current.rotation().w;
    const current_rotation = ref.current.rotation();
    //console.log(ref.current.rotation());
    ref.current.setRotation({ x: 0, y: quaternion.y , z: 0, w: quaternion.w }, true);
      // Set angular velocity for continuous rotation (in radians per second)
     // ref.current.raw().setRotation({ x: 0, y: 1, z: 0 }, true); // Rotate around Y-axis
    //ref.current.setRotation({0, 0, 0, 0}, true);
  });

  return (
    <>
      <RigidBody ref={ref}  colliders="trimesh" type="fixed">
        <primitive object={map.scene} />
      </RigidBody>
    </>
  );
};
useGLTF.preload("./models/map.glb");
