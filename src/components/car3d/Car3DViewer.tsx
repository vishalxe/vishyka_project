import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import CarModel from './CarModel';
import ComponentHotspots from './ComponentHotspots';
import { ComponentData } from '../../types/vehicle';

interface Car3DViewerProps {
  components: ComponentData[];
  onComponentClick: (component: ComponentData) => void;
}

export default function Car3DViewer({ components, onComponentClick }: Car3DViewerProps) {
  return (
    <div className="w-full h-full glass rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <CarModel />
          <ComponentHotspots components={components} onComponentClick={onComponentClick} />
          
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            enableZoom={true}
            enableRotate={true}
          />
          
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}



