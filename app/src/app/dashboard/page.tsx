import Skeleton from '@/components/Skeleton';
import UserInfoContent from '@/components/UserInfo';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/');
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

    </>
  );
}
