import Link from 'next/link';
import { signUp } from '../actions';
import { AuthCard } from '../../../components/auth/auth-card';
import { Input } from '../../../components/auth/input';
import { Notice } from '../../../components/auth/notice';

export default async function Signup({ searchParams }) {
  const q = await searchParams;
  return (
    <AuthCard title="Start celebrating better" subtitle="Set up your organization in a few minutes.">
      <form action={signUp} className="space-y-4">
        <Input label="Your name" name="name" />
        <Input label="Organization name" name="organization" />
        <Input label="Work email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <button className="w-full rounded-xl bg-[#6B5CE7] py-3 font-semibold text-white">Create organization</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#6B5CE7]">Sign in</Link>
      </p>
      {q?.error && <Notice text={q.error} />}
    </AuthCard>
  );
}
