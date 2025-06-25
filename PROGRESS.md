# Projektový deník / Progress Log

Tento soubor slouží k zaznamenávání pokroku a důležitých změn v projektu.

## 🟢 Co už jsme vytvořili a vyřešili

- **Registrace uživatele:**
  - Implementována API route pro registraci uživatele přes Directus.
  - Ošetřeno, aby se uživatel neregistroval dvakrát se stejným emailem.
  - Heslo se ukládá v plain textu a hashování provádí Directus (správně).
  - Registrace funguje jak přes modal, tak přes samostatnou stránku.

- **Přihlášení uživatele:**
  - Opraveno ověřování hesla v NextAuth – už se nepoužívá bcrypt.compare, ale ověřuje se přes Directus API `/auth/login`.
  - Přihlášení funguje jak přes modal, tak přes samostatnou stránku.
  - Opraveno i přihlašování přes vlastní API route `/api/login`.

- **Google přihlášení:**
  - Přidán Google provider do NextAuth.
  - Po přihlášení přes Google se vytvoří access token v Directusu.

- **Role a oprávnění:**
  - Uživatelé jsou při registraci přiřazeni do role "Registered user".
  - Role má správně nastavená oprávnění pro login a práci s daty.

- **Debugging a logování:**
  - Přidáno detailní logování do API rout pro snazší ladění.
  - Ověřeno, že environment proměnné se načítají správně.

- **Testování přímého přihlášení:**
  - Ověřeno, že přihlášení přes Directus API funguje (testováno přes PowerShell/Invoke-RestMethod).

- **Modal vs. URL:**
  - Modal pro login/registraci je zatím řešen stavem v Reactu, ne přes URL segmenty (možno vylepšit později).

---

## Další plánované kroky
- Tvorba generátoru PWA aplikací (AppDílna)
- Vylepšení modálního routování (navázání na URL)
- Další rozšiřování funkcionality dle zadání

---

Tento soubor můžeš kdykoliv otevřít v jiném okně Cursoru a já si ho mohu přečíst a připomenout si, kde jsme skončili nebo co už je hotové. 