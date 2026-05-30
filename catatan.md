# Roadmap Pembelajaran & Edukasi Sains Kognitif

Aplikasi **English SpellMaster** tidak hanya diciptakan sebagai alat latihan, tetapi juga dirancang berlandaskan sains kognitif tentang bagaimana otak manusia belajar paling efektif.

Dokumen ini berisi peta jalan (*roadmap*) untuk mengembangkan metode belajar di dalam aplikasi, serta panduan yang bisa dijadikan fitur edukasi bagi orang tua/guru yang mendampingi anak.

---

## Ringkasan Status

| Fitur | Status | Prioritas |
|---|---|---|
| SRS (Spaced Repetition) | ✅ Selesai | — |
| Sistem Level & Modul | ✅ Selesai | — |
| 38 Aturan + 188 Kosakata | ✅ Selesai | — |
| Catatan Opsional per Jawaban | ✅ Selesai | — |
| **Boss Stage (Interleaving)** | ❌ Belum | 🔴 Tinggi |
| **Mode Endless / Survive** | ❌ Belum | 🟡 Sedang |
| **Tip Harian di Loading** | ❌ Belum | 🟢 Rendah |
| **Healthy Limit Pop-Up** | ❌ Belum | 🟢 Rendah |
| **Edukasi Orang Tua (UI)** | ❌ Belum | 🟡 Sedang |

---

## 1. Metode Interleaving (Belajar Berselang-Seling)

**Apa itu Interleaving?**
Secara tradisional, kita belajar menggunakan metode *Block Practice* (AAA - BBB - CCC). Misalnya: hari ini belajar "Hukum EA" saja sampai hafal, besok khusus "Hukum OO".
*Masalahnya:* Otak menjadi pasif. Pengguna bisa menjawab benar karena mereka tahu *semua soal hari ini jawabannya pasti 'EA'*, bukan karena mereka benar-benar paham.

Metode *Interleaving* mencampur aduk materi yang berbeda namun berkaitan (ABC - BCA - CAB).
*Keuntungan:* Otak dipaksa untuk tidak hanya **mengingat jawaban**, tetapi terlebih dahulu **mendiagnosis masalahnya** (Apakah kata ini pakai Hukum EA, OO, atau Silent K?).

### Roadmap Implementasi

#### [Fase 1] Latihan Spesifik ✅ (Saat ini)
Pengguna belajar di dalam level yang terfokus (misal Level Khusus Silent W). Ini penting untuk pengenalan awal (*acquisition*).

#### [Fase 2] Boss Stage 🔴 Prioritas Tinggi
Di setiap akhir module (8 module), buat "Ujian Boss". Level ini mencampur secara acak kata-kata dari semua level dalam module tersebut. Pengguna tidak akan diberi tahu "Hukum Ejaan" apa yang sedang dites sampai mereka salah menjawab.

**Implementasi:**
- File: `src/data/boss_levels.json`
- Struktur: `{ "boss_levels": [{ "id": "boss_mod_magic_e", "moduleId": "mod_magic_e", "wordIds": [...] }] }`
- Logic: acak wordIds dari semua level dalam module, tampilkan tanpa hukum hint
- UI: badge khusus "Boss Stage" dengan ikon 🔴

#### [Fase 3] Mode Endless 🟡 Prioritas Sedang
Mode khusus di mana semua kosakata yang pernah dipelajari dilempar secara acak (Interleaving ekstrem).

**Implementasi:**
- File: `src/pages/EndlessMode.tsx`
- Logic: ambil semua kata dari `progress.completed_levels`, acak, tampilkan tanpa hukum hint
- UI: skor live, nyawa terbatas (3 salah = game over)

---

## 2. Edukasi Orang Tua / Pendidik

Banyak orang tua memiliki miskonsepsi bahwa "belajar keras selama 2 jam non-stop" lebih baik daripada "belajar 15 menit sehari". Aplikasi kita harus bisa mengedukasi mereka.

### Fitur yang Perlu Ditambahkan

#### Tip Harian 🟢 Rendah
Tampilkan kutipan sains kognitif secara acak di halaman beranda atau module page.

**Konteks tip yang bisa ditampilkan:**
- *"Tahukah Bunda? Otak menyerap memori lebih kuat jika anak istirahat setelah 15 menit belajar, dibandingkan belajar 2 jam tanpa henti."*
- *"Kesalahan itu bukan kegagalan. Setiap jawaban salah adalah sinyal bagi otak untuk memperkuat koneksi saraf."*
- *"Anak yang menjelaskan 'mengapa jawabannya begitu' memiliki retensi memori 6x lebih kuat."*

**Implementasi:**
- File: `src/data/tips.json`
- Komponen: `src/components/DailyTip.tsx`
- Trigger: tampil di HomePage, berganti setiap sesi (localStorage `last_tip_date`)

#### Healthy Limit Pop-Up 🟢 Rendah
Jika sesi belajar > 30 menit, munculkan notifikasi.

**Implementasi:**
- Hook: `useSessionTimer` — hitung durasi sejak mount
- File: `src/components/HealthyLimitPopup.tsx`
- Logic: setelah 30 menit, tampilkan pop-up: *"Kamu sudah berlatih sangat keras! Sains membuktikan memori butuh tidur untuk menempel kuat. Kembalilah besok!"*
- Tombol: "Lanjutkan" (tutup pop-up) atau "Istirahat" (redirect ke home)

#### Edukasi Orang Tua 🟡 Sedang
Halaman khusus yang menjelaskan pendekatan pedagogis aplikasi, cocok dibaca orang tua/guru.

**Implementasi:**
- Halaman `/about` (✅ sudah ada)
- Konten: metode "Spelling Law" seperti Tajwid, SRS, Interleaving, tips pendampingan
- Bahasa: Indonesia, gaya ringan dan meyakinkan

---

## 3. Kombinasi Spaced Repetition + Interleaving (Golden Combo)

Aplikasi kita sudah memiliki sistem **Spaced Repetition (SRS)** di mana kata yang salah akan dimunculkan lagi.

**Algoritma SRS saat ini:**
- Salah → interval pendek (2, 4, 8 jam...)
- Benar → interval progresif (48h, 72h, 168h...)
- Maksimal interval: 720 jam (30 hari)

### Target Pengembangan Berikutnya

#### Interleaving Review 🔴 Prioritas Tinggi
Saat kata yang harus di-review (SRS) jatuh tempo, aplikasi harus **menyelipkannya** ke dalam soal pelajaran baru.

**Implementasi:**
- Sudah sebagian jalan: `useGameEngine` sudah menyelipkan `reviewWords` ke level saat ini (fungsi `getDueReviewWords`)
- Perbaikan: pastikan review words tidak hanya dari level yang sama, tapi juga dari module yang sudah selesai
- File: `src/hooks/useGameEngine.ts` — perluas `getDueReviewWords` scope

#### Retrieval Practice Effect
Efek *kaget* dari soal review di tengah materi baru memaksa otak memanggil ulang memori jangka panjang, mencegah lupa permanen.

---

## 4. Catatan Teknis Implementasi

### Variabel Lingkungan
| Variabel | Default | Fungsi |
|---|---|---|
| `VITE_SESSION_LIMIT_MINUTES` | `30` | Batas waktu sesi untuk healthy limit |
| `VITE_SRS_MAX_INTERVAL_HOURS` | `720` | Interval maksimum SRS |

### File yang Terpengaruh

| Fitur | File | Perubahan |
|---|---|---|
| Boss Stage | `src/data/boss_levels.json` | File baru |
| Boss Stage | `src/pages/BossStage.tsx` | File baru |
| Boss Stage | `src/pages/BossStage.module.css` | File baru |
| Boss Stage | `src/hooks/useGameEngine.ts` | Tambah fungsi `startBossStage` |
| Endless Mode | `src/pages/EndlessMode.tsx` | File baru |
| Daily Tip | `src/data/tips.json` | File baru |
| Daily Tip | `src/components/DailyTip.tsx` | File baru |
| Healthy Limit | `src/components/HealthyLimitPopup.tsx` | File baru |
| Healthy Limit | `src/hooks/useSessionTimer.ts` | File baru |

---

## 5. Glosarium Istilah

| Istilah | Arti |
|---|---|
| **Interleaving** | Mencampur materi berbeda dalam satu sesi latihan |
| **Block Practice** | Latihan fokus satu materi sampai tuntas |
| **Spaced Repetition (SRS)** | Mengulang materi di interval waktu yang semakin panjang |
| **Retrieval Practice** | Memaksa otak memanggil memori tanpa bantuan |
| **Cognitive Load** | Beban mental saat memproses informasi baru |
| **Acquisition** | Tahap awal mengenal konsep baru |
| **Consolidation** | Tahap penguatan memori ke long-term storage |

---

**Kesimpulan:**
Dengan menyisipkan prinsip *Interleaving* dan edukasi *Cognitive Science* ke dalam UI dan sistem aplikasi, kita mengubah *English SpellMaster* dari sekadar "Game Edukasi Biasa" menjadi "Mesin Pembuat Memori Permanen".
