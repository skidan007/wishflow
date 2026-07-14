import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8fc] px-6 py-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">W</span>
          WishFlow
        </div>
        <Link className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white" href="/login">
          Sign in
        </Link>
      </nav>
      <section className="mx-auto flex max-w-4xl flex-col items-center py-28 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
          <Sparkles size={16} className="text-coral" />Employee celebrations, made effortless
        </div>
        <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight md:text-7xl">
          Every birthday deserves to feel <span className="text-[#6B5CE7]">thoughtful.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
          WishFlow gives people teams a beautiful, reliable way to celebrate every employee—without the spreadsheet chase.
        </p>
        <Link href="/signup" className="mt-10 flex items-center gap-2 rounded-2xl bg-[#6B5CE7] px-6 py-4 font-semibold text-white shadow-lg shadow-violet-200">
          Start celebrating <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
