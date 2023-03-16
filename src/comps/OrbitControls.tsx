import React from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

// Type casting to tell TypeScript that `orbitControls` is a valid HTML element
const OrbitControlsImpl = (OrbitControls as any);

const Controls = React.memo(() => {
    const { camera, gl } = useThree();
    // Using `useMemo` to memoize the OrbitControlsImpl instance
    const controlsRef = React.useRef(React.useMemo(() => new OrbitControlsImpl(camera, gl.domElement), [camera, gl.domElement]));
    
    // Set the properties of the OrbitControls to customize the camera behavior
    controlsRef.current.rotateSpeed = 0.3;
    controlsRef.current.zoomSpeed = 0.4;
    controlsRef.current.panSpeed = 0.1;
    controlsRef.current.autoRotate = true;
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.1;
    
    // Memoize the update function using `useCallback`
    const update = React.useCallback(() => controlsRef.current.update(), []);
    useFrame(update);
    return null;
});

Controls.displayName = 'Controls';
export default Controls;
