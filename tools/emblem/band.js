// Paint the emblem's rim: a solid band over the outer fraction of the disc, with an
// anti-aliased inner edge. The outer edge keeps the render's existing alpha mask.
// Usage: node band.js <config.json> <in.png> <out.png>   (uses the config's "rim")
const fs = require('fs');
const { PNG } = require('pngjs');

const [cfgPath, inp, out] = process.argv.slice(2);
const { fraction, color: hex } = JSON.parse(fs.readFileSync(cfgPath, 'utf8')).rim;
const png = PNG.sync.read(fs.readFileSync(inp));
const { width: W, height: H, data } = png;
const col = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const R = W / 2, inner = R * (1 - fraction);

for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const d = Math.hypot(x + .5 - W / 2, y + .5 - H / 2);
  const cov = Math.min(1, Math.max(0, d - inner + .5)); // share of the pixel inside the band
  if (cov <= 0) continue;
  const i = (y * W + x) * 4;
  for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] * (1 - cov) + col[c] * cov);
}
fs.writeFileSync(out, PNG.sync.write(png));
console.log(`band ${(R - inner).toFixed(1)} px wide (radius ${inner.toFixed(1)}-${R}) -> ${out}`);
