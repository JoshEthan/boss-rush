import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';
import { Environment } from "@react-three/drei";
import {
  Joystick,
  insertCoin,
  isHost,
  myPlayer,
  onPlayerJoin,
  useMultiplayerState,
  usePlayerState
} from "playroomkit";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";

const Sphere = ({ position, size, color}) => {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
 
  useFrame((state, delta) => {
   const rotation_speed = isHovered ? .1 : 0;
    ref.current.rotation.y += rotation_speed * delta
  })

  return (
    <mesh 
      position={position} 
      ref={ref} 
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}	  
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};


export const Game = ({ players }) => {

  players.map((player, idx) => (
    usePlayerState(player, 'count', 0),
    
    usePlayerState(
      player, 
      'joystick',
      new Joystick(
        player.state, 
        {
          type: "angular",
          buttons: [{ id: "attack", label: "Attack" }],
        }
      )
    ),
    
    console.log(player)
  
  ));

  useEffect(() => {
    // Your function to run when the component is loaded
    console.log("Game Component loaded");


    // Optional: Return a cleanup function if needed
    return () => {
      console.log("Game Component unmounted");
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Canvas sx={{ position: 'relative', height: '100vh', width: '100%' }}>
      <Physics debug >
      <directionalLight position={[0, 0, 2]} intensity={0.5} />
      <ambientLight intensity={0.1} />
      {players.map(({ state }, index) => (
        <CharacterController
          key={state.id}
          state={state}
          userPlayer={state.id === myPlayer()?.id}
          joystick={state.joystick}
          // onKilled={onKilled}
          // onFire={onFire}
          // downgradedPerformance={downgradedPerformance}
        />
      ))}
      <Map/>
	    </Physics>
    </Canvas>
  );
};