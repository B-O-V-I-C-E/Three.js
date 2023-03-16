import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader, MeshStandardMaterial, RepeatWrapping } from 'three';
import { Mesh } from 'three';
import * as THREE from 'three';

type ModelProps = {
    gltfPath: string;
    texturePath: string;
    [key: string]: any; // any additional props
  }

function Model(props: ModelProps) {
  const { gltfPath, texturePath, ...otherProps } = props;
  const gltf = useLoader(GLTFLoader, gltfPath);
  const mesh = gltf.scene.children[0] as Mesh;
  const texture = useLoader(TextureLoader, texturePath);

  const [hovered, setHovered] = React.useState(false);

  // Add any additional props to the mesh, such as position or rotation
  mesh.position.set(0, 0, 0);

  // Set the texture on the material
  const material = mesh.material as MeshStandardMaterial;
  material.map = texture;
  material.side = THREE.DoubleSide;
  material.transparent = true;
  material.color = hovered ? new THREE.Color(0xffaaaa) : new THREE.Color(0xffffff);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);

  return (
    <mesh
      {...otherProps}
      geometry={mesh.geometry}
      material={material}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)} 
    />
  );
}

export default Model;
