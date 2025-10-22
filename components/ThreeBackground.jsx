'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  return (
    <>
      <Float
        speed={1.4}
        rotationIntensity={1.5}
        floatIntensity={1.5}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh position={[2, 1, -5]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#667eea" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </Float>
      
      <Float
        speed={1.2}
        rotationIntensity={2}
        floatIntensity={2}
        floatingRange={[-0.2, 0.2]}
      >
        <mesh position={[-2, -1, -3]}>
          <octahedronGeometry args={[0.8, 2]} />
          <meshStandardMaterial 
            color="#764ba2" 
            wireframe 
            transparent 
            opacity={0.4}
          />
        </mesh>
      </Float>
      
      <Float
        speed={1.8}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[-0.15, 0.15]}
      >
        <mesh position={[0, 2, -4]}>
          <tetrahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial 
            color="#f093fb" 
            wireframe 
            transparent 
            opacity={0.5}
          />
        </mesh>
      </Float>
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          <FloatingGeometry />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
