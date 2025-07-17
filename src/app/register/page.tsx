import RegistrationForm from './form'

export default function RegisterPage() {
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
      {/* Overlay gradienty pro plynulé okraje */}
      <div
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{
          background:
            'linear-gradient(90deg, #2d1c0a 0%, transparent 10%, transparent 90%, #2d1c0a 100%)',
          opacity: 0.18,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{
          background:
            'linear-gradient(180deg, #2d1c0a 0%, transparent 12%, transparent 88%, #2d1c0a 100%)',
          opacity: 0.08,
        }}
      />
      {/* Tmavý sloupec uprostřed s gradientovými okraji */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 h-full select-none"
        style={{
          width: '33vw',
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(90deg, transparent 0%, #181818 18%, #181818 82%, transparent 100%)',
          opacity: 0.92,
        }}
      />
      {/* Nadpis a panel s formulářem */}
      <div className="relative z-40 flex min-h-screen flex-col items-center justify-center">
        <div className="mb-8 mt-52 text-center">
          <h1
            className="mb-2 font-display text-6xl"
            style={{
              color: '#fff8e1',
              textShadow: '0 2px 16px #ffb347, 0 1px 0 #181818',
              letterSpacing: '0.04em',
            }}
          >
            AppDílna
          </h1>
          <p className="mb-2 font-display text-xl italic text-copper">
            Digitální laboratoř pro tvorbu PWA aplikací
          </p>
        </div>
        <div
          className="mx-4 w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-2xl"
          style={{
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 0 0 #fff0, 0 0 120px 48px #f5f1e6cc',
          }}
        >
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}
