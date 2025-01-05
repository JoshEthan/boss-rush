import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';
import { Experience } from "./components/Experience";
import { MainMenu } from "./components/MainMenu";
import { Game } from "./components/Game";
import { usePlayersList } from "playroomkit";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const players = usePlayersList(true);

  return (
    <>
      {isGameStarted ? (
        <Game />
      ) : (
        <MainMenu startGame={() => setIsGameStarted(true)} players={players} />
      )}
    </>
  );
}

export default App;
