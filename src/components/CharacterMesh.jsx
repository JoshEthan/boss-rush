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

export const CharacterMesh = ({
    color = "red",
    animation = "Idle",
    weapon = "Knife_1",
    ...props
}
) => {
    const group = useRef();
    const { scene, materials, animations } = useGLTF("./models/character.gltf");
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions[animation].reset().fadeIn(0.2).play();
        return () => actions[animation]?.fadeOut(0.2);
    }, [animation]);

    const playerColorMaterial = useMemo(
        () => new MeshStandardMaterial({
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
        nodes.Character_Enemy.traverse((child) => {
          if (child.isMesh && child.material.name === "Enemy_Red") {
            child.material = playerColorMaterial;
          }
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
    
        nodes.Character_Enemy_Head.traverse((child) => {
          if (child.isMesh && child.material.name === "Enemy_Red") {
            child.material = playerColorMaterial;
          }
        });
    
        clone.traverse((child) => {
          if (child.isMesh && child.material.name === "Enemy_Red") {
            child.material = playerColorMaterial;
          }
          if (child.isMesh) {
            child.castShadow = true;
          }
        });
    
    }, [nodes, clone]);

    console.log(nodes);
    
    return (
        <group ref={group} {...props}>
            <group name="Scene">
                <group name="CharacterArmature">
                <primitive object={nodes.Root} />
                <group name="Body_1">
                    <skinnedMesh
                        name="Cube013"
                        geometry={nodes.Cube013.geometry}
                        material={materials.Black}
                        skeleton={nodes.Cube013.skeleton}
                        castShadow
                    />
                    <skinnedMesh
                        name="Cube013_1"
                        geometry={nodes.Cube013_1.geometry}
                        material={materials.Skin}
                        skeleton={nodes.Cube013_1.skeleton}
                        castShadow
                    />
                    <skinnedMesh
                        name="Cube013_2"
                        geometry={nodes.Cube013_2.geometry}
                        material={materials.Grey}
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
                        material={materials.DarkGrey}
                        skeleton={nodes.Cube013_4.skeleton}
                        castShadow
                    />
                </group>
                <group name="Body_2">
                    <skinnedMesh
                        name="Cube002"
                        geometry={nodes.Cube002.geometry}
                        material={materials.Black}
                        skeleton={nodes.Cube002.skeleton}
                        castShadow
                    />
                    <skinnedMesh
                        name="Cube002_1"
                        geometry={nodes.Cube002_1.geometry}
                        material={materials.Skin}
                        skeleton={nodes.Cube002_1.skeleton}
                        castShadow
                    />
                    <skinnedMesh
                        name="Cube002_2"
                        geometry={nodes.Cube002_2.geometry}
                        material={playerColorMaterial}
                        skeleton={nodes.Cube002_2.skeleton}
                        castShadow
                    />
                </group>
                </group>
            </group>
        </group>
    );
};

useGLTF.preload("./models/character.gltf");