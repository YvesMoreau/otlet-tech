# Emblem master

Regenerates `assets/Otlet_emblem_high-res.png` (8192 × 8192 px, transparent outside the
disc). The geometry and settings are described in the house style, section 5.1.

| File | Role |
|---|---|
| `emblem.json` | All settings: tiling, edges, thickness, colors, size, rim |
| `render.js` | Renders the tiling in tiles in headless Chromium and stitches them |
| `band.js` | Paints the `purple` rim over the outer 1.82% of the radius |
| `hyperbolic-illusion/` | `shader.glsl` and `math.js`, unchanged, from Hyperbolic Illusion (github.com/tdung-do/Hyperbolic-Illusion, commit `245276e`), with its MIT license |

## Steps (container terminal)

```
cd tools/emblem
npm ci
npx playwright install --with-deps chromium
node render.js emblem.json /tmp/emblem-no-rim.png
node band.js emblem.json /tmp/emblem-no-rim.png ../../assets/Otlet_emblem_high-res.png
```

The render takes about 20 minutes on the software renderer and peaks near 2 GB of memory.
For a quick check, copy `emblem.json` with `"size":1024,"tile":512`.
