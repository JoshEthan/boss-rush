import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';

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


export const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <>
      <Canvas sx={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Physics debug >
          <directionalLight position={[0, 0, 2]} intensity={0.5} />
          <ambientLight intensity={0.1} />
       {isGameStarted ? (
  <Sphere position={[1, 1, 1]} size={[2, 32, 16]} color="green" />
) : (
  <Sphere position={[1, 1, 1]} size={[2, 32, 16]} color="blue" />
)}	 
	  </Physics>
      </Canvas>
      <Button
        sx={{
          position: 'absolute',
          bottom: '5vh',
          right: '5vw',
          zIndex: 10,
        }}
        variant="text" onClick={() => { setIsGameStarted(true); }}
      >  
        Start Game
      </Button>
    </>
  );
};