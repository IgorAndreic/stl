import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
import { EffectComposer, Bloom, N8AO } from '@react-three/postprocessing';

const STLModel = ({ url, normalMapUrl }) => {
    const ref = useRef();
    const { camera, gl, scene } = useThree();
    const [geometry, setGeometry] = useState(null);
    const [normalMap, setNormalMap] = useState(null);

    useEffect(() => {
        const loader = new STLLoader();
        console.log(url);
        loader.load(url, (geometry) => {
            geometry.center(); // Center the model
            setGeometry(geometry);

            // Adjust camera
            const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // Increase Z value for better view

            camera.position.set(0, 0, cameraZ);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
            gl.render(scene, camera);
        });

        // Load normal map
        if (normalMapUrl) {
            const textureLoader = new TextureLoader();
            textureLoader.load(
                normalMapUrl,
                (texture) => {
                    setNormalMap(texture);
                },
                undefined,
                (error) => {
                    console.error('Error loading normal map:', error);
                }
            );
        }
    }, [url, normalMapUrl, camera, gl, scene]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.1;
            ref.current.rotation.y += delta * 0.1;
        }
    });

    if (!geometry) return null;

    return (
        <mesh geometry={geometry} ref={ref} scale={1} castShadow receiveShadow>
            <meshStandardMaterial
                color={'#ffffff'} // Neutral grey color
                metalness={0.7} // High value for shininess
                roughness={0.4} // Medium value for smooth surface
                emissive={'#ffffff'} // Light color for glow
                emissiveIntensity={0.1} // Moderate glow
                normalMap={normalMap} // Apply normal map
            />
        </mesh>
    );
};

const ModelSTL = ({ url, normalMapUrl }) => {
    return (
        <Canvas shadows>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} castShadow />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} />
            <pointLight position={[0, 10, 0]} intensity={0.7} />
            <STLModel url={url} normalMapUrl={normalMapUrl} />
            <OrbitControls />
            <EffectComposer>
                <N8AO samples={31} radius={20} intensity={10} luminanceInfluence={0.1} />
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.5} />
            </EffectComposer>
        </Canvas>
    );
};

export default ModelSTL;