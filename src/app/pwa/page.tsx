export default function PwaPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Wood textura - na celé pozadí */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/wood-texture.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient pro plynulý přechod sekce do dřeva */}
      <div className="relative z-10 flex min-h-screen items-start justify-center px-2 py-16">
        <div
          className="mx-auto w-full max-w-3xl overflow-visible rounded-3xl p-8"
          style={{
            background: 'rgba(245,241,230,0.58)', // částečná průhlednost
            borderRadius: '2rem',
            position: 'relative',
            boxShadow: '0 0 0 0 #fff0, 0 0 120px 48px #f5f1e6cc',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            mixBlendMode: 'lighten', // jemné prolnutí
          }}
        >
          {/* Pseudo-element pro ještě měkčí okraj */}
          <div
            style={{
              content: "''",
              position: 'absolute',
              top: '-32px',
              left: '-32px',
              right: '-32px',
              bottom: '-32px',
              borderRadius: '2.5rem',
              background: 'rgba(245,241,230,0.5)',
              filter: 'blur(12px)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          <article className="relative z-10">
            <h1 className="mb-6 text-center font-display text-4xl text-copper">
              Co je to PWA a jaké jsou její výhody?
            </h1>
            <p className="mb-4 text-lg text-ink">
              <strong>PWA</strong> (Progressive Web App, česky progresivní
              webová aplikace) je moderní typ webové aplikace, která vypadá a
              chová se jako nativní mobilní aplikace, ale běží přímo ve webovém
              prohlížeči. Uživatel si ji může přidat na plochu, spouštět ji
              offline a využívat notifikace nebo další pokročilé funkce.
            </p>
            <h2 className="mb-2 mt-8 font-display text-2xl text-copper">
              Výhody PWA
            </h2>
            <ul className="mb-4 list-disc pl-6 text-ink">
              <li>
                <strong>Snadná instalace</strong> – uživatel si aplikaci přidá
                na plochu jedním kliknutím, bez nutnosti App Store/Google Play.
              </li>
              <li>
                <strong>Offline režim</strong> – aplikace funguje i bez
                připojení k internetu (díky Service Workerům).
              </li>
              <li>
                <strong>Rychlost</strong> – PWA se načítají velmi rychle díky
                cachování a optimalizaci.
              </li>
              <li>
                <strong>Aktualizace</strong> – vždy aktuální verze, uživatel
                nemusí nic stahovat ručně.
              </li>
              <li>
                <strong>Push notifikace</strong> – možnost zasílat upozornění
                přímo na zařízení uživatele.
              </li>
              <li>
                <strong>Responsivita</strong> – perfektní zobrazení na mobilech,
                tabletech i počítačích.
              </li>
              <li>
                <strong>Nižší náklady</strong> – není třeba vyvíjet zvlášť pro
                iOS, Android a web.
              </li>
            </ul>
            <h2 className="mb-2 mt-8 font-display text-2xl text-copper">
              Nevýhody a omezení PWA
            </h2>
            <ul className="mb-4 list-disc pl-6 text-ink">
              <li>
                <strong>Omezený přístup k některým funkcím zařízení</strong>{' '}
                (např. Bluetooth, NFC, některé hardwarové senzory).
              </li>
              <li>
                <strong>Podpora v App Store</strong> – PWA nelze přímo
                publikovat do App Store (iOS), pouze na Google Play s omezeními.
              </li>
              <li>
                <strong>iOS omezení</strong> – některé funkce (notifikace,
                offline režim) jsou na iOS omezené nebo fungují jinak než na
                Androidu.
              </li>
            </ul>
            <h2 className="mb-2 mt-8 font-display text-2xl text-copper">
              Kdy je PWA správná volba?
            </h2>
            <p className="mb-4 text-lg text-ink">
              PWA je ideální pro projekty, kde chcete rychle a levně nabídnout
              uživatelům aplikaci dostupnou na všech zařízeních, bez nutnosti
              složitého schvalování v obchodech. Skvěle se hodí pro firemní
              aplikace, katalogy, rezervační systémy, jednoduché e-shopy, blogy,
              informační portály a mnoho dalšího.
            </p>
            <p className="mb-2 text-ink">
              Pokud potřebujete plný přístup k hardwaru zařízení, nebo chcete
              být v App Store, je lepší zvolit nativní vývoj. Pro většinu
              běžných projektů je však PWA moderní, rychlé a uživatelsky
              přívětivé řešení.
            </p>
          </article>
        </div>
      </div>
      {/* Stylový kulatý button Domů */}
      <a
        href="/"
        className="fixed right-8 top-8 z-50"
        style={{
          textDecoration: 'none',
        }}
      >
        <button
          className="flex h-16 w-16 items-center justify-center rounded-full border shadow-lg transition-transform duration-200 hover:scale-110"
          style={{
            backgroundImage: "url('/images/wood.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff8e1',
            textShadow: '0 1px 8px #181818, 0 1px 0 #b87333',
            boxShadow: '0 2px 12px #0006, 0 1px 0 #fff4 inset',
            borderWidth: '3px',
            borderColor: '#6b4f27', // tmavě hnědý okraj
            outline: 'none',
            fontSize: '1.5rem',
            fontFamily: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
          aria-label="Domů"
        >
          {/* SVG domeček s dřevěným gradientem */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="woodHouse"
                x1="0"
                y1="0"
                x2="32"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#b87333" />
                <stop offset="1" stopColor="#6b4f27" />
              </linearGradient>
            </defs>
            <path
              d="M6 16L16 7L26 16V26C26 26.5523 25.5523 27 25 27H7C6.44772 27 6 26.5523 6 26V16Z"
              fill="url(#woodHouse)"
              stroke="#6b4f27"
              strokeWidth="2"
            />
            <rect
              x="12"
              y="20"
              width="8"
              height="7"
              rx="1.5"
              fill="#fff8e1"
              stroke="#b87333"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </a>
    </div>
  )
}
