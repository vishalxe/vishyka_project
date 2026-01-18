import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ComponentData } from '../../types/vehicle';
import { getStatusDotColor } from '../../utils/colorUtils';

interface ComponentHotspotsProps {
  components: ComponentData[];
  onComponentClick: (component: ComponentData) => void;
}

function Hotspot({ component, onClick, isHovered }: { component: ComponentData; onClick: () => void; isHovered: boolean }) {
  const meshRef = useRef<Mesh>(null);
  const { position3D, status } = component;
  const colorClass = getStatusDotColor(status);
  const colorMap: Record<string, string> = {
    'bg-status-excellent': '#22c55e',
    'bg-status-good': '#eab308',
    'bg-status-warning': '#f97316',
    'bg-status-critical': '#ef4444',
  };
  const color = colorMap[colorClass] || '#22c55e';
  const size = status === 'critical' ? 0.15 : status === 'warning' ? 0.12 : 0.1;

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + component.id.length) * 0.2;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh
      ref={meshRef}
      name={`hotspot-${component.id}`}
      position={[position3D.x, position3D.y, position3D.z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => {}}
      onPointerOut={() => {}}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={isHovered ? 1 : 0.7}
      />
    </mesh>
  );
}

export default function ComponentHotspots({ components, onComponentClick }: ComponentHotspotsProps) {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return (
    <group>
      {components.map((component) => (
        <Hotspot
          key={component.id}
          component={component}
          onClick={() => onComponentClick(component)}
          isHovered={hoveredComponent === component.id}
        />
      ))}
    </group>
  );
}

