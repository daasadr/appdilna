export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          %%APP_TITLE%%
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          %%WELCOME_MESSAGE%%
        </p>
      </div>
    </main>
  );
} 