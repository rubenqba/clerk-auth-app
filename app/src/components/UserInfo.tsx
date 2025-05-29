'use client';
import React, { useEffect, useState, Suspense } from 'react';

const UserInfoContent: React.FC = () => {
  const [userData, setUserData] = useState<object | null>(null);
  const [adminData, setAdminData] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, adminRes] = await Promise.all([
          fetch('/api/user'),
          fetch('/api/user?elevated=true'),
        ]);
        if (!userRes.ok) throw new Error('Error fetching user data');
        if (!adminRes.ok) throw new Error('Error fetching admin data');
        const user = await userRes.json();
        const admin = await adminRes.json();
        setUserData(user);
        setAdminData(admin);
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', width: '100%' }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: '50vw', height: '60vh', overflow: 'auto', border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fafafa' }}>
        <h2>User Information</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{userData ? JSON.stringify(userData, null, 2) : 'Loading...'}</pre>
      </div>
      <div style={{ flex: 1, minWidth: 0, maxWidth: '50vw', height: '60vh', overflow: 'auto', border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fafafa' }}>
        <h2>Admin Information</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{adminData ? JSON.stringify(adminData, null, 2) : 'Loading...'}</pre>
      </div>
    </div>
  );
};

const UserInfo: React.FC = () => (
  <Suspense fallback={<div>Cargando información...</div>}>
    <UserInfoContent />
  </Suspense>
);

export default UserInfo;
