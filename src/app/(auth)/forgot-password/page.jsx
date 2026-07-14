import { AuthCard } from '../../../components/auth/auth-card';
import { Input } from '../../../components/auth/input';
import { Notice } from '../../../components/auth/notice';
import { requestPasswordReset } from '../actions';

export default async function ForgotPassword({ searchParams }) {
  const q = await searchParams;
  return (
    <AuthCard title="Reset your password" subtitle="We'll email you a secure reset link.">
      <form action={requestPasswordReset} className="space-y-4">
        <Input label="Work email" name="email" type="email" />
        <button className="w-full rounded-xl bg-ink py-3 font-semibold text-white">Send reset link</button>
      </form>
      {q?.error && <Notice text={q.error} />}
    </AuthCard>
  );
}
