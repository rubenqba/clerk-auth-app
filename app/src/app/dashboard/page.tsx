import UserInfo from '@/components/UserInfo';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido a tu panel de control.</p>
      <section>
        <UserInfo />
      </section>
    </div>
  );
}