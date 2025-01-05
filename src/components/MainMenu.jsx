import {
  Joystick,
  insertCoin,
  isHost,
  myPlayer,
  onPlayerJoin,
  useMultiplayerState,
} from "playroomkit";
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
  RenderPixelatedPass,
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
  console.log(colors[1 % colors.length]);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [4.2, 1.5, 7.5], fov: 45, near: 0.5 }}
        sx={{ position: "relative", height: "100vh", width: "100%" }}
      >
        <Camera players={players} />
        <color attach="background" args={["#242424"]} />
        <Physics debug>
          <directionalLight position={[0, 0, 2]} intensity={0.5} />
          <ambientLight intensity={0.1} />

          {/* DISPLAY PLAYERS */}
          {players.map((player, index) => (
            <>
              <group key={player.id} position={[index * 2, 0, 0]}>
                <EffectComposer>
                  <RenderPixelatedPass />
                </EffectComposer>
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
