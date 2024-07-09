// WelcomeAnimation.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const FloatingObject = () => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  // Rotate the object
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 1, 0]}
      scale={hovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setHover(!hovered)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default function WelcomeAnimation() {
  return (
    <FloatingObject />
  );
}
