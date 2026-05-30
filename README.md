# Belajar Ejaan Bahasa Inggris (English SpellMaster)

## 📌 Latar Belakang
Bagi penutur bahasa fonetis seperti bahasa Indonesia (di mana huruf dibaca persis seperti tulisannya), ejaan bahasa Inggris seringkali terasa sangat membingungkan dan penuh dengan ketidakkonsistenan (*opaque orthography*). Contohnya, deretan huruf **"ea"** bisa dibaca sebagai /i:/ pada kata *meat*, tetapi dibaca /e/ pada kata *bread*. 

Proyek ini bertujuan untuk menjembatani jarak antara "suara" dan "tulisan" tersebut melalui pendekatan pembelajaran yang terstruktur, visual, dan interaktif.

## 💡 Konsep Utama: "Hukum Ejaan" (Pendekatan ala Tajwid)
Aplikasi ini tidak sekadar menyuruh pengguna menghafal ratusan kata secara acak. Aplikasi ini menggunakan pendekatan logis seperti **"Hukum Tajwid"** saat membaca Al-Quran. Setiap anomali ejaan akan memiliki "Hukumnya" masing-masing beserta penjelasannya.

Contoh:
*   **Hukum Magic E:** Huruf 'e' di akhir kata adalah bisu, tetapi ia "memanjangkan" vokal sebelumnya sesuai dengan bunyi abjad aslinya. (Contoh: *bit* ➔ *bite* dibaca /bait/).
*   **Hukum Vokal Beriringan (The Walking Vowels):** Jika ada dua vokal berderet, vokal pertama yang berkuasa dibaca panjang, vokal kedua bisu. (Contoh: *m**ea**t* dibaca /mit/).
*   **Hukum Gharib (Pengecualian Mutlak):** Kata-kata yang melanggar aturan normal karena alasan sejarah dan harus dihafal khusus. (Contoh: *br**ea**d* dibaca /bred/).

## 🎯 Fitur Utama (Sistem 2-Arah)
Sistem dalam aplikasi ini bertindak sebagai **Tutor Interaktif** (2 arah):
1. **Dikte Berbasis Pola:** Sistem memberikan soal (audio + konteks kalimat).
2. **Koreksi Cerdas (Smart Feedback):** Jika pengguna salah mengetik secara fonetis (misal mengetik *bred* alih-alih *bread*), sistem tidak hanya menyalahkan, tetapi:
   * Menyorot (highlight) bagian huruf yang salah.
   * Memunculkan **Hukum Ejaan** terkait untuk menjelaskan *kenapa* ejaannya seperti itu.
3. **Phonetic Mapping Lokal:** Sistem menggunakan panduan cara baca lisan ala Indonesia (contoh: *enough* = /i-naf/) agar lebih mudah dipahami daripada menggunakan simbol IPA yang rumit.
4. **Spaced Repetition System (SRS):** Mengulang kembali soal-soal ejaan yang salah dijawab oleh pengguna di sesi-sesi berikutnya sampai mereka benar-benar hafal.

## 📚 Draf Kurikulum Ejaan
Materi disusun berdasarkan **Tingkat Kesulitan & Anomali ("Troublemakers")**, bukan berdasarkan topik umum (seperti buah/hewan):

1. **Bagian 1: Pengenalan Suara vs Tulisan**
   * Aturan "Magic E" (Akhiran e Bisu)
   * Huruf Ganda Penahan Bunyi Pendek (Double Consonants)
2. **Bagian 2: Jebakan Vokal Berderet (Vowel Teams)**
   * Misteri Huruf "EA" (meat vs bread vs steak)
   * Si Kembar "OO" (moon vs book vs blood)
   * Keluarga "OU" dan "OW"
3. **Bagian 3: Huruf Bisu (Silent Letters)**
   * Silent K & G di awal kata (knife, sign)
   * Silent W, B, L, H, T (write, comb, walk, ghost, listen)
4. **Bagian 4: Si Bunglon Konsonan (Hard & Soft C/G)**
   * Kapan C dibaca /k/ (cat) vs /s/ (city)
   * Kapan G dibaca /g/ (go) vs /j/ (gym)
5. **Bagian 5: Level Boss (Anomali Acak)**
   * Grup "-OUGH" yang Menjebak (enough, though, through, cough)
   * Homophones (their/there/they're)

---
*Proyek ini masih dalam tahap diskusi arsitektur dan pemilihan teknologi (Framework & Bahasa Pemrograman).*
