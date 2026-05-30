# System Architecture & Application Flow

## 1. Peta Layar (Screen Flow)
Aplikasi SPA (Single Page Application) ini akan memiliki 3 layar utama:
1. **Layar Beranda (`/`)**
   * Menampilkan peta jalan belajar (*Learning Path/Map*).
   * Menampilkan statistik pengguna (XP, Level, Nyawa).
2. **Layar Arena Latihan (`/play/:levelId`)**
   * Antarmuka utama interaksi 2-arah.
   * Memiliki pemutar audio otomatis.
   * Kotak input ketik yang interaktif (bergetar/warna merah jika salah).
   * Modul *Pop-Up* untuk memunculkan "Hukum Ejaan" ketika *error* terdeteksi.
3. **Layar Ringkasan (`/summary`)**
   * Muncul setelah pengguna menyelesaikan 10-15 soal.
   * Menampilkan skor, EXP yang didapat, dan daftar kata yang salah beserta aturan ejaannya untuk di-review kembali.

## 2. Skema Data Pengguna (Local Storage)
Karena kita mulai dari aplikasi Web tanpa peladen (*serverless/local-first*), semua progres akan disimpan di `localStorage` browser. Skemanya harus terstruktur agar tidak hilang.

```json
{
  "user_profile": {
    "level": 1,
    "xp": 150,
    "hearts": 5
  },
  "learning_progress": {
    "completed_levels": ["level_01", "level_02"],
    "word_mastery": {
      "word_001": {
        "mistake_count": 3,
        "last_practiced": "2026-05-30T07:00:00Z",
        "next_review": "2026-06-01T07:00:00Z" // Spaced Repetition System
      }
    }
  }
}
```

## 3. Strategi Audio Engine
Karena kita berfokus pada ejaan yang terikat dengan suara, *audio engine* adalah jantung aplikasi.
*   **Fase Awal:** Menggunakan **Web Speech API (`window.speechSynthesis`)**. Ini adalah *Text-to-Speech* bawaan browser. Gratis, tidak butuh internet, sangat cepat.
*   **Fase Lanjutan:** Jika suara mesin browser dirasa kurang natural, kita akan melakukan *upgrade* menggunakan berkas suara pra-rekaman (*pre-recorded audio mp3*) atau menggunakan layanan pihak ketiga yang di-*cache*.
