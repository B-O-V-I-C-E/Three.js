import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow>
      <boxBufferGeometry args={[20,1,10]} />
      <meshPhysicalMaterial color='#333' />
    </mesh>
  );
}

export default Floor;