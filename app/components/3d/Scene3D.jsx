"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function CinematicDust(props) {
    const ref = useRef();

    // Generate random points natively for atmospheric dust
    const dust = useMemo(() => {
        const count = 1500; // Reduced for performance
        const positions = new Float32Array(count * 3);
        const randRange = (min, max) => Math.random() * (max - min) + min;

        for (let i = 0; i < count; i++) {
            // Spread dust across a wide volume
            positions[i * 3] = randRange(-20, 20);     // x
            positions[i * 3 + 1] = randRange(-20, 20); // y
            positions[i * 3 + 2] = randRange(-10, 5);  // z (mostly behind)
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Slow, drifting dust movement instead of a rigid rotating sphere
            ref.current.position.y += delta * 0.1;
            ref.current.rotation.y += delta * 0.02;
            if (ref.current.position.y > 10) {
                ref.current.position.y = -10;
            }
        }
    });

    return (
        <group>
            <Points ref={ref} positions={dust} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
}

function FloatingScreens() {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Gentle floating motion like layers in After Effects
            groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
            groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 10, 5]} intensity={0.5} color="#c9a84c" />
            <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#ffffff" />

            {/* Cinematic Glass Screen Layers (Simulating NLE Tracks) */}
            {[
                { pos: [-3, 1, -4], rot: [0, 0.4, 0], size: [4, 2.5, 0.05], opacity: 0.1 },
                { pos: [4, -2, -6], rot: [0, -0.3, 0], size: [3, 1.8, 0.05], opacity: 0.08 },
                { pos: [0, 3, -8], rot: [0.1, 0, 0], size: [5, 2.8, 0.05], opacity: 0.05 },
            ].map((pane, i) => (
                <mesh key={i} position={pane.pos} rotation={pane.rot}>
                    <boxGeometry args={pane.size} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={pane.opacity}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                    {/* Outline wireframe to give it an "Editing Software" UI vibe */}
                    <lineSegments>
                        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(...pane.size)]} />
                        <lineBasicMaterial attach="material" color="#c9a84c" transparent opacity={0.2} />
                    </lineSegments>
                </mesh>
            ))}
        </group>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-midnight-950">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <CinematicDust />
                <FloatingScreens />

                {/* Fog for depth fading seamlessly into background */}
                <fog attach="fog" args={['#04040a', 10, 35]} />
            </Canvas>
        </div>
    );
}
