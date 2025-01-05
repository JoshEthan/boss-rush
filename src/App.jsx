import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState, useRef, useEffect } from "react";
import { Button } from '@mui/material';
import { Experience } from "./components/Experience";
import { MainMenu } from "./components/MainMenu";

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


function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
useEffect(() => {
  console.log("isGameStarted:", isGameStarted);
}, [isGameStarted]);
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
          top: '200px',
          left: '200px',
          zIndex: 10,
        }}
        variant="text" onClick={() => {setIsGameStarted(true);}}
      >  
        Start Game
      </Button>
	  <Button
  onClick={() => {
    alert('clicked');
  }}
>
  Click me
</Button>

    </>
  );
}

export default App;
