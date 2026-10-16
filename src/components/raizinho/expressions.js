// Expressões faciais: olhos, sobrancelhas e boca
const EXPR = {
  neutral: { eye: [1, 1], mouth: "smile", m: [0.85, 0.85] },
  happy: { eye: [1, 0.8], mouth: "smile", m: [1.15, 1.15], brow: [0.02, 0, 0, 0] },
  laugh: { eye: [1, 0.45], mouth: "open", m: [1.35, 1], brow: [0.04, 0, 0.04, 0] },
  surprised: { eye: [1.22, 1.22], mouth: "open", m: [0.75, 1.15], brow: [0.07, 0, 0.07, 0] },
  thinking: { eye: [1, 0.9], mouth: "flat", m: [0.7, 1], mx: 0.06, mr: 0.2, brow: [0.05, -0.1, -0.02, -0.1] },
  confused: { eye: [1, 0.95], mouth: "flat", m: [0.8, 1], mr: 0.3, brow: [0.06, 0.18, -0.02, 0.18] },
  sad: { eye: [1, 0.85], mouth: "frown", m: [0.9, 0.9], brow: [0.02, 0.3, 0.02, -0.3] },
  sleepy: { eye: [1, 0.08], mouth: "open", m: [0.4, 0.4] },
  yawn: { eye: [1, 0.25], mouth: "open", m: [0.9, 1.5], brow: [0.03, 0, 0.03, 0] },
};

export function applyExpression(P, name, blink, wink) {
  const e = EXPR[name] || EXPR.neutral;
  const close = 1 - 0.92 * blink;
  P.eyes.forEach((eye, i) => {
    const winked = (wink === "R" && i === 1) || (wink === "L" && i === 0);
    eye.scale.set(e.eye[0], winked ? 0.1 : e.eye[1] * close, 1);
  });
  const b = e.brow || [0, 0, 0, 0];
  P.browL.position.y = 0.68 + b[0];
  P.browL.rotation.z = b[1];
  P.browR.position.y = 0.68 + b[2];
  P.browR.rotation.z = b[3];
  for (const k in P.mouth) {
    const m = P.mouth[k];
    m.visible = k === e.mouth;
    if (!m.visible) continue;
    m.scale.set(e.m[0], e.m[1], 1);
    m.position.x = e.mx || 0;
  }
  P.mouth[e.mouth].parent.rotation.z = e.mr || 0;
}