import RegistrationForm from './form';

export default function RegisterPage() {
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
      {/* Overlay gradienty pro plynulé okraje */}
      <div className="pointer-events-none select-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(90deg, #2d1c0a 0%, transparent 10%, transparent 90%, #2d1c0a 100%)',
          opacity: 0.18,
        }}
      />
      <div className="pointer-events-none select-none absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(180deg, #2d1c0a 0%, transparent 12%, transparent 88%, #2d1c0a 100%)',
          opacity: 0.08,
        }}
      />
      {/* Tmavý sloupec uprostřed s gradientovými okraji */}
      <div className="pointer-events-none select-none absolute top-0 left-1/2 z-20 h-full"
        style={{
          width: '33vw',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent 0%, #181818 18%, #181818 82%, transparent 100%)',
          opacity: 0.92,
        }}
      />
      {/* Nadpis a panel s formulářem */}
      <div className="flex flex-col justify-center items-center min-h-screen relative z-40">
        <div className="text-center mb-8 mt-52">
          <h1 className="font-display text-6xl mb-2"
            style={{
              color: '#fff8e1',
              textShadow: '0 2px 16px #ffb347, 0 1px 0 #181818',
              letterSpacing: '0.04em',
            }}
          >
            AppDílna
          </h1>
          <p className="text-xl text-copper font-display italic mb-2">
            Digitální laboratoř pro tvorbu PWA aplikací
          </p>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl" style={{backdropFilter: 'blur(8px)', boxShadow: '0 0 0 0 #fff0, 0 0 120px 48px #f5f1e6cc'}}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
} 