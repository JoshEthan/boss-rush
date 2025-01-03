import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { Color, LoopOnce, MeshStandardMaterial } from "three";
import { SkeletonUtils } from "three-stdlib";
const WEAPONS = [
  "GrenadeLauncher",
  "AK",
  "Knife_1",
  "Knife_2",
  "Pistol",
  "Revolver",
  "Revolver_Small",
  "RocketLauncher",
  "ShortCannon",
  "SMG",
  "Shotgun",
  "Shovel",
  "Sniper",
  "Sniper_2",
];

export function Character({
  color = "black",
  animation = "Idle",
  weapon = "Knife_1",
  ...props
}) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "./models/character.gltf"
  );
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  if (actions["Death"]) {
    actions["Death"].loop = LoopOnce;
    actions["Death"].clampWhenFinished = true;
  }

  useEffect(() => {
    actions[animation].reset().fadeIn(0.2).play();
    return () => actions[animation]?.fadeOut(0.2);
  }, [animation]);

  const playerColorMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color(color),
      }),
    [color]
  );

  useEffect(() => {
    // HIDING NON-SELECTED WEAPONS
    WEAPONS.forEach((wp) => {
      const isCurrentWeapon = wp === weapon;
      nodes[wp].visible = isCurrentWeapon;
    });

    // ASSIGNING CHARACTER COLOR
    nodes.Body.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    nodes.Head.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
    });

    clone.traverse((child) => {
      if (child.isMesh && child.material.name === "Character_Main") {
        child.material = playerColorMaterial;
      }
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

  }, [nodes, clone]);

  console.log(nodes);

  return (
    <group {...props} dispose={null} ref={group}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Body_1">
            <skinnedMesh
              name="Cube013"
              geometry={nodes.Cube013.geometry}
              material={materials.Skin}
              skeleton={nodes.Cube013.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube013_1"
              geometry={nodes.Cube013_1.geometry}
              material={materials.DarkGrey}
              skeleton={nodes.Cube013_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube013_2"
              geometry={nodes.Cube013_2.geometry}
              material={materials.Pants}
              skeleton={nodes.Cube013_2.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube013_3"
              geometry={nodes.Cube013_3.geometry}
              material={playerColorMaterial}
              skeleton={nodes.Cube013_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Cube013_4"
              geometry={nodes.Cube013_4.geometry}
              material={materials.Black}
              skeleton={nodes.Cube013_4.skeleton}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/character.gltf");
