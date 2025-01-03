import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export const Map = () => {
  const map = useGLTF("./models/map.glb");
    
  useEffect(() => {
    map.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
	child.recieveShadow = true;
      }
    });
  });
 // map.nodes.floor_inside.rotation.set(Math.PI / 0, 0, 0);
  console.log(map.scene);
  console.log(map);
  return (
    <>
      <RigidBody colliders="trimesh" type="fixed">
        <primitive object={map.scene} />
      </RigidBody>
    </>
  );
};
useGLTF.preload("./models/map.glb");
