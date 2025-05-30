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
      <article className="flex gap-8 items-start w-full">
        <Suspense fallback={<Skeleton className="flex-1 min-w-0 max-w-1/2 h-[70vh] rounded-lg p-4" />}>
          <section className="flex flex-col min-w-0 max-w-1/2 h-[70vh] border border-gray-200 rounded-lg p-4 bg-gray-50">
            <UserInfoContent title="User token representation" url={`${process.env.API_URL}/api/token`} />
          </section>
        </Suspense>
        <Suspense fallback={<Skeleton className="flex-1 min-w-0 max-w-1/2 h-[70vh] rounded-lg p-4" />}>
          <section className="flex flex-col min-w-0 max-w-1/2 h-[70vh] border border-gray-200 rounded-lg p-4 bg-gray-50">
            <UserInfoContent title="Admin token representation" url={`${process.env.API_URL}/api/token`} sudo={true} />
          </section>
        </Suspense>
      </article>
    </>
  );
}
