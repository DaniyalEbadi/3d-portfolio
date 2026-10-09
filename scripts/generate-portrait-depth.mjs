// Generates a portrait depth map (grayscale PNG) used by the hero 2.5D relief.
// Pure heuristic: an elliptical subject prior (face + torso) plus luminance
// micro-detail, heavily smoothed. Run: node scripts/generate-portrait-depth.mjs
import sharp from "sharp";

const SRC = "public/assets/portrait.webp";
const OUT = "public/assets/portrait-depth.png";
const W = 512;
const H = 640;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// Quartic falloff -> smooth 1 at centre, 0 at/after the radius.
const blob = (u, v, cx, cy, rx, ry) => {
  const dx = (u - cx) / rx;
  const dy = (v - cy) / ry;
  const q = Math.hypot(dx, dy);
  if (q >= 1) return 0;
  const t = 1 - q * q;
  return t * t;
};

const { data } = await sharp(SRC)
  .grayscale()
  .resize(W, H, { fit: "fill" })
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then((r) => ({ data: r.data }));

const depth = new Float32Array(W * H);

for (let y = 0; y < H; y++) {
  const v = y / (H - 1);
  for (let x = 0; x < W; x++) {
    const u = x / (W - 1);
    const lum = data[y * W + x] / 255;

    // --- Subject prior (head + shoulders), tuned to this three-quarter portrait.
    const cranium = blob(u, v, 0.43, 0.21, 0.22, 0.18);
    const face = blob(u, v, 0.42, 0.35, 0.205, 0.27);
    const jaw = blob(u, v, 0.41, 0.45, 0.165, 0.15);
    const neck = blob(u, v, 0.45, 0.56, 0.1, 0.11);
    // Broad, connected torso so the shoulders read as one mass, not two orbs.
    const torso = blob(u, v, 0.46, 1.05, 0.66, 0.55);
    const shoulderL = blob(u, v, 0.16, 0.86, 0.24, 0.26) * 0.6;
    const shoulderR = blob(u, v, 0.72, 0.88, 0.26, 0.28) * 0.6;

    let subject = cranium;
    subject = Math.max(subject, face);
    subject = Math.max(subject, jaw);
    subject = Math.max(subject, neck);
    subject = Math.max(subject, torso);
    subject = Math.max(subject, shoulderL);
    subject = Math.max(subject, shoulderR);

    // Face reads further forward than the torso.
    const nearness = 0.66 + 0.34 * blob(u, v, 0.42, 0.34, 0.26, 0.3);
    let d = subject * nearness;

    // Luminance micro-detail inside the subject (highlights forward, recesses back).
    d += subject * (lum - 0.5) * 0.18;

    // Background: only a faint emboss so the white letters sit as a relief
    // plane far behind the subject instead of glaring.
    const bg = 1 - subject;
    d += bg * clamp((lum - 0.6) / 0.4) * 0.07;

    depth[y * W + x] = clamp(d);
  }
}

// Normalize + blur for smooth normals.
let lo = 1;
let hi = 0;
for (let i = 0; i < depth.length; i++) {
  if (depth[i] < lo) lo = depth[i];
  if (depth[i] > hi) hi = depth[i];
}
const span = Math.max(hi - lo, 1e-4);
const gray = Buffer.alloc(W * H);
for (let i = 0; i < depth.length; i++) {
  gray[i] = Math.round(((depth[i] - lo) / span) * 255);
}

await sharp(gray, { raw: { width: W, height: H, channels: 1 } })
  .blur(5)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log("wrote", OUT, W + "x" + H);
