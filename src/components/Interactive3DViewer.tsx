import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, RefreshCw } from 'lucide-react';

interface Interactive3DViewerProps {
  initialFinish?: 'paraiso_grafito' | 'roble_blanco' | 'nogal_arena';
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  initialFinish = 'paraiso_grafito'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState<'paraiso_grafito' | 'roble_blanco' | 'nogal_arena'>(initialFinish);
  const [lightsActive, setLightsActive] = useState(true);
  const [separateView, setSeparateView] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activePartFocus, setActivePartFocus] = useState<'all' | 'canopy' | 'vitrinas' | 'base'>('all');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Group references for "vista por separado"
  const groupsRef = useRef<{
    baseGroup?: THREE.Group;
    vitrinasGroup?: THREE.Group;
    canopyGroup?: THREE.Group;
    lightsGroup?: THREE.Group;
    emissiveMeshes?: THREE.Mesh[];
    woodMeshes?: THREE.Mesh[];
    baseMeshes?: THREE.Mesh[];
    topMeshes?: THREE.Mesh[];
    pointLights?: THREE.PointLight[];
  }>({
    emissiveMeshes: [],
    woodMeshes: [],
    baseMeshes: [],
    topMeshes: [],
    pointLights: []
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f3ee);
    sceneRef.current = scene;

    // 2. Camera: Framed specifically for the full island + canopy height
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.6, 3.4, 4.8);
    cameraRef.current = camera;

    // 3. Renderer with soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Floor collision limit
    controls.minDistance = 3.0;
    controls.maxDistance = 10.0;
    controls.target.set(0, 1.15, 0); // Focus on mid-height of the kiosk
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.9;
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaf0, 1.8);
    sunLight.position.set(7, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xedd9c4, 0.5);
    fillLight.position.set(-6, 7, -6);
    scene.add(fillLight);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(14, 28, 0xdcd8cf, 0xebe8e0);
    grid.position.y = 0.002;
    scene.add(grid);

    // Arrays to store categorized meshes
    const emissiveList: THREE.Mesh[] = [];
    const woodList: THREE.Mesh[] = [];
    const baseList: THREE.Mesh[] = [];
    const topList: THREE.Mesh[] = [];
    const pointLightsList: THREE.PointLight[] = [];

    // ==============================================================
    // 1. BASE MODULE (Chamfered / Faceted kiosk body like reference)
    // ==============================================================
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);
    groupsRef.current.baseGroup = baseGroup;

    // 1a. Plinth at floor with chrome/white edge
    const plinthGeo = new THREE.BoxGeometry(2.35, 0.06, 2.35);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xd8d6d0, metalness: 0.8, roughness: 0.2 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.03;
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    baseGroup.add(plinth);

    // 1b. Lower angled skirt (flares outward like photo)
    const lowerBodyGeo = new THREE.CylinderGeometry(1.68, 1.5, 0.32, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x2e3138, // Warm dark anthracite
      roughness: 0.4,
      metalness: 0.1
    });
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMat);
    lowerBody.rotation.y = Math.PI / 4;
    lowerBody.position.y = 0.22;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    baseGroup.add(lowerBody);
    baseList.push(lowerBody);

    // 1c. Center waist indent / bevel accent
    const waistGeo = new THREE.BoxGeometry(2.3, 0.04, 2.3);
    const waistMat = new THREE.MeshStandardMaterial({ color: 0x1f2126, roughness: 0.5 });
    const waist = new THREE.Mesh(waistGeo, waistMat);
    waist.position.y = 0.4;
    baseGroup.add(waist);
    baseList.push(waist);

    // 1d. Upper body counter base (tapering inward slightly)
    const upperBodyGeo = new THREE.CylinderGeometry(1.62, 1.7, 0.3, 4);
    const upperBody = new THREE.Mesh(upperBodyGeo, bodyMat);
    upperBody.rotation.y = Math.PI / 4;
    upperBody.position.y = 0.57;
    upperBody.castShadow = true;
    upperBody.receiveShadow = true;
    baseGroup.add(upperBody);
    baseList.push(upperBody);

    // 1e. Counter bed / Sub-top plate with light rim
    const bedGeo = new THREE.BoxGeometry(2.46, 0.04, 2.46);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x42464f, roughness: 0.3 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = 0.74;
    bed.castShadow = true;
    bed.receiveShadow = true;
    baseGroup.add(bed);
    topList.push(bed);

    // ==============================================================
    // 2. VITRINAS MODULE (U-shaped 360° Illuminated Glass Showcases)
    // ==============================================================
    const vitrinasGroup = new THREE.Group();
    scene.add(vitrinasGroup);
    groupsRef.current.vitrinasGroup = vitrinasGroup;

    // Showcase Glass Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.32,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.92,
      ior: 1.52,
      thickness: 0.02
    });

    // Showcase glowing deck material (like the bright white floors in reference image!)
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.8,
      roughness: 0.1
    });

    const createShowcase = (w: number, d: number, x: number, z: number) => {
      const showcaseItem = new THREE.Group();
      showcaseItem.position.set(x, 0, z);

      // Glowing illuminated floor
      const deckGeo = new THREE.BoxGeometry(w - 0.04, 0.03, d - 0.04);
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.y = 0.77;
      showcaseItem.add(deck);
      emissiveList.push(deck);

      // Glass enclosure box
      const glassH = 0.32;
      const enclosureGeo = new THREE.BoxGeometry(w, glassH, d);
      const enclosure = new THREE.Mesh(enclosureGeo, glassMat);
      enclosure.position.y = 0.77 + glassH / 2;
      showcaseItem.add(enclosure);

      // Subtle metallic corner frame
      const frameGeo = new THREE.BoxGeometry(w + 0.01, 0.01, d + 0.01);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x22242a, metalness: 0.8, roughness: 0.3 });
      const frameTop = new THREE.Mesh(frameGeo, frameMat);
      frameTop.position.y = 0.77 + glassH;
      showcaseItem.add(frameTop);

      return showcaseItem;
    };

    // Front showcase
    const frontShowcase = createShowcase(2.4, 0.6, 0, 0.88);
    vitrinasGroup.add(frontShowcase);

    // Left showcase
    const leftShowcase = createShowcase(0.6, 1.4, -0.9, -0.12);
    vitrinasGroup.add(leftShowcase);

    // Right showcase
    const rightShowcase = createShowcase(0.6, 1.4, 0.9, -0.12);
    vitrinasGroup.add(rightShowcase);

    // Center internal service opening & clerk counter
    const innerDeskGeo = new THREE.BoxGeometry(1.2, 0.04, 0.8);
    const innerDeskMat = new THREE.MeshStandardMaterial({ color: 0x363840, roughness: 0.4 });
    const innerDesk = new THREE.Mesh(innerDeskGeo, innerDeskMat);
    innerDesk.position.set(0, 0.76, -0.1);
    vitrinasGroup.add(innerDesk);
    topList.push(innerDesk);

    // Point lights for internal showcase illumination
    const vitrinaLight1 = new THREE.PointLight(0xfff8ee, 1.8, 1.8);
    vitrinaLight1.position.set(0, 0.95, 0.88);
    vitrinasGroup.add(vitrinaLight1);
    pointLightsList.push(vitrinaLight1);

    const vitrinaLight2 = new THREE.PointLight(0xfff8ee, 1.4, 1.6);
    vitrinaLight2.position.set(-0.9, 0.95, -0.12);
    vitrinasGroup.add(vitrinaLight2);
    pointLightsList.push(vitrinaLight2);

    const vitrinaLight3 = new THREE.PointLight(0xfff8ee, 1.4, 1.6);
    vitrinaLight3.position.set(0.9, 0.95, -0.12);
    vitrinasGroup.add(vitrinaLight3);
    pointLightsList.push(vitrinaLight3);

    // ==============================================================
    // 3. ARCHITECTURAL L-SHAPED CANOPY & TOTEM (Pórtico Alistonado)
    // ==============================================================
    const canopyGroup = new THREE.Group();
    scene.add(canopyGroup);
    groupsRef.current.canopyGroup = canopyGroup;

    // Wood Material (Default: Paraíso Natural)
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xc49c6d,
      roughness: 0.32,
      metalness: 0.05
    });

    // 3a. Frame backing for the vertical wall and ceiling
    const archFrameMat = new THREE.MeshStandardMaterial({ color: 0x24262c, roughness: 0.4 });

    // Vertical backboard
    const backboardGeo = new THREE.BoxGeometry(1.15, 1.62, 0.06);
    const backboard = new THREE.Mesh(backboardGeo, archFrameMat);
    backboard.position.set(0, 1.6, -0.88);
    backboard.castShadow = true;
    canopyGroup.add(backboard);

    // Ceiling top board (extending forward overhead)
    const ceilingBoardGeo = new THREE.BoxGeometry(1.15, 0.08, 1.35);
    const ceilingBoard = new THREE.Mesh(ceilingBoardGeo, archFrameMat);
    ceilingBoard.position.set(0, 2.45, -0.24);
    ceilingBoard.castShadow = true;
    canopyGroup.add(ceilingBoard);

    // 3b. Vertical Wood Slats (Varillado de madera de la pared)
    const slatCount = 14;
    const slatWidth = 0.045;
    const slatDepth = 0.045;
    const slatH = 1.6;
    const slatSpacing = 1.12 / slatCount;

    const vSlatGeo = new THREE.BoxGeometry(slatWidth, slatH, slatDepth);
    for (let i = 0; i < slatCount; i++) {
      const vSlat = new THREE.Mesh(vSlatGeo, woodMat);
      vSlat.position.set(-0.54 + (i + 0.5) * slatSpacing, 1.6, -0.84);
      vSlat.castShadow = true;
      vSlat.receiveShadow = true;
      canopyGroup.add(vSlat);
      woodList.push(vSlat);
    }

    // 3c. Ceiling Wood Slats (Continuing forward along the underside of canopy)
    const cSlatGeo = new THREE.BoxGeometry(slatWidth, slatDepth, 1.3);
    for (let i = 0; i < slatCount; i++) {
      const cSlat = new THREE.Mesh(cSlatGeo, woodMat);
      cSlat.position.set(-0.54 + (i + 0.5) * slatSpacing, 2.38, -0.24);
      cSlat.castShadow = true;
      canopyGroup.add(cSlat);
      woodList.push(cSlat);
    }

    // 3d. 3 Vertical Lightboxes on the back wall (Exactly as in photo!)
    const lbCount = 3;
    const lbW = 0.26;
    const lbH = 0.52;
    const lbD = 0.06;
    const lbSpacing = 1.05 / lbCount;

    for (let i = 0; i < lbCount; i++) {
      const lbBox = new THREE.Group();
      lbBox.position.set(-0.48 + (i + 0.5) * lbSpacing + 0.08, 1.75, -0.81);

      // Dark bezel border
      const bezelGeo = new THREE.BoxGeometry(lbW, lbH, lbD);
      const bezelMat = new THREE.MeshStandardMaterial({ color: 0x18191e, roughness: 0.3 });
      const bezel = new THREE.Mesh(bezelGeo, bezelMat);
      lbBox.add(bezel);

      // White glowing illuminated front screen
      const screenGeo = new THREE.BoxGeometry(lbW - 0.03, lbH - 0.03, 0.01);
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 2.2,
        roughness: 0.1
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = lbD / 2 + 0.005;
      lbBox.add(screen);
      emissiveList.push(screen);

      canopyGroup.add(lbBox);
    }

    // 3e. 2 Linear Ceiling Light Bars under canopy (Luminarias suspendidas como en la foto)
    const ceilingLightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2.5,
      roughness: 0.1
    });

    const lightBarGeo = new THREE.BoxGeometry(0.85, 0.035, 0.09);

    const lightBar1 = new THREE.Mesh(lightBarGeo, ceilingLightMat);
    lightBar1.position.set(0, 2.34, -0.48);
    canopyGroup.add(lightBar1);
    emissiveList.push(lightBar1);

    const lightBar2 = new THREE.Mesh(lightBarGeo, ceilingLightMat);
    lightBar2.position.set(0, 2.34, 0.02);
    canopyGroup.add(lightBar2);
    emissiveList.push(lightBar2);

    // Downward spotlights from canopy illuminating the counter
    const canopySpot1 = new THREE.PointLight(0xfffbf0, 3.2, 3.5);
    canopySpot1.position.set(0, 2.25, -0.4);
    canopyGroup.add(canopySpot1);
    pointLightsList.push(canopySpot1);

    const canopySpot2 = new THREE.PointLight(0xfffbf0, 3.2, 3.5);
    canopySpot2.position.set(0, 2.25, 0.1);
    canopyGroup.add(canopySpot2);
    pointLightsList.push(canopySpot2);

    // Store references
    groupsRef.current.emissiveMeshes = emissiveList;
    groupsRef.current.woodMeshes = woodList;
    groupsRef.current.baseMeshes = baseList;
    groupsRef.current.topMeshes = topList;
    groupsRef.current.pointLights = pointLightsList;

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 3 Distinct Material Finishes (NO harsh black, authentic retail architectural textures)
  useEffect(() => {
    const { woodMeshes, baseMeshes, topMeshes } = groupsRef.current;
    if (!woodMeshes || !baseMeshes || !topMeshes) return;

    let woodColor = 0xc49c6d; // Paraíso
    let baseColor = 0x2e3138; // Charcoal / Grafito arquitectónico (cálido, no negro absoluto)
    let topColor = 0x484b54;
    let roughness = 0.35;

    switch (activeMaterial) {
      case 'paraiso_grafito':
        // As seen in the reference photo: Natural Paraíso slats + Satin Warm Charcoal Base
        woodColor = 0xc49c6d;
        baseColor = 0x32353d;
        topColor = 0x25272e;
        roughness = 0.35;
        break;

      case 'roble_blanco':
        // Scandinavian mall kiosk: Light oak slats + Soft Off-White / Calacatta Base
        woodColor = 0xb88856;
        baseColor = 0xebe8e2;
        topColor = 0xf5f3ee;
        roughness = 0.28;
        break;

      case 'nogal_arena':
        // High-end luxury retail: Deep walnut slats + Warm Sandstone / Cemento Arena Base
        woodColor = 0x5a3d28;
        baseColor = 0x8a8479;
        topColor = 0xded9cf;
        roughness = 0.38;
        break;
    }

    woodMeshes.forEach((mesh) => {
      (mesh.material as THREE.MeshStandardMaterial).color.setHex(woodColor);
      (mesh.material as THREE.MeshStandardMaterial).roughness = roughness;
    });

    baseMeshes.forEach((mesh) => {
      (mesh.material as THREE.MeshStandardMaterial).color.setHex(baseColor);
      (mesh.material as THREE.MeshStandardMaterial).roughness = roughness;
    });

    topMeshes.forEach((mesh) => {
      (mesh.material as THREE.MeshStandardMaterial).color.setHex(topColor);
    });
  }, [activeMaterial]);

  // Lights toggle (Illuminates ceiling lights, 3 poster lightboxes and vitrina glowing decks)
  useEffect(() => {
    const { emissiveMeshes, pointLights } = groupsRef.current;
    if (!emissiveMeshes || !pointLights) return;

    if (lightsActive) {
      emissiveMeshes.forEach((m) => {
        (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0;
      });
      pointLights.forEach((p) => {
        p.intensity = 2.5;
      });
    } else {
      emissiveMeshes.forEach((m) => {
        (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.05;
      });
      pointLights.forEach((p) => {
        p.intensity = 0.1;
      });
    }
  }, [lightsActive]);

  // "Vista por separado" (Exploded / Part separation mode)
  useEffect(() => {
    const { baseGroup, vitrinasGroup, canopyGroup } = groupsRef.current;
    if (!baseGroup || !vitrinasGroup || !canopyGroup) return;

    if (separateView) {
      // Elevate and separate each module in 3D space
      canopyGroup.position.set(0, 0.7, -0.4);
      vitrinasGroup.position.set(0, 0.35, 0.2);
      baseGroup.position.set(0, -0.15, 0);
    } else {
      // Normal assembled state
      canopyGroup.position.set(0, 0, 0);
      vitrinasGroup.position.set(0, 0, 0);
      baseGroup.position.set(0, 0, 0);
    }
  }, [separateView]);

  // Module focus adjustment
  const handlePartFocus = (part: 'all' | 'canopy' | 'vitrinas' | 'base') => {
    setActivePartFocus(part);
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (part) {
      case 'all':
        camera.position.set(4.6, 3.4, 4.8);
        controls.target.set(0, 1.15, 0);
        break;
      case 'canopy':
        camera.position.set(2.8, 2.5, 2.5);
        controls.target.set(0, 1.85, -0.4);
        break;
      case 'vitrinas':
        camera.position.set(2.5, 1.6, 3.0);
        controls.target.set(0, 0.95, 0.4);
        break;
      case 'base':
        camera.position.set(3.4, 1.2, 3.4);
        controls.target.set(0, 0.45, 0);
        break;
    }
    controls.update();
  };

  // Auto-rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const resetView = () => {
    handlePartFocus('all');
    setSeparateView(false);
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[540px] lg:h-[580px] rounded-xl overflow-hidden border border-outline-variant bg-[#f5f3ee] shadow-sm flex flex-col justify-between">
      {/* 3D WebGL Canvas - NO TEXTS ON TOP AS REQUESTED */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Clean Swiss Minimalist Bottom Controls */}
      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-outline-variant flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* 3 Material Options (NO harsh black) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase text-on-surface-variant hidden md:inline-block mr-1">
            Material:
          </span>

          <button
            type="button"
            onClick={() => setActiveMaterial('paraiso_grafito')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all flex items-center gap-1.5 border ${
              activeMaterial === 'paraiso_grafito'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface-container text-on-surface border-outline-variant hover:border-primary/40'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#c49c6d] border border-black/20" />
            <span>Paraíso & Grafito</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMaterial('roble_blanco')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all flex items-center gap-1.5 border ${
              activeMaterial === 'roble_blanco'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface-container text-on-surface border-outline-variant hover:border-primary/40'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ebe8e2] border border-black/20" />
            <span>Roble & Blanco</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMaterial('nogal_arena')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all flex items-center gap-1.5 border ${
              activeMaterial === 'nogal_arena'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface-container text-on-surface border-outline-variant hover:border-primary/40'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#8a8479] border border-black/20" />
            <span>Nogal & Arena</span>
          </button>
        </div>

        {/* Lighting & Vista por Separado Toggles */}
        <div className="flex items-center gap-2">
          {/* Luces Toggle */}
          <button
            type="button"
            onClick={() => setLightsActive(!lightsActive)}
            title="Encender / apagar luces de techo, cajas de luz y vitrinas"
            className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors flex items-center gap-1 ${
              lightsActive
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-medium'
                : 'bg-surface-container text-on-surface-variant border-outline-variant hover:text-on-surface'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${lightsActive ? 'bg-amber-500 animate-pulse' : 'bg-neutral-400'}`} />
            <span>Luces</span>
          </button>

          {/* Vista por Separado (Despiece / Separación de Módulos) */}
          <button
            type="button"
            onClick={() => setSeparateView(!separateView)}
            title="Ver módulos y componentes por separado"
            className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors ${
              separateView
                ? 'bg-primary text-white border-primary font-medium'
                : 'bg-surface-container text-on-surface-variant border-outline-variant hover:text-on-surface'
            }`}
          >
            <span>Vista por separado</span>
          </button>

          {/* Module Zoom Buttons */}
          <div className="hidden xl:flex items-center bg-surface-container rounded p-0.5 border border-outline-variant font-mono text-[10px]">
            <button
              onClick={() => handlePartFocus('all')}
              className={`px-1.5 py-0.5 rounded ${activePartFocus === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              General
            </button>
            <button
              onClick={() => handlePartFocus('canopy')}
              className={`px-1.5 py-0.5 rounded ${activePartFocus === 'canopy' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              Pórtico
            </button>
            <button
              onClick={() => handlePartFocus('vitrinas')}
              className={`px-1.5 py-0.5 rounded ${activePartFocus === 'vitrinas' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              Vitrinas
            </button>
            <button
              onClick={() => handlePartFocus('base')}
              className={`px-1.5 py-0.5 rounded ${activePartFocus === 'base' ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
            >
              Base
            </button>
          </div>

          {/* Auto-rotation */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pausar giro' : 'Girar en 360°'}
            className={`p-1.5 rounded border transition-colors ${
              autoRotate ? 'bg-primary text-white border-primary' : 'bg-surface-container text-on-surface-variant border-outline-variant'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Reset View */}
          <button
            type="button"
            onClick={resetView}
            title="Restablecer posición inicial"
            className="p-1.5 rounded border bg-surface-container text-on-surface-variant border-outline-variant hover:text-on-surface"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
