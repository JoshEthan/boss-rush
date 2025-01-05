import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from 'react-responsive';

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
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export const Lobby = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <>
      <color attach="background" args={["#242424"]} />
      <Sphere position={[1, 1, 1]} size={isMobile ? [1, 16, 8] : [2, 32, 16]} color={"blue"} />
    </>
  );
};
