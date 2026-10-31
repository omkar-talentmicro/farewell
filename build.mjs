// Builds dashboard.html: one fully offline file (compiled Tailwind, Lucide sprite and photos inlined).
// Usage (from this folder):  node build.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const tpl = readFileSync(join(here, 'src/template.html'), 'utf8');

// 1. compile + minify Tailwind
const tmp = join(tmpdir(), 'farewell-build'); mkdirSync(tmp, { recursive: true });
const cssOut = join(tmp, 'out.css');
const r = spawnSync('npx', ['tailwindcss', '-c', join(here, 'tailwind.config.cjs'), '-i', join(here, 'src/input.css'), '-o', cssOut, '--minify'],
  { cwd: here, shell: true, stdio: 'inherit' });
if (r.status !== 0) { console.error('Tailwind build failed'); process.exit(1); }
const css = readFileSync(cssOut, 'utf8');
rmSync(tmp, { recursive: true, force: true });

// 2. photos: photos/<slug>.(jpg|jpeg|png|webp), slug = lowercase name with dashes (diya-patel.jpg); your own is me.jpg
const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
const photos = {};
const dir = join(here, 'photos');
if (existsSync(dir)) for (const f of readdirSync(dir)) {
  const ext = extname(f).toLowerCase(); if (!mime[ext]) continue;
  const buf = readFileSync(join(dir, f));
  if (buf.length > 400 * 1024) console.warn(`! ${f} is ${(buf.length / 1024) | 0} KB - resize to ~400px wide to keep the file small`);
  photos[basename(f, ext).toLowerCase()] = `data:${mime[ext]};base64,${buf.toString('base64')}`;
}

// 3. Lucide icons (icons/*.svg) -> inline sprite, used as <svg class="icon"><use href="#i-heart"/></svg>
const iconDir = join(here, 'icons');
const sprite = readdirSync(iconDir).filter(f => f.endsWith('.svg')).map(f => {
  const inner = readFileSync(join(iconDir, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  return `<symbol id="i-${basename(f, '.svg')}" viewBox="0 0 24 24">${inner}</symbol>`;
}).join('');

const html = tpl
  .replace('/*__CSS__*/', () => css)
  .replace('/*__PHOTOS__*/{}', () => JSON.stringify(photos))
  .replace('<!--__ICONS__-->', () => sprite);
writeFileSync(join(here, 'dashboard.html'), html);
writeFileSync(join(here, 'index.html'), html);          // same page; index.html is what GitHub Pages serves
console.log(`dashboard.html + index.html built: ${(html.length / 1024) | 0} KB, ${Object.keys(photos).length} photo(s)`);
