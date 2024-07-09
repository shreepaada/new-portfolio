import React, { useRef, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { useScrollTo } from "hooks";
import { useMediaQuery } from "utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

export function WelcomeSection() {
  const ref = useRef(null);
  const introRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollToEl } = useScrollTo();
  const isTabletUp = useMediaQuery("min-width: 768px");

  const [count, setCount] = useState(0);
  const [text] = useState([
    "develop websites using Next.js",
    "convert design into modern UI",
    "build interactive UI using React",
    "develop websites using Next.js",
  ]);

  const onClick = (e) => scrollToEl(e);

  return (
    <LazyMotion features={domAnimation}>
      <section id="intro" className="section" ref={introRef}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] gap-4 items-center">
          <div className="py-5 md:py-10">
            <h1
              tabIndex="0"
              ref={ref}
              className="text-3xl md:text-5xl xl:text-6xl font-bold"
              style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              <p>
                Hi, I&apos;m <mark>Shreepaada</mark> a <mark>passionate</mark> front-end software developer.
              </p>
            </h1>

            <div className="mt-3 relative flex flex-col overflow-hidden">
              <p
                ref={ref}
                className="text-[17px] md:text-2xl transform-none opacity-100"
                style={{
                  transform: isInView ? "none" : "translateX(-200px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}
              >
                I
                <span
                  className="absolute flex flex-col transition-all duration-500 ease-in-expo"
                  style={{
                    top: count === 0 ? "0" : count === 1 ? "-100%" : count === 2 ? "-200%" : count === 3 ? "-300%" : "0",
                    left: "13px",
                  }}
                >
                  {text.map((element) => (
                    <TextElement key={element} element={element} />
                  ))}
                </span>
              </p>
            </div>

            <p
              tabIndex="0"
              ref={ref}
              className="mt-3 mb-10 text-gray-500 text-xl"
              style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              look around for my work
            </p>
            <div
              ref={ref}
              style={{
                transform: isInView ? "none" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
       
            </div>
          </div>

          {isTabletUp && (
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <Suspense fallback={null}>
                <Shapes />
                <ContactShadows
                  position={[0, -3.5, 0]}
                  opacity={0.65}
                  scale={40}
                  blur={1}
                  far={9}
                />
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}

function Shapes() {
  const geometries = [
    { position: [0, 0, 0], r: 0.3, geometry: new THREE.IcosahedronGeometry(3) }, // Gem
    { position: [1, -0.75, 4], r: 0.4, geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16) }, // Pill
    { position: [-1.4, 2, -4], r: 0.6, geometry: new THREE.DodecahedronGeometry(1.5) }, // Soccer ball
    { position: [-0.8, -0.75, 5], r: 0.5, geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32) }, // Donut
    { position: [1.6, 1.6, -4], r: 0.7, geometry: new THREE.OctahedronGeometry(1.5) }, // Diamond
  ];

  const soundEffects = [
    new Audio("/sounds/hit2.ogg"),
    new Audio("/sounds/hit3.ogg"),
    new Audio("/sounds/hit4.ogg"),
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0.5, color: 0x2980b9 }),
    new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.1, metalness: 0.5 }),
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)} // Unique key
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}

function TextElement({ element }) {
  const firstWord = <b>{element.split(" ")[0]}</b>;
  const restWords = element.split(" ").slice(1).join(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span
      tabIndex="0"
      ref={ref}
      className="text-[17px] md:text-2xl"
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      {firstWord} {restWords}
    </span>
  );
}
