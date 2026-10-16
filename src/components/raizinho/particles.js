import * as THREE from "three";
import { leafGeometry } from "./model";

// Folhinhas e brilhos que voam em comemorações
const LEAF_COLORS = [0x43a63c, 0x6cc94f, 0x8fd65a, 0x2f8f3a];

export function createParticles(scene) {
  const leafGeo = leafGeometry(0.16);
  const sparkGeo = new THREE.OctahedronGeometry(0.055);
  const pool = Array.from({ length: 48 }, () => {
    const m = new THREE.Mesh(leafGeo, new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, transparent: true, roughness: 0.5 }));
    m.visible = false;
    scene.add(m);
    return { m, life: 0, vel: new THREE.Vector3(), spin: new THREE.Vector3(), kind: "leaf" };
  });

  function burst(kind, origin, n) {
    for (let i = 0; i < n; i++) {
      const p = pool.find((q) => q.life <= 0);
      if (!p) return;
      const spark = kind !== "leaf";
      const gentle = kind === "spark";
      p.kind = kind;
      p.m.geometry = spark ? sparkGeo : leafGeo;
      p.m.material.color.setHex(spark ? (Math.random() < 0.5 ? 0xffd34d : 0xfff1a8) : LEAF_COLORS[i % 4]);
      p.m.material.emissive.setHex(spark ? 0x6b4a00 : 0x000000);
      p.m.position.copy(origin);
      p.m.position.x += (Math.random() - 0.5) * (gentle ? 1.1 : 0.3);
      p.m.position.y += (Math.random() - 0.5) * (gentle ? 1.2 : 0.2);
      p.m.position.z += (Math.random() - 0.5) * 0.3;
      if (gentle) p.vel.set((Math.random() - 0.5) * 0.2, 0.5 + Math.random() * 0.4, 0);
      else p.vel.set((Math.random() - 0.5) * 3.2, 1.6 + Math.random() * 1.8, 0.4 + Math.random());
      p.spin.set(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3);
      p.life = gentle ? 1.2 : 1.4 + Math.random() * 0.7;
      p.m.scale.setScalar(spark && !gentle ? 1.2 : 1);
      p.m.visible = true;
    }
  }

  function update(dt) {
    for (const p of pool) {
      if (p.life <= 0) continue;
      p.life -= dt;
      if (p.kind === "leaf") {
        p.vel.y -= 3.2 * dt;
        p.vel.multiplyScalar(1 - 1.4 * dt);
        p.vel.x += Math.sin(p.life * 7) * 0.05;
      } else if (p.kind === "gold") {
        p.vel.y -= 4 * dt;
        p.vel.multiplyScalar(1 - 0.8 * dt);
      }
      p.m.position.addScaledVector(p.vel, dt);
      p.m.rotation.x += p.spin.x * dt;
      p.m.rotation.y += p.spin.y * dt;
      p.m.rotation.z += p.spin.z * dt;
      p.m.material.opacity = Math.min(1, p.life / 0.5);
      if (p.life <= 0) p.m.visible = false;
    }
  }

  return { burst, update };
}