# Project Rules: English SpellMaster

## 1. Tech Stack
*   **Framework:** Vite + React + TypeScript (Strict Mode).
*   **Styling:** Vanilla CSS (CSS Modules) `*.module.css`. Dilarang menggunakan TailwindCSS atau framework CSS lain kecuali secara eksplisit diminta oleh pengguna.
*   **State Management:** React Context API (atau Zustand jika data Spaced Repetition mulai kompleks).

## 2. Design Principles (Premium Aesthetics)
*   **Vibrant & Modern:** Gunakan palet warna yang harmonis (misal: warna HSL). Hindari warna *default* web yang kaku (misal: pure red, pure blue).
*   **Dynamic Interactions:** UI harus terasa "hidup". Gunakan *hover effects*, transisi (*micro-animations*), dan *glassmorphism* (jika sesuai) untuk membuat *pop-up* atau *feedback* terlihat premium.
*   **Color-Coding Spesifik:** Bagian huruf yang merupakan anomali ejaan (*tricky parts*) harus selalu di-highlight dengan warna yang mencolok untuk memberikan petunjuk visual yang kuat kepada pengguna.

## 3. Data Flow & Architecture
*   **Separation of Concerns:** Data materi (Kosakata & Hukum Ejaan) **wajib** dipisah ke dalam berkas JSON (misal `src/data/vocab.json` dan `src/data/rules.json`). 
*   **Komponen UI bodoh (Dumb Components):** Komponen UI hanya bertugas me-render data yang diterimanya. Logika pencocokan jawaban (apakah ketikan pengguna sesuai dengan data) dilakukan di level Hook atau *State Manager*.

## 4. Fitur Inti (Selalu Pertahankan)
*   **2-Way Interaction:** Saat pengguna salah, aplikasi harus menyorot letak kesalahannya dan menampilkan "Hukum Ejaan" terkait, bukan sekadar menampilkan tulisan "Salah!".
*   **Phonetic Mapping Lokal:** Gunakan pendekatan cara baca ala Indonesia (contoh: `/bred/`, bukan `/brɛd/`) agar mudah dimengerti target pengguna.
