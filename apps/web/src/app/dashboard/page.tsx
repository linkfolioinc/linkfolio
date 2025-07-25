import { createSClient } from '@/supabase/server';
import React from 'react';
import Dashboard from './dashboard';
import { redirect } from 'next/navigation';
import { getUser } from '@/supabase/getUser';
import type { Startup, Project } from '@/lib/types/supabase-types';
import { performance } from 'perf_hooks';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const supabase = createSClient();
  const user = await getUser();

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
    *,
    startups ( * ),
    projects ( * )
  `
    )
    .eq('id', user.id)
    .single();

  if (error) {
    return <div>error</div>;
  }

  if (data.onboarding === 'pending') {
    redirect('/onboarding');
  }

  let startups = data.startups.sort((a: Startup, b: Startup) => a.index - b.index);
  let projects = data.projects.sort((a: Project, b: Project) => a.index - b.index);

  const { tab = 'profile' } = await searchParams;

  return (
    <div className="w-full h-full">
      <Dashboard user={user} profile={data} startups={startups} projects={projects} tab={tab} />
    </div>
  );
}
