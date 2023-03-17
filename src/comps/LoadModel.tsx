import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, MeshStandardMaterial, Vector3, Euler } from "three";

interface LoadModelProps {
  object: string;
  position: Vector3 | number | number[];
  scale: Vector3 | number | number[];
  rotation?: Euler | number | number[];
  roughness?: number;
  metalness?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  onClick?: () => void;
}

const LoadModel = ({
  object,
  position,
  scale,
  rotation = new Euler(),
  roughness = 0,
  metalness = 0,
  autoRotate = false,
  rotateSpeed = 0.5,
  onClick,
}: LoadModelProps) => {
  const gltf = useLoader(GLTFLoader, object);

  // Cast the scene object to Group or Mesh type
  const sceneObject = gltf.scene as Group;

  // Modify the material properties for objects that have a MeshStandardMaterial
  sceneObject.traverse((node) => {
    if (node instanceof Group || node instanceof MeshStandardMaterial) return;
    const material = (node as any).material as MeshStandardMaterial;
    if (material) {
      material.roughness = roughness;
      material.metalness = metalness;
    }
  });

  const ref = useRef<THREE.Object3D>();

  const handleClick = () => {
    if (onClick) onClick();
    console.log(ref.current);
  };

  useEffect(() => {
    if (autoRotate && ref.current) {
      const id = setInterval(() => {
        if (ref.current) {
          ref.current.rotation.y += rotateSpeed * 0.01;
        }
      }, 16);
  
      return () => clearInterval(id);
    }
  }, [autoRotate, rotateSpeed]);

  return (
    <primitive
      object={sceneObject}
      scale={scale}
      position={position}
      rotation={rotation}
      ref={ref}
      onClick={handleClick}
    />
  );
};

export default LoadModel;
