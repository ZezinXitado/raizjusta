import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Modelo 3D procedural do Raizinho: cada parte é um objeto articulado independente.

const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0, ...o });

function mesh(geo, material, pos = [0, 0, 0], scale = null, rot = null) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(...pos);
  if (scale) m.scale.set(...scale);
  if (rot) m.rotation.set(...rot);
  return m;
}

function group(parent, pos = [0, 0, 0]) {
  const g = new THREE.Group();
  g.position.set(...pos);
  if (parent) parent.add(g);
  return g;
}

export function leafGeometry(len = 0.36) {
  const w = len * 0.42;
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(w, len * 0.2, w * 0.9, len * 0.75, 0, len);
  s.bezierCurveTo(-w * 0.9, len * 0.75, -w, len * 0.2, 0, 0);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.012, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 2, curveSegments: 14,
  });
  g.translate(0, 0, -0.006);
  return g;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(20,50,30,0.42)");
  g.addColorStop(1, "rgba(20,50,30,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function buildProps(M, holder) {
  const props = {};
  const add = (name, g) => {
    g.position.set(0, 0.08, 0.07);
    g.visible = false;
    holder.add(g);
    props[name] = g;
  };
  const cupMat = mat(0xfaf7f0, { roughness: 0.3 });

  let g = new THREE.Group(); // café
  g.add(mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.16, 24), cupMat, [0, 0.08, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.092, 0.092, 0.01, 24), mat(0x4a2a14), [0, 0.157, 0]));
  g.add(mesh(new THREE.TorusGeometry(0.045, 0.014, 8, 16), cupMat, [0.11, 0.08, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.015, 24), cupMat));
  add("coffee", g);

  g = new THREE.Group(); // mel
  g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.17, 24), mat(0xf2a516, { roughness: 0.15, transparent: true, opacity: 0.93 }), [0, 0.085, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.106, 0.106, 0.045, 24), mat(0x8a5a2b), [0, 0.19, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.103, 0.103, 0.07, 24), mat(0xfff2cc), [0, 0.08, 0]));
  add("honey", g);

  g = new THREE.Group(); // cacau
  g.add(mesh(new THREE.SphereGeometry(0.1, 20, 16), mat(0xc8682c, { roughness: 0.5 }), [0, 0.13, 0], [1, 1.75, 1], [0, 0, 0.4]));
  g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.06), M.leatherDark, [-0.08, 0.3, 0], null, [0, 0, 0.4]));
  add("cacao", g);

  g = new THREE.Group(); // milho
  g.add(mesh(new THREE.CapsuleGeometry(0.065, 0.2, 6, 14), mat(0xf6cf3c, { roughness: 0.6 }), [0, 0.15, 0]));
  const husk = leafGeometry(0.26);
  g.add(mesh(husk, M.leaf, [0.02, 0.0, 0.03], null, [0, 0, -0.35]));
  g.add(mesh(husk, M.leafLight, [-0.02, 0.0, 0.03], null, [0, 0, 0.35]));
  g.rotation.z = 0.3;
  add("corn", g);

  g = new THREE.Group(); // banana
  g.add(mesh(new THREE.TorusGeometry(0.15, 0.042, 12, 28, Math.PI * 0.75), mat(0xf8d84a, { roughness: 0.45 }), [0, 0.2, 0], null, [0, 0, Math.PI * 1.12]));
  add("banana", g);

  g = new THREE.Group(); // cesta
  g.add(mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.15, 20), M.strawDark, [0, 0.07, 0]));
  g.add(mesh(new THREE.TorusGeometry(0.14, 0.016, 8, 24, Math.PI), M.strawDark, [0, 0.14, 0]));
  [[0xe5483b, -0.06], [0xf59e0b, 0.05], [0x6cc94f, 0]].forEach(([c, x], i) =>
    g.add(mesh(new THREE.SphereGeometry(0.055, 14, 10), mat(c, { roughness: 0.35 }), [x, 0.16, i === 2 ? -0.05 : 0.03])));
  add("basket", g);

  g = new THREE.Group(); // livro
  g.add(mesh(new RoundedBoxGeometry(0.3, 0.22, 0.06, 2, 0.015), mat(0x2f7d4a), [-0.1, 0.1, 0.02]));
  g.add(mesh(new THREE.BoxGeometry(0.28, 0.2, 0.045), mat(0xfff8e6), [-0.1, 0.1, 0.03]));
  add("book", g);

  g = new THREE.Group(); // lupa
  g.add(mesh(new THREE.TorusGeometry(0.09, 0.018, 10, 24), M.gold, [0, 0.2, 0]));
  g.add(mesh(new THREE.CircleGeometry(0.088, 24), mat(0xbfe8ff, { transparent: true, opacity: 0.35, roughness: 0.05 }), [0, 0.2, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.16), M.leatherDark, [0, 0.03, 0]));
  add("magnifier", g);

  return props;
}

function buildSapling(M, world) {
  const g = group(world, [0.62, 0, 0.5]);
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.14, 20), mat(0xc8643b), [0, 0.07, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.02, 20), mat(0x4a2e1a), [0, 0.13, 0]));
  g.add(mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.14), M.leaf, [0, 0.2, 0]));
  const lg = leafGeometry(0.14);
  g.add(mesh(lg, M.leaf, [0, 0.26, 0], null, [0, 0, -0.8]));
  g.add(mesh(lg, M.leafLight, [0, 0.26, 0], null, [0, 0, 0.8]));
  g.visible = false;
  return g;
}

export function buildRaizinho() {
  const M = {
    skin: mat(0x7fd35b, { roughness: 0.45 }),
    denim: mat(0x3d6fb6, { roughness: 0.85 }),
    denimDark: mat(0x2f5a96, { roughness: 0.85 }),
    straw: mat(0xe8c46c, { roughness: 0.9 }),
    strawDark: mat(0xc9a14d, { roughness: 0.9 }),
    band: mat(0xb44a32),
    leather: mat(0x9a5b2c, { roughness: 0.7 }),
    leatherDark: mat(0x6e3f1d, { roughness: 0.7 }),
    shoe: mat(0x6b3e1f, { roughness: 0.6 }),
    white: mat(0xffffff, { roughness: 0.15 }),
    iris: mat(0x2b4a22, { roughness: 0.2 }),
    pupil: mat(0x0d140c, { roughness: 0.1 }),
    mouth: mat(0x4a1717, { roughness: 0.6 }),
    tongue: mat(0xff7a7a),
    cheek: mat(0xff9a8b, { transparent: true, opacity: 0.55 }),
    brow: mat(0x2e5e22),
    leaf: mat(0x43a63c, { roughness: 0.5, side: THREE.DoubleSide }),
    leafLight: mat(0x6cc94f, { roughness: 0.5, side: THREE.DoubleSide }),
    gold: mat(0xf2b632, { metalness: 0.7, roughness: 0.3, side: THREE.DoubleSide }),
    button: mat(0xf0c24a, { metalness: 0.6, roughness: 0.35 }),
    scarf: mat(0xd9483b),
  };

  const world = new THREE.Group();
  const root = group(world);
  const squash = group(root);
  const hips = group(squash, [0, 0.75, 0]);

  // Pernas
  const legGeo = new THREE.CapsuleGeometry(0.11, 0.3, 6, 14);
  const shoeGeo = new THREE.SphereGeometry(0.15, 20, 14);
  const mkLeg = (x) => {
    const g = group(hips, [x, 0.02, 0]);
    g.add(mesh(legGeo, M.denim, [0, -0.32, 0]));
    g.add(mesh(shoeGeo, M.shoe, [0, -0.64, 0.06], [1, 0.62, 1.35]));
    return g;
  };
  const legL = mkLeg(-0.19);
  const legR = mkLeg(0.19);

  // Tronco + jardineira
  const torso = group(hips);
  torso.add(mesh(new THREE.SphereGeometry(0.44, 36, 28), M.skin, [0, 0.32, 0], [1, 1.08, 0.94]));
  torso.add(mesh(new THREE.SphereGeometry(0.455, 36, 20, 0, Math.PI * 2, Math.PI * 0.48, Math.PI * 0.52), M.denim, [0, 0.32, 0], [1, 1.08, 0.94]));
  torso.add(mesh(new RoundedBoxGeometry(0.4, 0.3, 0.07, 3, 0.03), M.denim, [0, 0.47, 0.39], null, [-0.22, 0, 0]));
  torso.add(mesh(new RoundedBoxGeometry(0.16, 0.1, 0.02, 2, 0.008), M.denimDark, [0, 0.45, 0.43], null, [-0.22, 0, 0]));
  [-0.15, 0.15].forEach((x) => {
    torso.add(mesh(new THREE.SphereGeometry(0.03, 10, 8), M.button, [x, 0.6, 0.37]));
    torso.add(mesh(new THREE.BoxGeometry(0.07, 0.4, 0.03), M.denim, [x, 0.72, 0.25], null, [-1.1, 0, 0]));
  });

  // Mochila
  torso.add(mesh(new RoundedBoxGeometry(0.5, 0.52, 0.26, 4, 0.08), M.leather, [0, 0.38, -0.42]));
  torso.add(mesh(new RoundedBoxGeometry(0.52, 0.16, 0.28, 3, 0.06), M.leatherDark, [0, 0.6, -0.43]));
  torso.add(mesh(new RoundedBoxGeometry(0.3, 0.18, 0.06, 2, 0.02), M.leatherDark, [0, 0.28, -0.56]));
  torso.add(mesh(new THREE.BoxGeometry(0.06, 0.05, 0.02), M.button, [0, 0.55, -0.58]));

  // Cachecol (Raiz Forte+) e medalha (Guardião)
  const scarf = group(torso, [0, 0.74, 0]);
  scarf.add(mesh(new THREE.TorusGeometry(0.29, 0.07, 12, 32), M.scarf, [0, 0, 0], null, [Math.PI / 2, 0, 0]));
  scarf.add(mesh(new RoundedBoxGeometry(0.1, 0.22, 0.05, 2, 0.02), M.scarf, [-0.14, -0.1, 0.3], null, [-0.3, 0, 0.15]));
  const medal = group(torso, [0, 0.36, 0.45]);
  medal.add(mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.025, 24), M.gold, [0, 0, 0], null, [Math.PI / 2 - 0.22, 0, 0]));

  // Braços
  const armGeo = new THREE.CapsuleGeometry(0.085, 0.26, 6, 12);
  const handGeo = new THREE.SphereGeometry(0.105, 18, 14);
  const mkArm = (x) => {
    const g = group(torso, [x, 0.56, 0]);
    g.add(mesh(armGeo, M.skin, [0, -0.2, 0]));
    const hand = group(g, [0, -0.42, 0]);
    hand.add(mesh(handGeo, M.skin));
    return { g, hand };
  };
  const L = mkArm(-0.4);
  const R = mkArm(0.4);
  const thumb = mesh(new THREE.CapsuleGeometry(0.035, 0.07, 4, 8), M.skin, [0, 0, 0.1], null, [Math.PI / 2, 0, 0]);
  R.hand.add(thumb);
  const propHolder = group(R.hand);
  propHolder.rotation.order = "ZYX";

  // Cabeça
  const head = group(torso, [0, 0.72, 0]);
  head.add(mesh(new THREE.SphereGeometry(0.5, 40, 32), M.skin, [0, 0.42, 0], [1.06, 0.95, 1]));
  const eyeWhite = new THREE.SphereGeometry(0.15, 28, 20);
  const irisGeo = new THREE.SphereGeometry(0.088, 24, 16);
  const pupilGeo = new THREE.SphereGeometry(0.048, 16, 12);
  const hiGeo = new THREE.SphereGeometry(0.026, 10, 8);
  const mkEye = (x) => {
    const e = group(head, [x, 0.47, 0.42]);
    e.rotation.y = x * 1.2;
    e.add(mesh(eyeWhite, M.white, [0, 0, 0], [1, 1.08, 0.55]));
    const iris = group(e, [0, 0, 0.062]);
    iris.add(mesh(irisGeo, M.iris, [0, 0, 0], [1, 1, 0.35]));
    iris.add(mesh(pupilGeo, M.pupil, [0, 0, 0.022], [1, 1, 0.35]));
    iris.add(mesh(hiGeo, M.white, [0.03, 0.035, 0.035]));
    return { e, iris };
  };
  const eL = mkEye(-0.19);
  const eR = mkEye(0.19);
  const browGeo = new THREE.CapsuleGeometry(0.022, 0.1, 4, 8);
  const mkBrow = (x) => {
    const g = group(head, [x, 0.68, 0.39]);
    g.rotation.x = -0.4;
    g.add(mesh(browGeo, M.brow, [0, 0, 0], null, [0, 0, Math.PI / 2]));
    return g;
  };
  const browL = mkBrow(-0.19);
  const browR = mkBrow(0.19);
  [-1, 1].forEach((s) => head.add(mesh(new THREE.SphereGeometry(0.075, 14, 10), M.cheek, [s * 0.32, 0.33, 0.37], [1, 0.6, 0.35], [0, s * 0.6, 0])));

  const mouthG = group(head, [0, 0.25, 0.465]);
  mouthG.rotation.x = 0.37;
  const arc = new THREE.TorusGeometry(0.1, 0.022, 10, 28, Math.PI);
  const open = new THREE.Group();
  open.add(mesh(new THREE.SphereGeometry(0.085, 20, 14), M.mouth, [0, 0, 0], [1, 0.8, 0.35]));
  open.add(mesh(new THREE.SphereGeometry(0.045, 12, 10), M.tongue, [0, -0.03, 0.012], [1, 0.6, 0.4]));
  const mouth = {
    smile: mesh(arc, M.mouth, [0, 0.03, 0], null, [0, 0, Math.PI]),
    frown: mesh(arc, M.mouth, [0, -0.04, 0]),
    open,
    flat: mesh(new THREE.CapsuleGeometry(0.02, 0.1, 4, 8), M.mouth, [0, 0, 0], null, [0, 0, Math.PI / 2]),
  };
  Object.values(mouth).forEach((m) => mouthG.add(m));

  // Chapéu de palha
  const hat = group(head, [0, 0.8, -0.02]);
  hat.rotation.set(-0.12, 0, 0.07);
  hat.add(mesh(new THREE.CylinderGeometry(0.68, 0.7, 0.035, 48), M.straw));
  hat.add(mesh(new THREE.TorusGeometry(0.69, 0.03, 8, 48), M.strawDark, [0, 0.01, 0], null, [Math.PI / 2, 0, 0]));
  hat.add(mesh(new THREE.CylinderGeometry(0.3, 0.37, 0.28, 36), M.straw, [0, 0.15, 0]));
  const band = mesh(new THREE.CylinderGeometry(0.373, 0.373, 0.075, 36), M.band, [0, 0.05, 0]);
  hat.add(band);
  const hatLeaf = mesh(leafGeometry(0.2), M.leafLight, [0.3, 0.06, 0.22], null, [0, 0.6, -0.9]);
  hat.add(hatLeaf);

  // Folhas da cabeça
  const leaves = group(head, [0, 1.0, -0.02]);
  leaves.add(mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.24, 10), M.leaf, [0, 0.1, 0]));
  const leafGeo = leafGeometry(0.36);
  const leafPivots = [];
  for (let i = 0; i < 4; i++) {
    const yaw = group(leaves, [0, 0.2, 0]);
    const tilt = group(yaw);
    const m = mesh(leafGeo, M.leaf);
    tilt.add(m);
    leafPivots.push({ yaw, tilt, mesh: m });
  }

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.75, 32),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.005;
  world.add(shadow);

  const parts = {
    world, root, squash, hips, torso, head, legL, legR,
    armL: L.g, armR: R.g, handR: R.hand, thumb, propHolder,
    eyes: [eL.e, eR.e], irises: [eL.iris, eR.iris], browL, browR, mouth,
    hat, band, hatLeaf, hatBase: { p: hat.position.clone(), r: hat.rotation.clone() },
    leaves, leafPivots, scarf, medal, shadow,
    props: buildProps(M, propHolder),
    sapling: buildSapling(M, world),
  };
  return { world, parts, materials: M };
}

const LEAF_SETUPS = {
  1: [[0, 0.18]],
  2: [[0, 0.8], [Math.PI, 0.8]],
  3: [[0, 0.85], [Math.PI, 0.85], [Math.PI / 2, 0.25]],
  4: [[0.25, 0.85], [Math.PI + 0.25, 0.85], [Math.PI / 2, 0.55], [-Math.PI / 2, 0.55]],
};

// Evolução visual: Semente → Broto → Agricultor → Raiz Forte → Guardião
export function applyLevel(P, M, level) {
  const L = Math.max(0, Math.min(4, level | 0));
  P.world.scale.setScalar([0.86, 0.93, 1, 1.04, 1.08][L]);
  const n = [1, 2, 2, 3, 4][L];
  const size = [0.6, 0.8, 1, 1.08, 1.15][L];
  P.leafPivots.forEach((lp, i) => {
    const s = LEAF_SETUPS[n][i];
    lp.yaw.visible = !!s;
    if (!s) return;
    lp.yaw.rotation.y = s[0];
    lp.tilt.userData.baseZ = -s[1];
    lp.tilt.scale.setScalar(size * (i >= 2 ? 0.8 : 1));
    lp.mesh.material = L >= 4 && i === 2 ? M.gold : i % 2 ? M.leafLight : M.leaf;
  });
  P.hatLeaf.visible = L >= 2;
  P.scarf.visible = L >= 3;
  P.medal.visible = L >= 4;
  P.band.material = L >= 4 ? M.gold : M.band;
}

export function resetPose(P) {
  P.root.position.set(0, 0, 0);
  P.root.rotation.set(0, 0, 0);
  P.squash.scale.set(1, 1, 1);
  P.hips.position.set(0, 0.75, 0);
  P.hips.rotation.set(0, 0, 0);
  P.torso.rotation.set(0, 0, 0);
  P.head.rotation.set(0, 0, 0);
  P.armL.rotation.set(0, 0, -0.2);
  P.armR.rotation.set(0, 0, 0.2);
  P.legL.rotation.set(0, 0, 0);
  P.legR.rotation.set(0, 0, 0);
  P.hat.position.copy(P.hatBase.p);
  P.hat.rotation.copy(P.hatBase.r);
  P.thumb.visible = false;
  P.sapling.visible = false;
}