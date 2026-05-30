# TODO: Pengembangan Materi

## Cara pakai
1. Pilih 1-2 kategori dari daftar bawah per sesi
2. Tambah aturan ke `src/data/rules.json`
3. Tambah kosakata ke `src/data/vocab.json` (ikuti skema dari `prompt.md`)
4. Tambah level ke `src/data/levels.json` (progresif: level awal 2-3 kata, akhir 5-6 kata)
5. Jalankan `npm run build` untuk verifikasi

## Daftar prioritas

### ⭐ Prioritas Tinggi

| Kategori | Pola Huruf | Contoh | Status |
|----------|-----------|--------|--------|
| Silent H lanjutan | `gh` di akhir | high, night, light, right, eight | ❌ |
| Suffix -ed | -ed → /t/, /d/, /id/ | walked, played, wanted | ❌ |
| Homofon | their/there/they're | their buku, there, they're happy | ❌ |
| Vokal AI/AY | ai/ay → /ei/ | rain, train, play, day, say | ❌ |
| Digraph SH | sh → /sy/ | ship, shop, fish, shell, brush | ❌ |
| Digraph CH | ch → /c/ | chair, chicken, lunch, catch | ❌ |
| Digraph TH | th → /th/ atau /dh/ | think, three, this, that, mother | ❌ |

### ⭐ Prioritas Sedang

| Kategori | Pola Huruf | Contoh | Status |
|----------|-----------|--------|--------|
| Vokal EE | ee → /ii/ | tree, green, sleep, week, feet | ❌ |
| Silent E review | berbagai | tambah kata: make, cake, name, time, home | ❌ |
| Vokal IE/EI | ie/ei | field, believe, receive, ceiling | ❌ |
| Hard G review | g → /g/ | go, game, garden, big, frog | ❌ |
| Vokal IR/ER/UR | ir/er/ur → /er/ | bird, girl, turn, teacher, her | ❌ |
| Digraph PH | ph → /f/ | phone, photo, elephant, dolphin | ❌ |

### ⭐ Prioritas Rendah

| Kategori | Pola Huruf | Contoh | Status |
|----------|-----------|--------|--------|
| Vokal AR/OR | ar/or → /ar/, /or/ | car, star, farm, for, short | ❌ |
| Diftong OI/OY | oi/oy | oil, boil, boy, toy, enjoy | ❌ |
| Silent C | sc, ck | scene, science, scissors, back | ❌ |
| Vokal AW/AU | aw/au | saw, claw, because, autumn | ❌ |
| Silent U | gu-, -gue | guess, guest, guitar, tongue | ❌ |
| Homofon lanjutan | to/too/two, write/right | eat too much, two books, turn right | ❌ |

## Target pengembangan

- **Sesi 1 (sekarang)**: +18 aturan baru, +55 kosakata, 16 level ✅
- **Sesi 2**: +2 aturan (Silent H lanjutan, Suffix -ed), +20 kosakata
- **Sesi 3**: +3 aturan (Homofon, AI/AY, SH), +25 kosakata
- **Sesi 4**: +3 aturan (CH, TH, EE), +25 kosakata
- **Setelahnya**: ambil dari prioritas sedang/rendah sesuai kebutuhan

## Aturan data

- `cara_baca_lokal`: gunakan pelafalan Indonesia (`/tho/`, `/naif/`, bukan IPA)
- `bagian_jebakan.posisi_mulai`/`posisi_akhir`: hitung dari 0, spasi tidak dihitung
- `kata`: huruf kecil semua
- Progresi level: level 1-2 = 1-2 kata, level 3-6 = 3-4 kata, level 7+ = 4-6 kata
