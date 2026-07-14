'use server';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

export async function signIn(formData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  });

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message));
  }

  redirect('/dashboard');
}

export async function signUp(formData) {
  const supabase = await createClient();
  const email = String(formData.get('email'));
  const { error } = await supabase.auth.signUp({
    email,
    password: String(formData.get('password')),
    options: {
      data: {
        full_name: String(formData.get('name')),
        organization_name: String(formData.get('organization')),
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=Check your inbox to verify your account.');
}

export async function requestPasswordReset(formData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(String(formData.get('email')), {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) {
    redirect('/forgot-password?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=Check your inbox for a password reset link.');
}

export async function updatePassword(formData) {
  const supabase = await createClient();
  const password = String(formData.get('password'));
  const confirmation = String(formData.get('confirmation'));

  if (password.length < 8 || password !== confirmation) {
    redirect('/reset-password?error=Passwords must match and be at least 8 characters.');
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect('/reset-password?error=' + encodeURIComponent(error.message));
  }

  redirect('/dashboard');
}
