import { Billboard, CameraControls, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { isHost } from "playroomkit"
import { useEffect, useRef, useState } from "react";
import { Character } from "./Character";

const MOVEMENT_SPEED = 202;

export const CharacterController = ({
  state,
  joystick,
  userPlayer,
  onKilled,
  onFire,
  downgradedPerformance,
  ...props
}) => {
  const group = useRef();
  const character = useRef();
  const rigidBody = useRef();
  const [animation, setAnimation] = useState("Idle");
  const [weapon, setWeapon] = useState("");
  const lastShoot = useRef(0);

  const scene = useThree((stable) => state.scene);
  const spawnRandomly = () => {};

  useEffect(() => {});

  useEffect(() => {});

  useEffect(() => {});

  return (
    <group ref={group} {...props}>
      <group ref={character}>
	<Character
	  color={state.state.profile?.color}
	  animation={animation}
	/>
      </group>
    </group>
  );
};
