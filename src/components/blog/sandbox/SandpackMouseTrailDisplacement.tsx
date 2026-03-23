"use client";
import Sandpack from "./index";

const SandpackMouseTrailDisplacement = () => {
  const files = {
    "/App.js": {
      code: `import React, { useEffect, useRef } from "react";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, LinearFilter, Vector2 } from "three";
import { useTrailCanvas } from "./useTrailCanvas";

const vertexShader = \`
uniform float uTime;

varying vec2 vUv;

float PI = 3.141592653589793;

void main() {
  vec3 pos = position;

  vec4 modelPosition = modelMatrix * vec4(vec3(pos), 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vUv = uv;
}
\`;

const fragmentShader = \`
uniform sampler2D uTexture;
uniform sampler2D uDisplacementTexture;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform float uTime;

float PI = 3.141592653589793;

varying vec2 vUv;

vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
  float rs = s.x / s.y; // Aspect screen size
  float ri = i.x / i.y; // Aspect image size
  vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
  vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
  return u * s / st + o;
}

void main() {
  vec2 coverUv = CoverUV(vUv, uResolution, uImageResolution);
  vec4 displacement = texture2D(uDisplacementTexture, vUv);

  displacement = smoothstep(0.1, 1.0, displacement);

  float theta = displacement.r * 2.0 * PI; // Convert from [0, 1] to [0, 2π]
  vec2 offset = vec2(cos(theta), sin(theta));

  coverUv += offset * displacement.r * 0.05;

  vec4 color = texture2D(uTexture, coverUv);

  gl_FragColor = color;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
\`;

export const CardMaterial = shaderMaterial(
  {
    uTexture: null,
    uDisplacementTexture: null,
    uResolution: new Vector2(0, 0),
    uImageResolution: new Vector2(0, 0),
  },
  vertexShader,
  fragmentShader,
);

extend({ CardMaterial });

function Experience() {
  const { viewport, size } = useThree((state) => state);

  const materialRef = useRef(null);
  const canvasTexture = useRef(null);

  const texture = useTexture(
    "https://cdn.cosmos.so/084d20d7-19de-416f-8ab4-a23b7d5efafd?format=jpeg",
  );

  useEffect(() => {
    const { getTexture, dispose } = useTrailCanvas({
      showCanvas: true,
      onResize: () => {
        if (canvasTexture.current) {
          canvasTexture.current.dispose();
        }
        canvasTexture.current = new CanvasTexture(getTexture());
        canvasTexture.current.minFilter = LinearFilter;
        canvasTexture.current.magFilter = LinearFilter;
        canvasTexture.current.generateMipmaps = false;

        canvasTexture.current.needsUpdate = true;
      },
    });
    canvasTexture.current = new CanvasTexture(getTexture());
    canvasTexture.current.minFilter = LinearFilter;
    canvasTexture.current.magFilter = LinearFilter;
    canvasTexture.current.generateMipmaps = false;

    return () => {
      dispose();
      if (canvasTexture.current) {
        canvasTexture.current.dispose();
      }
    };
  }, []);

  useFrame(() => {
    if (materialRef.current && canvasTexture.current) {
      materialRef.current.uniforms.uDisplacementTexture.value =
        canvasTexture.current;
      materialRef.current.uniforms.uDisplacementTexture.value.needsUpdate = true;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <cardMaterial
        ref={materialRef}
        wireframe={false}
        uDisplacementTexture={canvasTexture.current}
        uTexture={texture}
        uImageResolution={
          new Vector2(texture.source.data.width, texture.source.data.height)
        }
        uResolution={
          new Vector2(viewport.dpr * size.width, viewport.dpr * size.height)
        }
      />
    </mesh>
  );
}

export default function Page() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{
        position: [0, 0, 1],
      }}
    >
      <Experience />
    </Canvas>
  );
}`,
    },
    "/useTrailCanvas.js": {
      code: `export function useTrailCanvas(props) {
  const {
    height = 512,
    showCanvas = false,
    image,
    radius = height * 0.125,
    softness = 0.5,
    onResize = () => {},
  } = props || {};

  const sizes = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };
  const aspectRatio = sizes.screenWidth / sizes.screenHeight;
  const cursorPosition = { x: 9999, y: 9999 };
  const canvasPosition = { x: 9999, y: 9999 };
  const previousCursorPosition = { x: 9999, y: 9999 };

  const canvas = document.createElement("canvas");
  canvas.width = height * aspectRatio;
  canvas.height = height;

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.right = "0";
  canvas.style.width = "150px";
  canvas.style.height = \`\${150 / aspectRatio}px\`;
  canvas.style.display = showCanvas ? "block" : "none";
  canvas.style.zIndex = "10";
  canvas.style.pointerEvents = "none";
  canvas.style.border = showCanvas ? "1px solid white" : "none";

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let loadedImage = null;

  if (image) {
    if (typeof image === "string") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      img.onload = () => {
        loadedImage = img;
      };
    } else {
      loadedImage = image;
    }
  }

  // EVENTS
  function handleMouseMove(ev) {
    const x = ev.clientX / sizes.screenWidth;
    const y = 1 - ev.clientY / sizes.screenHeight;

    cursorPosition.x = x;
    cursorPosition.y = y;
    canvasPosition.x = x * canvas.width;
    canvasPosition.y = (1 - y) * canvas.height;
  }

  function handleTouchMove(ev) {
    ev.preventDefault();

    if (ev.touches.length > 0) {
      const touch = ev.touches[0];
      const x = touch.clientX / sizes.screenWidth;
      const y = 1 - touch.clientY / sizes.screenHeight;

      cursorPosition.x = x;
      cursorPosition.y = y;
      canvasPosition.x = x * canvas.width;
      canvasPosition.y = (1 - y) * canvas.height;
    }
  }

  function handleTouchStart(ev) {
    if (ev.touches.length > 0) {
      const touch = ev.touches[0];
      const x = touch.clientX / sizes.screenWidth;
      const y = 1 - touch.clientY / sizes.screenHeight;

      cursorPosition.x = x;
      cursorPosition.y = y;
      canvasPosition.x = x * canvas.width;
      canvasPosition.y = (1 - y) * canvas.height;
      previousCursorPosition.x = canvasPosition.x;
      previousCursorPosition.y = canvasPosition.y;
    }
  }

  function handleResize() {
    sizes.screenWidth = window.innerWidth;
    sizes.screenHeight = window.innerHeight;
    const newAspectRatio = sizes.screenWidth / sizes.screenHeight;
    canvas.width = canvas.height * newAspectRatio;
    canvas.style.height = \`\${150 / newAspectRatio}px\`;

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    onResize(canvas.width, canvas.height);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("resize", handleResize);
  }

  let animationFrameId = null;
  let lastTime = performance.now();

  function animate(currentTime) {
    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.globalAlpha = delta * 3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const distance = Math.hypot(
      canvasPosition.x - previousCursorPosition.x,
      canvasPosition.y - previousCursorPosition.y,
    );

    previousCursorPosition.x = canvasPosition.x;
    previousCursorPosition.y = canvasPosition.y;

    ctx.globalCompositeOperation = "lighten";
    ctx.globalAlpha = Math.min(1, distance * 0.1);
    if (loadedImage) {
      ctx.drawImage(
        loadedImage,
        canvasPosition.x - radius,
        canvasPosition.y - radius,
        radius * 2,
        radius * 2,
      );
    } else {
      const innerRadius = radius * (1 - softness);
      const gradient = ctx.createRadialGradient(
        canvasPosition.x,
        canvasPosition.y,
        innerRadius,
        canvasPosition.x,
        canvasPosition.y,
        radius,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(canvasPosition.x, canvasPosition.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);

  function dispose() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
    }
    if (canvas.parentElement) {
      canvas.parentElement.removeChild(canvas);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return {
    getTexture: () => canvas,
    dispose,
  };
}`,
    },
  };

  return (
    <Sandpack
      template="react"
      files={files}
      dependencies={{
        react: "18.2.0",
        "react-dom": "18.2.0",
        three: "0.158.0",
        "@react-three/fiber": "8.15.12",
        "@react-three/drei": "9.92.5",
      }}
      options={{
        editorWidthPercentage: 50,
        editorHeight: 600,
      }}
      defaultTab="preview"
    />
  );
};

export default SandpackMouseTrailDisplacement;
