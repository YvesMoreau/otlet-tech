// Tiled high-resolution render of a Hyperbolic Illusion tiling, using the tool's own
// shader (shader.glsl) and geometry (math.js), copied unchanged into hyperbolic-illusion/,
// in headless Chromium.
// Usage: node render.js <config.json> <out.png>
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { PNG } = require('pngjs');

const [cfgPath, out] = process.argv.slice(2);
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const size = cfg.size, tile = cfg.tile;
const tool = path.join(__dirname, 'hyperbolic-illusion');

const mathSrc = fs.readFileSync(`${tool}/math.js`, 'utf8')
  .replace(/^export\s*\{[^}]*\};?\s*$/m, '')
  + '\nwindow.HI = { Complex, generateTilingParams };';
const shaderSrc = '#version 300 es\nprecision highp float;\nprecision highp int;\nuniform vec2 tileOffset;\n'
  + fs.readFileSync(`${tool}/shader.glsl`, 'utf8')
      .replace('vec2 pt = gl_FragCoord.xy;', 'vec2 pt = gl_FragCoord.xy + tileOffset;');

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage();
  page.on('console', m => console.log('[page]', m.text()));
  await page.setContent(`<canvas id="c" width="${tile}" height="${tile}"></canvas>`);
  await page.addScriptTag({ content: mathSrc });
  await page.evaluate(({ shaderSrc, cfg, cols, size, tile }) => {
    const gl = document.getElementById('c').getContext('webgl2', { preserveDrawingBuffer: true, antialias: false });
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, shaderSrc));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const params = { ...cfg.params, ...window.HI.generateTilingParams(cfg.params.pValue, cfg.params.qValue, cfg.params.eThickness) };
    const set = (name, v) => {
      const u = gl.getUniformLocation(prog, name); if (u === null) return;
      if (typeof v === 'boolean') gl.uniform1i(u, v ? 1 : 0);
      else if (typeof v === 'number') (['modelIdx', 'nIterations', 'nSamples'].includes(name) ? gl.uniform1i(u, v) : gl.uniform1f(u, v));
      else if (Array.isArray(v)) gl.uniform3f(u, ...v);
      else if (v && 'x' in v) gl.uniform2f(u, v.x, v.y);
    };
    for (const [k, v] of Object.entries(params)) set(k, v);
    set('invSamples', 1 / params.nSamples);
    set('mousePos', cfg.center || { x: 0, y: 0 });
    set('time', 0); set('resolution', { x: size, y: size }); set('scale', size * cfg.zoom);
    for (const [k, v] of Object.entries(cols)) set(k, v);
    window.drawTile = (ox, oy) => {
      set('tileOffset', { x: ox, y: oy });
      gl.viewport(0, 0, tile, tile); gl.drawArrays(gl.TRIANGLES, 0, 3);
      const px = new Uint8Array(tile * tile * 4); gl.readPixels(0, 0, tile, tile, gl.RGBA, gl.UNSIGNED_BYTE, px);
      return Array.from(px);
    };
  }, { shaderSrc, cfg, cols: Object.fromEntries(Object.entries(cfg.colors).map(([k, v]) => [k, hex(v)])), size, tile });

  const png = new PNG({ width: size, height: size });
  const n = Math.ceil(size / tile);
  for (let ty = 0; ty < n; ty++) for (let tx = 0; tx < n; tx++) {
    const t0 = Date.now();
    const px = await page.evaluate(([x, y]) => window.drawTile(x, y), [tx * tile, ty * tile]);
    for (let y = 0; y < tile; y++) {            // GL rows run bottom-up
      const gy = size - 1 - (ty * tile + y); if (gy < 0) continue;
      for (let x = 0; x < tile; x++) {
        const gx = tx * tile + x; if (gx >= size) continue;
        const s = (y * tile + x) * 4, d = (gy * size + gx) * 4;
        png.data[d] = px[s]; png.data[d + 1] = px[s + 1]; png.data[d + 2] = px[s + 2];
        // Disc mask: anti-aliased coverage of the unit circle, transparent outside
        const R = size * cfg.zoom / 2, dist = Math.hypot(gx + .5 - size / 2, gy + .5 - size / 2);
        png.data[d + 3] = Math.round(255 * Math.min(1, Math.max(0, R - dist + .5)));
      }
    }
    console.log(`tile ${ty * n + tx + 1}/${n * n} ${Date.now() - t0} ms`);
  }
  await browser.close();
  fs.writeFileSync(out, PNG.sync.write(png));
  console.log('wrote', out);
})().catch(e => { console.error(e); process.exit(1); });
