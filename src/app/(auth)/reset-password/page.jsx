import { AuthCard } from '../../../components/auth/auth-card';
import { Input } from '../../../components/auth/input';
import { Notice } from '../../../components/auth/notice';
import { updatePassword } from '../actions';

export default async function ResetPassword({ searchParams }) {
  const q = await searchParams;
  return (
    <AuthCard title="Choose a new password" subtitle="Use at least 8 characters to keep your account secure.">
      <form action={updatePassword} className="space-y-4">
        <Input label="New password" name="password" type="password" />
        <Input label="Confirm password" name="confirmation" type="password" />
        <button className="w-full rounded-xl bg-ink py-3 font-semibold text-white">Update password</button>
      </form>
      {q?.error && <Notice text={q.error} />}
    </AuthCard>
  );
}
