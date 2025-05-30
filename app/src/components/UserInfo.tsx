import { auth } from '@clerk/nextjs/server';
import React from 'react';

async function fetchUserData(url: string, sudo: boolean = false) {
  const delay = Math.floor(Math.random() * 11) * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  const { getToken } = await auth();

  const token = await (sudo ? getToken({ template: 'Administrator' }) : getToken());

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
  if (!res.ok) {
    return {
      status: 'failed',
      error: `Error fetching user data: ${res.status} ${res.statusText}`,
      details: await res.json(),
    }
  };
  return res.json();
}

interface UserInfoContentProps {
  url: string;
  sudo?: boolean;
  title?: string;
}

const UserInfoContent = async ({ url, title, sudo = false }: UserInfoContentProps) => {
  let userData: any = null;
  let error: string | null = null;
  try {
    userData = await fetchUserData(url, sudo);
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {title && <h2 className="text-md font-semibold mb-2">{title}</h2>}
      <div className='flex-grow overflow-auto'>
        <pre className="whitespace-pre-wrap break-all text-xs">{userData ? JSON.stringify(userData, null, 2) : 'Loading...'}</pre>
      </div>
    </>
  );
};

export default UserInfoContent;
