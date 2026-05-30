# AGENTS.md

## Repo status

Active implementation — Vite + React + TypeScript SPA. Planning docs coexist alongside working source code.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

## Project identity

**PolaEja** (formerly English SpellMaster) — a Vite + React + TypeScript SPA that teaches English spelling to Indonesian speakers using a "Spelling Law" approach (inspired by Tajwid rules for Quran reading).
- Capacitor Android app with online-first mode (loads from Vercel)
- GitHub Actions builds APK on push to `main`
- `android/` is in `.gitignore`; CI generates it via `npx cap add android` then patches the Gradle config to exclude `kotlin-stdlib-jdk7/jdk8` (prevents duplicate class conflict with `kotlin-stdlib` 1.8.22 bundled in Capacitor)

## Auto-loaded instructions (via `opencode.json`)

`AGENTS.md`, `rules.md`, `architecture.md` are loaded automatically on each session.

Not auto-loaded — reference as needed:
| File | Purpose |
|------|---------|
| `agent.md` | AI persona prompt for roleplay/context injection |
| `prompt.md` | Copy-paste prompt for generating vocabulary JSON via external AI |

## Key constraints (from `rules.md`)

- Styling: CSS Modules only (`*.module.css`), no Tailwind/other CSS frameworks unless user explicitly requests
- Data: vocabulary and rules live in separate JSON files (`src/data/vocab.json`, `src/data/rules.json`)
- UI: dumb components — answer-matching logic lives in hooks or state manager
- Phonetic: use Indonesian-style pronunciation (`/bred/`), never IPA
- Feedback: wrong answers must highlight the error and show the relevant "Spelling Law", not just "Wrong!"

## Data schema (from `architecture.md`)

All user progress lives in `localStorage` — no backend. Schema: `user_profile` (level, xp, hearts) + `learning_progress` (completed_levels, word_mastery with SRS fields).

## Vocabulary JSON structure (from `prompt.md`)

Two top-level keys: `rules` (id → {nama, penjelasan}) and `vocabularies` (array of {id, kata, arti, cara_baca_lokal, kalimat_audio, bagian_jebakan with 0-indexed positions, id_hukum}).
