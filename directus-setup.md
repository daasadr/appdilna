# Nastavení Directusu pro AppDílna Builder

## 1. Ověření kolekce `apps`

Kolekce `apps` by měla obsahovat následující pole:

### Základní pole:

- `id` (UUID, Primary Key)
- `name` (String, Required) - název aplikace
- `slug` (String, Required) - URL slug
- `status` (String, Options: draft/published) - stav aplikace
- `user_owner` (UUID, Many-to-One s users) - vlastník aplikace

### Builder pole:

- `pages` (JSON) - pole stránek s komponentami
- `settings` (JSON) - nastavení aplikace
- `theme` (JSON) - téma aplikace

### Volitelná pole:

- `app_title` (String) - titulek aplikace
- `welcome_message` (String) - uvítací zpráva
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 2. Nastavení oprávnění pro kolekci `apps`

### Pro roli "Registered" (běžní uživatelé):

**Čtení (Read):**

- Filter: `{ "user_owner": { "_eq": "$CURRENT_USER" } }`
- Fields: všechny pole

**Vytvoření (Create):**

- Fields: `name`, `slug`, `status`, `user_owner`, `pages`, `settings`, `theme`, `app_title`, `welcome_message`

**Aktualizace (Update):**

- Filter: `{ "user_owner": { "_eq": "$CURRENT_USER" } }`
- Fields: všechny pole kromě `id`

**Mazání (Delete):**

- Filter: `{ "user_owner": { "_eq": "$CURRENT_USER" } }`

## 3. Nastavení v Directus Admin Panelu

### Krok 1: Otevřete Directus Admin Panel

1. Jděte na `https://dir.appdilna.cz/admin`
2. Přihlaste se s admin účtem

### Krok 2: Ověřte kolekci `apps`

1. Jděte do **Settings > Data Model**
2. Najděte kolekci `apps`
3. Ověřte, že obsahuje všechna potřebná pole

### Krok 3: Nastavte oprávnění

1. Jděte do **Settings > Roles & Permissions**
2. Vyberte roli "Registered"
3. Najděte kolekci `apps`
4. Nastavte oprávnění podle výše uvedeného

### Krok 4: Test oprávnění

1. Vytvořte test uživatele s rolí "Registered"
2. Přihlaste se s tímto uživatelem
3. Ověřte, že může vytvářet a upravovat aplikace

## 4. Struktura JSON polí

### `pages` pole:

```json
[
  {
    "id": "home",
    "name": "Domovská stránka",
    "slug": "home",
    "components": [
      {
        "id": "component-123",
        "type": "hero",
        "name": "Hero sekce",
        "props": {
          "title": "Vítejte",
          "subtitle": "Vaše úžasná aplikace",
          "buttonText": "Začít",
          "buttonLink": "#",
          "buttonVariant": "primary"
        },
        "position": 0,
        "style": {},
        "children": []
      }
    ],
    "settings": {}
  }
]
```

### `settings` pole:

```json
{
  "seo": {
    "title": "Název aplikace",
    "description": "Popis aplikace",
    "keywords": []
  },
  "analytics": {
    "enabled": false,
    "trackingId": ""
  }
}
```

### `theme` pole:

```json
{
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#6B7280",
    "accent": "#10B981",
    "background": "#FFFFFF",
    "text": "#1F2937"
  },
  "fonts": {
    "heading": "Inter",
    "body": "Inter"
  },
  "spacing": "medium",
  "borderRadius": "medium"
}
```

## 5. Testování

Po nastavení můžete otestovat builder:

1. Vytvořte novou aplikaci přes `/apps/create`
2. Jděte do builderu na `/apps/[id]/builder`
3. Přidejte komponenty z knihovny
4. Upravte vlastnosti komponent
5. Uložte změny

## 6. Řešení problémů

### Problém: "Forbidden" při načítání aplikace

- Zkontrolujte, že `user_owner` pole je správně nastaveno
- Ověřte oprávnění pro roli "Registered"

### Problém: "Unauthorized" při ukládání

- Zkontrolujte, že uživatel má oprávnění k aktualizaci kolekce `apps`
- Ověřte, že `DIRECTUS_ADMIN_TOKEN` je správně nastaven

### Problém: Komponenty se neukládají

- Zkontrolujte strukturu `pages` pole
- Ověřte, že JSON pole je správně formátováno
