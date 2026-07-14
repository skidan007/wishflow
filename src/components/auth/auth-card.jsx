import Link from 'next/link';

export function AuthCard({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-lavender p-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card">
        <Link href="/" className="mb-10 block text-xl font-bold">
          <span className="mr-2 inline-grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm text-white">
            W
          </span>
          WishFlow
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mb-7 mt-2 text-slate-500">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
