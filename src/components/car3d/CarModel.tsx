import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Phase 1: Placeholder geometry - simple box representing car
// Phase 2: Will load GLB model here
export default function CarModel() {
  const meshRef = useRef<Mesh>(null);

  // Optional: subtle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle idle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group>
      {/* Main body - placeholder box */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wheels - placeholder spheres */}
      {[
        [-0.8, -0.5, 1.2],
        [0.8, -0.5, 1.2],
        [-0.8, -0.5, -1.2],
        [0.8, -0.5, -1.2],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      
      {/* Windshield placeholder */}
      <mesh position={[0, 0.3, 1.5]} castShadow>
        <boxGeometry args={[1.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#4a90e2" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}



