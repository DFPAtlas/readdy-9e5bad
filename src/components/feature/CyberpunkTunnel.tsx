import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";

type Params = {
  speed: number;
  mouseParallax: number;
  cameraOffsetY: number;
  lightIntensity: number;
  depthFade: number;
  topColor: string;
  bottomColor: string;
  angleOffset: number;
  showRings: boolean;
  ringCount: number;
  reflectionStrength: number;
  ghostIntensity: number;
  matrixIntensity: number;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  rgbShiftAmount: number;
};

const DEFAULTS: Params = {
  speed: 0.2,
  mouseParallax: 5.0,
  cameraOffsetY: 3.0,
  lightIntensity: 1.2,
  depthFade: 0.001,
  topColor: "#0a198c",
  bottomColor: "#11133b",
  angleOffset: -0.25,
  showRings: true,
  ringCount: 10.0,
  reflectionStrength: 0.35,
  ghostIntensity: 1.0,
  matrixIntensity: 0.25,
  bloomStrength: 1.0,
  bloomRadius: 0.2,
  bloomThreshold: 0.15,
  rgbShiftAmount: 0.001,
};

function buildMatrixTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 44px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // half-width katakana unicode range
  for (let y = 24; y < size; y += 48) {
    for (let x = 24; x < size; x += 48) {
      const char = String.fromCharCode(0xff66 + Math.floor(Math.random() * 55));
      ctx.globalAlpha = 0.4 + Math.random() * 0.6;
      ctx.fillText(char, x, y);
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform float uAngleOffset;
  uniform float uIntensity;
  uniform float uDepthFade;
  uniform float uShowRings;
  uniform float uRingCount;
  uniform float uReflectionStrength;
  uniform float uGhostIntensity;
  uniform sampler2D uMatrixTex;
  uniform float uMatrixIntensity;

  float rand(float n) { return fract(sin(n) * 43758.5453123); }

  vec3 addSegmentedLine(vec3 color, float uvPrimary, float targetPrimary, float width, float uvSecondary, float id, float time, float speedMult, bool isRing) {
    float shiftedTarget = targetPrimary;
    if (!isRing) {
      shiftedTarget += (rand(id * 8.2) - 0.5) * 0.12;
    }
    float actualWidth = width * (0.1 + rand(id * 4.5) * 12.0);
    float weight = exp(-pow((uvPrimary - shiftedTarget) * actualWidth, 2.0));

    float speed = (0.5 + rand(id) * 4.0) * speedMult;
    float dir = rand(id * 2.1) > 0.5 ? 1.0 : -1.0;

    float scale = isRing ? floor(2.0 + rand(id * 1.3) * 6.0) : 0.05 + rand(id * 1.3) * 30.0;
    float phase = rand(id * 1.7) * 20.0;

    float movingCoord = uvSecondary * scale + time * speed * dir + phase;
    float dashPos = fract(movingCoord);
    float dashLen = 0.01 + rand(id * 3.4) * 0.93;
    float dashFade = 0.01 + rand(id * 7.1) * 0.08;
    float mask = smoothstep(0.0, dashFade, dashPos) * smoothstep(dashLen + dashFade, dashLen, dashPos);

    float baseScale = scale * (0.02 + rand(id * 5.2) * 0.3);
    float baseSpeed = speed * 0.1;
    float baseCoord = uvSecondary * baseScale + time * baseSpeed * dir + phase * 2.0;
    float basePos = fract(baseCoord);
    float baseLen = 0.1 + rand(id * 2.2) * 0.8;
    float baseFade = 0.1;
    float baseMask = smoothstep(0.0, baseFade, basePos) * smoothstep(baseLen + baseFade, baseLen, basePos);

    return color * weight * (0.25 * baseMask + 0.85 * mask);
  }

  vec3 addParticleDot(vec3 color, float uvPrimary, float targetPrimary, float width, float uvSecondary, float id, float time, float speedMult) {
    float actualWidth = width * (0.5 + rand(id * 6.1) * 3.0);
    float weight = exp(-pow((uvPrimary - targetPrimary) * actualWidth, 2.0));
    float speed = (2.0 + rand(id) * 4.0) * speedMult;
    float dir = rand(id * 2.1) > 0.5 ? 1.0 : -1.0;
    float scale = 10.0 + rand(id * 1.3) * 80.0;
    float phase = rand(id * 1.7) * 10.0;
    float movingCoord = uvSecondary * scale + time * speed * dir + phase;
    float dashPos = fract(movingCoord);
    float dashLen = 0.001 + rand(id * 3.4) * 0.015;
    float dashFade = 0.005;
    float mask = smoothstep(0.0, dashFade, dashPos) * smoothstep(dashLen + dashFade, dashLen, dashPos);
    return color * weight * mask * 4.0;
  }

  vec3 getGhostLayer(float h, float uvX, float time, float seed) {
    float scroll = uvX * 12.0 + time * 0.3 * (rand(seed) > 0.5 ? 1.0 : -1.0);
    float idX = floor(scroll);
    float localX = fract(scroll);
    float hasPanel = step(0.70, rand(idX + seed));
    float idY = floor(h * 80.0);
    float hasBar = step(0.30, rand(idY * 15.0 + idX));
    float pulse = pow(sin(time * 1.2 + rand(idX) * 10.0) * 0.5 + 0.5, 2.0);
    float maskX = smoothstep(0.0, 0.2, localX) * smoothstep(1.0, 0.8, localX);
    vec3 techColor = mix(vec3(0.2, 0.7, 1.0), vec3(1.0, 0.3, 0.7), rand(idX * 1.1));
    vec3 panel = techColor * hasPanel * hasBar * maskX * pulse * 0.35;

    float wave = sin(uvX * 5.0 + time * 0.5 + seed) * sin(h * 10.0 - time * 0.4 + seed) * 0.5 + 0.5;
    wave = pow(wave, 5.0);
    vec3 washColor = mix(vec3(0.1, 0.5, 1.0), vec3(0.8, 0.1, 0.5), rand(seed * 2.0));
    vec3 wash = washColor * wave * 0.03;
    return (panel + wash) * uGhostIntensity;
  }

  vec3 getRightSideColor(float h, float uvX, float time) {
    vec3 c = vec3(0.0);
    float hw = h + sin(uvX * 100.0) * 0.003;
    c += addSegmentedLine(vec3(0.2, 0.4, 1.0), hw, 0.35, 60.0,  uvX * 100.0, 10.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.2, 0.7), hw, 0.28, 300.0, uvX * 100.0, 11.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.6, 0.1), hw, 0.20, 120.0, uvX * 100.0, 12.0, time, 2.0, false);
    c += addSegmentedLine(vec3(0.0, 0.8, 1.0), hw, 0.10, 40.0,  uvX * 100.0, 13.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.9, 0.2), hw, 0.02, 500.0, uvX * 100.0, 14.0, time, 2.0, false);
    c += addSegmentedLine(vec3(0.1, 0.9, 0.3), hw, -0.08, 150.0, uvX * 100.0, 15.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.4, 0.0), hw, -0.18, 80.0,  uvX * 100.0, 16.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.1, 0.1), hw, -0.28, 400.0, uvX * 100.0, 17.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0), hw, 0.28, 450.0, uvX * 100.0, 18.0, time, 2.5, false) * 0.5;
    c += addSegmentedLine(vec3(1.0), hw, 0.10, 800.0, uvX * 100.0, 19.0, time, 2.5, false) * 0.5;
    c += addParticleDot(vec3(1.0, 0.5, 1.0), hw, 0.30, 400.0, uvX * 100.0, 80.0, time, 1.5);
    c += addParticleDot(vec3(0.5, 1.0, 1.0), hw, 0.15, 350.0, uvX * 100.0, 81.0, time, 2.5);
    c += addParticleDot(vec3(1.0, 1.0, 0.5), hw, -0.05, 450.0, uvX * 100.0, 82.0, time, 2.0);
    c += addParticleDot(vec3(1.0, 0.2, 0.2), hw, -0.20, 300.0, uvX * 100.0, 83.0, time, 3.0);
    c += getGhostLayer(hw, uvX, time, 112.3);
    return c;
  }

  vec3 getLeftSideColor(float h, float uvX, float time) {
    vec3 c = vec3(0.0);
    float hw = h + sin(uvX * 120.0 + 1.0) * 0.003;
    c += addSegmentedLine(vec3(1.0, 0.4, 0.0), hw, 0.32,  70.0,  uvX * 100.0, 20.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.1, 0.5), hw, 0.25,  350.0, uvX * 100.0, 21.0, time, 2.0, false);
    c += addSegmentedLine(vec3(0.1, 0.6, 1.0), hw, 0.15,  120.0, uvX * 100.0, 22.0, time, 2.0, false);
    c += addSegmentedLine(vec3(0.2, 0.9, 0.4), hw, 0.05,  50.0,  uvX * 100.0, 23.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.8, 0.0), hw, -0.05, 450.0, uvX * 100.0, 24.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0, 0.2, 0.1), hw, -0.15, 150.0, uvX * 100.0, 25.0, time, 2.0, false);
    c += addSegmentedLine(vec3(0.6, 0.1, 1.0), hw, -0.25, 60.0,  uvX * 100.0, 26.0, time, 2.0, false);
    c += addSegmentedLine(vec3(1.0), hw, 0.15, 600.0, uvX * 100.0, 27.0, time, 2.5, false) * 0.5;
    c += addSegmentedLine(vec3(1.0), hw, -0.05, 900.0, uvX * 100.0, 28.0, time, 2.5, false) * 0.5;
    c += addParticleDot(vec3(1.0, 0.8, 0.2), hw, 0.28, 350.0, uvX * 100.0, 90.0, time, 1.8);
    c += addParticleDot(vec3(0.2, 0.8, 1.0), hw, 0.10, 400.0, uvX * 100.0, 91.0, time, 2.2);
    c += addParticleDot(vec3(0.5, 1.0, 0.5), hw, -0.10, 300.0, uvX * 100.0, 92.0, time, 1.5);
    c += addParticleDot(vec3(1.0, 0.4, 0.8), hw, -0.20, 450.0, uvX * 100.0, 93.0, time, 2.7);
    c += getGhostLayer(hw, uvX, time, 442.1);
    return c;
  }

  vec3 getColorfulRings(float uvX, float uvY, float time) {
    vec3 c = vec3(0.0);
    float localX = fract(uvX * uRingCount);
    float cellId = floor(uvX * uRingCount);
    float ringType = fract(rand(cellId) * 10.0);
    vec3 rColor = vec3(0.0);
    if (ringType < 0.2) rColor = vec3(1.0, 0.2, 0.7);
    else if (ringType < 0.4) rColor = vec3(0.0, 0.8, 1.0);
    else if (ringType < 0.6) rColor = vec3(1.0, 0.6, 0.1);
    else if (ringType < 0.8) rColor = vec3(0.1, 0.9, 0.3);
    else rColor = vec3(1.0, 0.9, 0.2);

    c += addSegmentedLine(rColor, localX, 0.5, 60.0 + rand(cellId) * 40.0, uvY, cellId, time, 1.0, true);
    float activeMask = rand(cellId + 10.0) > 0.3 ? 1.0 : 0.0;
    return c * activeMask;
  }

  void main() {
    float y = fract(vUv.y + uAngleOffset);
    float cy = sin(y * 6.2831853);
    float cx = cos(y * 6.2831853);

    vec3 bgColor = mix(uBottomColor, uTopColor, smoothstep(-0.2, 0.5, cy));
    vec3 streakColor = vec3(0.0);

    if (cx > 0.0) {
      streakColor = getRightSideColor(cy, vUv.x, uTime);
    } else {
      streakColor = getLeftSideColor(cy, vUv.x, uTime);
    }

    vec3 ceilingColor = vec3(0.0);
    if (cy > 0.4) {
      float hwCeiling = cy + sin(vUv.x * 80.0) * 0.005;
      ceilingColor += addSegmentedLine(vec3(0.6, 0.8, 1.0), hwCeiling, 0.70, 500.0, vUv.x * 100.0, 30.0, uTime, 0.5, false) * 0.5;
      ceilingColor += addSegmentedLine(vec3(0.8, 0.9, 1.0), hwCeiling, 0.82, 800.0, vUv.x * 100.0, 31.0, uTime, 0.4, false) * 0.7;
      ceilingColor += addSegmentedLine(vec3(0.9, 0.95, 1.0), hwCeiling, 0.92, 1000.0, vUv.x * 100.0, 32.0, uTime, 0.6, false) * 0.9;
      ceilingColor += addSegmentedLine(vec3(1.0, 1.0, 1.0), hwCeiling, 0.76, 600.0, vUv.x * 100.0, 40.0, uTime, 3.0, false) * 0.7;
      ceilingColor += addSegmentedLine(vec3(0.5, 0.8, 1.0), hwCeiling, 0.88, 700.0, vUv.x * 100.0, 41.0, uTime, 2.5, false) * 0.6;
    }

    float sideMask = smoothstep(0.7, 0.1, abs(cy));
    vec3 finalColor = bgColor + (streakColor * uIntensity * sideMask) + (ceilingColor * uIntensity);

    if (uShowRings > 0.5) {
      vec3 ringsColor = getColorfulRings(vUv.x, y, uTime);
      float ringMask = smoothstep(-0.8, -0.4, cy);
      finalColor += ringsColor * uIntensity * ringMask;
    }

    if (uMatrixIntensity > 0.0) {
      vec2 texUv = vec2(vUv.x * 250.0, y * 14.0);
      float textVal = texture2D(uMatrixTex, texUv).r;
      float streamId = floor(texUv.y);
      float speed = 0.5 + rand(streamId * 1.5) * 1.5;
      float phase = rand(streamId * 7.1) * 10.0;
      float dir = rand(streamId * 3.3) > 0.5 ? 1.0 : -1.0;
      float trailCoord = vUv.x * 8.0 + uTime * speed * dir + phase;
      float trailPos = fract(trailCoord);
      float trailMask = smoothstep(0.0, 0.8, trailPos) * smoothstep(1.0, 0.95, trailPos);
      float headMask = smoothstep(0.95, 1.0, trailPos);
      float cellId = floor(texUv.x) + streamId * 100.0;
      float flicker = sin(uTime * 15.0 + rand(cellId) * 20.0) * 0.5 + 0.5;
      float matrixVisibility = (trailMask * 0.6 + headMask * 2.0) * (0.3 + 0.7 * flicker);
      vec3 matrixBaseColor = vec3(0.0, 0.9, 0.3);
      vec3 matrixHeadColor = vec3(0.6, 1.0, 0.8);
      vec3 mColor = mix(matrixBaseColor, matrixHeadColor, headMask);
      float matrixSideMask = smoothstep(0.8, 0.2, abs(cy));
      finalColor += mColor * textVal * matrixVisibility * uMatrixIntensity * matrixSideMask * uIntensity;
    }

    if (cy < -0.2 && uReflectionStrength > 0.0) {
      float refCy = abs(cy);
      float ripple = sin(vUv.x * 300.0 - uTime * 5.0) * 0.03 + sin(vUv.x * 1000.0) * 0.01;
      float refCx = cx + ripple;
      vec3 reflection = vec3(0.0);
      if (refCx > 0.0) {
        reflection = getRightSideColor(refCy, vUv.x, uTime);
      } else {
        reflection = getLeftSideColor(refCy, vUv.x, uTime);
      }
      float refMask = smoothstep(-0.2, -0.8, cy) * smoothstep(-1.0, -0.9, cy);
      finalColor += reflection * uReflectionStrength * refMask;
    }

    float dist = length(cameraPosition - vWorldPosition);
    float fogFactor = exp(-dist * uDepthFade);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = max(0.0, dot(-vWorldNormal, viewDir));
    float cavityShadow = mix(0.5, 1.0, smoothstep(0.0, 0.8, fresnel));

    finalColor *= cavityShadow;
    finalColor = mix(uBottomColor, finalColor, fogFactor);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function CyberpunkTunnel({
  className = "",
  params: paramOverride,
}: {
  className?: string;
  params?: Partial<Params>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params: Params = { ...DEFAULTS, ...paramOverride };

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color(params.topColor), 0.008);

    const camera = new THREE.PerspectiveCamera(
      85,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Post Processing ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      params.bloomStrength,
      params.bloomRadius,
      params.bloomThreshold,
    );
    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms["amount"].value = params.rgbShiftAmount;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(rgbShiftPass);

    // --- Massive Tunnel Curve (helix-like loop) ---
    const pathPoints: THREE.Vector3[] = [];
    const pathSegments = 400;
    for (let i = 0; i <= pathSegments; i++) {
      const t = i / pathSegments;
      const angle = t * Math.PI * 2;
      const x = Math.cos(angle) * 350;
      const z = Math.sin(angle * 2) * 250;
      const y = Math.sin(angle * 3) * 35;
      pathPoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pathPoints, true);

    // CRITICAL: Override Frenet frames so the tube's "up" always points to world up.
    // Without this, the default Three.js Frenet frames twist along the curve and the
    // floor/ceiling distinction in the shader (wet-floor reflection, ceiling lights,
    // colorful rings) gets rotated randomly across the tunnel walls — making the
    // whole tunnel feel "floaty" with no consistent ground direction.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (curve as any).computeFrenetFrames = function (
      segs: number,
      _closed: boolean,
    ) {
      const tangents: THREE.Vector3[] = [];
      const normals: THREE.Vector3[] = [];
      const binormals: THREE.Vector3[] = [];
      const worldUp = new THREE.Vector3(0, 1, 0);
      for (let i = 0; i <= segs; i++) {
        const u = i / segs;
        const tangent = this.getTangentAt(u).normalize();
        tangents.push(tangent);
        const binormal = new THREE.Vector3()
          .crossVectors(tangent, worldUp)
          .normalize();
        const normal = new THREE.Vector3()
          .crossVectors(binormal, tangent)
          .normalize();
        binormals.push(binormal);
        normals.push(normal);
      }
      return { tangents, normals, binormals };
    };

    const tubeRadius = 15;
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      pathSegments * 2,
      tubeRadius,
      64,
      true,
    );

    const matrixTexture = buildMatrixTexture();

    const tubeMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTopColor: { value: new THREE.Color(params.topColor) },
        uBottomColor: { value: new THREE.Color(params.bottomColor) },
        uAngleOffset: { value: params.angleOffset },
        uIntensity: { value: params.lightIntensity },
        uDepthFade: { value: params.depthFade },
        uShowRings: { value: params.showRings ? 1.0 : 0.0 },
        uRingCount: { value: params.ringCount },
        uReflectionStrength: { value: params.reflectionStrength },
        uGhostIntensity: { value: params.ghostIntensity },
        uMatrixTex: { value: matrixTexture },
        uMatrixIntensity: { value: params.matrixIntensity },
      },
      side: THREE.BackSide,
    });

    const tunnelMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tunnelMesh);

    // --- Mouse Parallax (with roll & tilt) ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- Camera helper: position on the "floor" of the tube ---
    const tmpUp = new THREE.Vector3(0, 1, 0);
    const tmpRight = new THREE.Vector3();
    const tmpNormal = new THREE.Vector3();
    function getFloorPosition(t: number, yOffset: number): THREE.Vector3 {
      const pos = curve.getPointAt(t).clone();
      const tan = curve.getTangentAt(t).normalize();
      tmpRight.crossVectors(tan, tmpUp).normalize();
      tmpNormal.crossVectors(tmpRight, tan).normalize();
      return pos.add(tmpNormal.multiplyScalar(yOffset));
    }

    // --- Animate ---
    const clock = new THREE.Clock();
    let flightProgress = 0;
    let currentSpeed = params.speed;
    let rafId = 0;
    let disposed = false;

    const animate = () => {
      if (disposed) return;
      rafId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();

      tubeMaterial.uniforms.uTime.value = time;

      currentSpeed = THREE.MathUtils.lerp(currentSpeed, params.speed, dt * 2.0);

      flightProgress = (flightProgress + currentSpeed * dt * 0.1) % 1.0;

      const camPos = getFloorPosition(flightProgress, params.cameraOffsetY);
      const lookAtPos = curve.getPointAt((flightProgress + 0.012) % 1.0);

      camera.position.copy(camPos);
      camera.lookAt(lookAtPos);

      // Mouse easing
      mouseX = THREE.MathUtils.lerp(mouseX, targetMouseX, dt * 4.0);
      mouseY = THREE.MathUtils.lerp(mouseY, targetMouseY, dt * 4.0);

      camera.translateX(mouseX * params.mouseParallax);
      camera.translateY(mouseY * params.mouseParallax * 0.5);
      camera.rotateZ(-mouseX * 0.1 * params.mouseParallax);
      camera.rotateX(mouseY * 0.05 * params.mouseParallax);

      composer.render();
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      tubeGeometry.dispose();
      tubeMaterial.dispose();
      matrixTexture.dispose();
      bloomPass.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paramOverride]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}