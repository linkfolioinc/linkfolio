'use server';

import { redirect } from 'next/navigation';

import { createSClient } from '@/supabase/server';

export async function logout() {
  const supabase = createSClient();
  await supabase.auth.signOut();

  redirect('/signin');
  return { success: true };
}
