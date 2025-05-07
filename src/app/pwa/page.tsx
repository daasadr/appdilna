export default function PwaPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Wood textura - na celé pozadí */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/wood-texture.webp')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Gradient pro plynulý přechod sekce do dřeva */}
      <div className="relative z-10 flex justify-center items-start min-h-screen py-16 px-2">
        <div
          className="max-w-3xl w-full mx-auto p-8 rounded-3xl overflow-visible"
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
            <h1 className="font-display text-4xl text-copper mb-6 text-center">Co je to PWA a jaké jsou její výhody?</h1>
            <p className="mb-4 text-lg text-ink">
              <strong>PWA</strong> (Progressive Web App, česky progresivní webová aplikace) je moderní typ webové aplikace, která vypadá a chová se jako nativní mobilní aplikace, ale běží přímo ve webovém prohlížeči. Uživatel si ji může přidat na plochu, spouštět ji offline a využívat notifikace nebo další pokročilé funkce.
            </p>
            <h2 className="font-display text-2xl text-copper mt-8 mb-2">Výhody PWA</h2>
            <ul className="list-disc pl-6 mb-4 text-ink">
              <li><strong>Snadná instalace</strong> – uživatel si aplikaci přidá na plochu jedním kliknutím, bez nutnosti App Store/Google Play.</li>
              <li><strong>Offline režim</strong> – aplikace funguje i bez připojení k internetu (díky Service Workerům).</li>
              <li><strong>Rychlost</strong> – PWA se načítají velmi rychle díky cachování a optimalizaci.</li>
              <li><strong>Aktualizace</strong> – vždy aktuální verze, uživatel nemusí nic stahovat ručně.</li>
              <li><strong>Push notifikace</strong> – možnost zasílat upozornění přímo na zařízení uživatele.</li>
              <li><strong>Responsivita</strong> – perfektní zobrazení na mobilech, tabletech i počítačích.</li>
              <li><strong>Nižší náklady</strong> – není třeba vyvíjet zvlášť pro iOS, Android a web.</li>
            </ul>
            <h2 className="font-display text-2xl text-copper mt-8 mb-2">Nevýhody a omezení PWA</h2>
            <ul className="list-disc pl-6 mb-4 text-ink">
              <li><strong>Omezený přístup k některým funkcím zařízení</strong> (např. Bluetooth, NFC, některé hardwarové senzory).</li>
              <li><strong>Podpora v App Store</strong> – PWA nelze přímo publikovat do App Store (iOS), pouze na Google Play s omezeními.</li>
              <li><strong>iOS omezení</strong> – některé funkce (notifikace, offline režim) jsou na iOS omezené nebo fungují jinak než na Androidu.</li>
            </ul>
            <h2 className="font-display text-2xl text-copper mt-8 mb-2">Kdy je PWA správná volba?</h2>
            <p className="mb-4 text-lg text-ink">
              PWA je ideální pro projekty, kde chcete rychle a levně nabídnout uživatelům aplikaci dostupnou na všech zařízeních, bez nutnosti složitého schvalování v obchodech. Skvěle se hodí pro firemní aplikace, katalogy, rezervační systémy, jednoduché e-shopy, blogy, informační portály a mnoho dalšího.
            </p>
            <p className="mb-2 text-ink">
              Pokud potřebujete plný přístup k hardwaru zařízení, nebo chcete být v App Store, je lepší zvolit nativní vývoj. Pro většinu běžných projektů je však PWA moderní, rychlé a uživatelsky přívětivé řešení.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
} 