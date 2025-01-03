import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 30, 0], fov: 30 }}>
      <color attach="background" args={["#242424"]} />
      <SoftShadows size={42} />
        <Suspense>
          <Physics>
            <Experience downgradedPerformance={downgradedPerformance} />
          </Physics>
        </Suspense>
    </Canvas>
  );
}

export default App;
