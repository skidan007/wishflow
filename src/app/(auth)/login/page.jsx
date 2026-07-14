import Link from 'next/link';
import { signIn } from '../actions';
import { AuthCard } from '../../../components/auth/auth-card';
import { Input } from '../../../components/auth/input';
import { Notice } from '../../../components/auth/notice';

export default async function Login({ searchParams }) {
  const q = await searchParams;
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to keep your celebrations flowing.">
      <form action={signIn} className="space-y-4">
        <Input label="Work email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <button className="w-full rounded-xl bg-ink py-3 font-semibold text-white">Sign in</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        <Link href="/forgot-password" className="font-medium text-[#6B5CE7]">Forgot password?</Link> · New to WishFlow?{' '}
        <Link href="/signup" className="font-semibold text-[#6B5CE7]">Create an account</Link>
      </p>
      {q?.error && <Notice text={q.error} />}
      {q?.message && <Notice text={q.message} />}
    </AuthCard>
  );
}
