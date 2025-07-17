# AppDílna

Komerční no-code/low-code platforma pro generování progresivních webových aplikací (PWA).

## 🚀 Rychlý Start

```bash
# Naklonujte repozitář
git clone <repository-url>
cd appdilna

# Nainstalujte závislosti
npm install

# Spusťte vývojový server
npm run dev
```

## 🛠️ Technologie

- **Frontend:** Next.js 14 s TypeScript
- **Backend/CMS:** Directus
- **Autentizace:** NextAuth.js
- **Styling:** Tailwind CSS
- **Databáze:** Spravovaná Directusem

## 📝 Vývojářské Nástroje

### Pre-commit Hooks

Projekt je nastaven s automatickými pre-commit hooks, které zajišťují kvalitu kódu:

#### Co se kontroluje při každém commitu:

- **🔍 TypeScript kontrola typů** - `tsc --noEmit`
- **🧹 ESLint linting** - `eslint --fix` (s automatickými opravami)
- **💅 Prettier formátování** - `prettier --write` (s automatickým formátováním)

#### Podporované soubory:

- **JS/TS soubory** (`.js`, `.jsx`, `.ts`, `.tsx`): kontrola typů + linting + formátování
- **Ostatní soubory** (`.json`, `.css`, `.md`): pouze formátování

#### Ruční spuštění kontrol:

```bash
# Kontrola TypeScript typů
npm run type-check

# Linting s automatickými opravami
npm run lint:fix

# Formátování všech souborů
npm run format

# Kontrola formátování (bez změn)
npm run format:check
```

#### Jak to funguje:

1. **Husky** naslouchá git hooks
2. **lint-staged** spouští kontroly pouze na staged souborech
3. Při chybě se commit zastaví a je potřeba opravit problémy

#### Deaktivace pre-commit hooks:

```bash
# Dočasné přeskočení pro konkrétní commit
git commit --no-verify -m "message"

# Úplné odstranění hooks
rm -rf .husky
```

## 📁 Struktura Projektu

```
src/
├── app/                 # Next.js App Router
├── components/          # React komponenty
│   ├── ui/             # Základní UI komponenty
│   ├── builder/        # Editor komponenty
│   └── cms/            # CMS komponenty
├── lib/                # Utility funkce
└── types/              # TypeScript definice
```

## 🔧 Dostupné Skripty

```bash
npm run dev          # Vývojový server
npm run build        # Production build
npm run start        # Spuštění production serveru
npm run lint         # ESLint kontrola
npm run lint:fix     # ESLint s automatickými opravami
npm run format       # Prettier formátování
npm run format:check # Kontrola formátování
npm run type-check   # TypeScript kontrola typů
```

## 🔐 Nastavení Prostředí

Vytvořte `.env.local` soubor podle `.env.example`:

```bash
cp env.example .env.local
```

Vyplňte potřebné proměnné prostředí podle dokumentace.

## 📖 Další Dokumentace

- [ADRs.md](./ADRs.md) - Architektonická rozhodnutí
- [PROGRESS.md](./PROGRESS.md) - Stav projektu a plány
- [directus-setup.md](./directus-setup.md) - Nastavení Directusu

## 🤝 Přispívání

1. Vytvořte feature branch z `main`
2. Implementujte změny
3. Pre-commit hooks automaticky zkontrolují kód
4. Otevřte Pull Request

## 📄 Licence

Proprietární software - všechna práva vyhrazena.
