import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadJSON(path) {
  return JSON.parse(readFileSync(resolve(root, path), 'utf-8'));
}

const rules = loadJSON('src/data/rules.json');
const { vocabularies } = loadJSON('src/data/vocab.json');
const { levels } = loadJSON('src/data/levels.json');
const { modules } = loadJSON('src/data/modules.json');

let errors = 0;

// 1. all id_hukum in vocab must exist in rules
for (const v of vocabularies) {
  if (!rules[v.id_hukum]) {
    console.error(`[ERROR] vocab "${v.id}" has id_hukum "${v.id_hukum}" which does not exist in rules.json`);
    errors++;
  }
}

// 2. bagian_jebakan positions must be within bounds of kata length
for (const v of vocabularies) {
  const len = v.kata.length;
  const { posisi_mulai, posisi_akhir } = v.bagian_jebakan;
  if (posisi_mulai < 0 || posisi_mulai >= len) {
    console.error(`[ERROR] vocab "${v.id}" bagian_jebakan.posisi_mulai (${posisi_mulai}) out of bounds for kata "${v.kata}" (length ${len})`);
    errors++;
  }
  if (posisi_akhir < 0 || posisi_akhir >= len) {
    console.error(`[ERROR] vocab "${v.id}" bagian_jebakan.posisi_akhir (${posisi_akhir}) out of bounds for kata "${v.kata}" (length ${len})`);
    errors++;
  }
  if (posisi_mulai > posisi_akhir) {
    console.error(`[ERROR] vocab "${v.id}" bagian_jebakan.posisi_mulai (${posisi_mulai}) > posisi_akhir (${posisi_akhir})`);
    errors++;
  }
}

// 3. all vocab IDs must be unique
const seen = new Set();
for (const v of vocabularies) {
  if (seen.has(v.id)) {
    console.error(`[ERROR] duplicate vocab id "${v.id}"`);
    errors++;
  }
  seen.add(v.id);
}

// 4. all level wordIds must reference existing vocab IDs
for (const l of levels) {
  for (const wid of l.wordIds) {
    if (!seen.has(wid)) {
      console.error(`[ERROR] level "${l.id}" references vocab id "${wid}" which does not exist in vocab.json`);
      errors++;
    }
  }
}

// 5. all module levelIds must reference existing level IDs
const levelIds = new Set(levels.map(l => l.id));
for (const m of modules) {
  for (const lid of m.levelIds) {
    if (!levelIds.has(lid)) {
      console.error(`[ERROR] module "${m.id}" references level id "${lid}" which does not exist in levels.json`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n[FAIL] ${errors} validation error(s) found`);
  process.exit(1);
} else {
  console.log('[PASS] All data validation checks passed');
}
