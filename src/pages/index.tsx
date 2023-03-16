import React, { Suspense } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import css from "@/styles/Home.module.css";
import LoadModel from "@/comps/LoadModel";

function Scene() {
  const { camera } = useThree();

  // Create a useRender hook to animate the scene
  useFrame(() => {
    // Update the scene in each animation frame
  });

  return (
    <>
      <ambientLight color={"#fff5df"} intensity={0} />
      <directionalLight
        color={"#ffd1af"}
        intensity={.5}
        position={[0, 0, 15]}
      />

      {/* Plant */}
      <LoadModel
        object={'./Plant/potted_plant_01_4k.gltf'} 
        position={[0, 1.4, 0]} 
        scale={3}
        roughness={1}
        metalness={1}
      />

      {/* Frog */}
      <LoadModel
        object={'./Frog/scene.gltf'} 
        position={[.3, 3, .1]} 
        scale={.1}
        roughness={1}
        metalness={1}
        rotation={[0, -1, 0]}
      />

      {/* Brick Ball */}
      <LoadModel
        object={'./RedBrickBall/castle_brick_01_4k.gltf'} 
        position={[0, 0, 0]} 
        scale={2}
        roughness={1}
        metalness={1}
      />

      {/* Metal Ball */}
      <LoadModel
        object={'./MetalPlateBall/metal_plate_4k.gltf'} 
        position={[0, -4, 0]} 
        scale={13}
        roughness={.4}
        metalness={2}
      />

      <OrbitControls />
      <Environment preset="sunset" background />
    </>
  );
}

export default function Home() {
  return (
    <div className={css.scene}>
      <Canvas
        shadows
        className={css.canvas}
        camera={{
          position: [-2, 1, 2],
        }}
      >
        <Suspense fallback={"Loading..."}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
