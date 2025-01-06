import {
  Joystick,
  insertCoin,
  isHost,
  myPlayer,
  onPlayerJoin,
  useMultiplayerState,
} from "playroomkit";
import {
  OrthographicCamera,
} from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { Map } from "./Map";
import { Lobby } from "./Lobby";
import { Camera } from "./Camera";
import { CharacterMesh } from "./CharacterMesh";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Button } from "@mui/material";
import {
  Billboard,
  Box,
  CameraControls,
  Image,
  PerspectiveCamera,
  Text,
  useGLTF,
} from "@react-three/drei";
import {
  EffectComposer,
  Pixelation,
} from "@react-three/postprocessing";

// const Box = ({ position, size, color}) => {
//   const ref = useRef();
//   const [isHovered, setIsHovered] = useState(false);

//   useFrame((state, delta) => {
//    const rotation_speed = isHovered ? .1 : 0;
//     ref.current.rotation.y += rotation_speed * delta
//   })

//   return (
//     <mesh
//       position={position}
//       ref={ref}
//       onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
//       onPointerLeave={() => setIsHovered(false)}
//     >
//       <boxGeometry args={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };


export const MainMenu = ({ startGame, players }) => {
  const colors = ["red", "green", "blue"];
  const canvas = useRef();
  
  // useFrame((_, delta) => {
  //   console.log(canvas.current.position);
  // });

  return (
    <>
      <Canvas
        shadows
        ref={canvas}
        camera={{ position: [10, 0, 10], fov: 45, near: 0.5 }}
      >
        {/* <Camera players={players} /> */}
        <color attach="background" args={["#242424"]} />
        <EffectComposer>
          <Pixelation granularity={4} />
        </EffectComposer>
        <Physics debug>
          <directionalLight position={[0, 5, 2]} intensity={1.5} />
          <ambientLight intensity={.4} />

          {/* DISPLAY PLAYERS */}
          {players.map((player, index) => (
            <>
              <group key={player.id} position={[index * 2, -1, 0]}>
                <CharacterMesh color={colors[index % colors.length]} />
              </group>
            </>
          ))}
        </Physics>
      </Canvas>
      <Button
        sx={{
          position: "absolute",
          bottom: "5vh",
          right: "5vw",
          zIndex: 10,
        }}
        variant="text"
        onClick={startGame}
      >
        Start Game
      </Button>
    </>
  );
};
