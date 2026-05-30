# Prompt Generator Data Kosakata (English SpellMaster)
*Copy-paste prompt di bawah ini ke AI (ChatGPT/Claude/Gemini) setiap kali kamu ingin memproduksi data kosakata baru secara otomatis dan akurat.*

---

**[COPY DARI SINI]**

Anda adalah asisten kurikulum bahasa Inggris khusus untuk penutur bahasa Indonesia.
Tugas Anda adalah menghasilkan data JSON yang sepenuhnya deterministik dan sesuai skema untuk aplikasi **English SpellMaster**. 
Aplikasi ini mengajarkan ejaan bahasa Inggris berfokus pada anomali tulisan vs suara, menggunakan pendekatan "Hukum Ejaan" (mirip Hukum Tajwid).

**INSTRUKSI:**
Buatkan saya **[JUMLAH]** kosakata bahasa Inggris dengan fokus pada kategori/masalah: **[TULIS KATEGORI, misal: Deretan Vokal OO]**.

**ATURAN OUTPUT:**
1. Output HARUS murni JSON yang valid, tanpa teks awalan atau akhiran (tanpa blok markdown jika memungkinkan).
2. JSON harus terdiri dari 2 objek utama: `"rules"` dan `"vocabularies"`.
3. `"cara_baca_lokal"` harus menggunakan pelafalan Indonesia yang mudah dibaca (contoh: bukan `/ʌ/` tapi `/a/`, bukan `/ɪ/` tapi `/i/`).
4. Posisi `index` huruf dimulai dari 0. Spasi tidak dihitung dalam kata. Perhitungan indeks harus 100% akurat.

**SKEMA JSON YANG WAJIB DIIKUTI:**
```json
{
  "rules": {
    "ID_HUKUM_UNIK": {
      "nama": "Nama Hukum Ejaan (Misal: Hukum Vokal Panjang OO)",
      "penjelasan": "Penjelasan logika ejaannya dalam bahasa Indonesia. Singkat dan jelas."
    }
  },
  "vocabularies": [
    {
      "id": "UNIK_ID_KATA",
      "kata": "kata_dalam_inggris_huruf_kecil",
      "arti": "arti dalam bahasa indonesia",
      "cara_baca_lokal": "/cara bacanya/",
      "kalimat_audio": "Kalimat utuh menggunakan kata tersebut (untuk konteks audio).",
      "bagian_jebakan": {
        "huruf": "huruf_yang_menjebak",
        "posisi_mulai": 0, // indeks mulai huruf jebakan (0-indexed)
        "posisi_akhir": 1  // indeks akhir huruf jebakan (0-indexed)
      },
      "id_hukum": "ID_HUKUM_UNIK" // Harus sesuai dengan key di objek rules
    }
  ]
}
```

Tolong pastikan `posisi_mulai` dan `posisi_akhir` dihitung dengan benar dari *string* `kata`.
Silakan hasilkan datanya sekarang.

**[SAMPAI SINI]**
