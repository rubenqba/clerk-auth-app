import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const asAdmin = searchParams.get('elevated') === 'true';

  await new Promise(resolve => setTimeout(resolve, 5000));

  const { getToken } = await auth();
  const token = asAdmin ? await getToken({template: 'Administrator'}) : await getToken();

  if (!token) {
    return NextResponse.json({ error: 'No se pudo obtener el token' }, { status: 401 });
  }

  console.log('Token:', token);

  // Aquí puedes usar el token para hacer una solicitud a tu API o servicio
  const response = await fetch('http://localhost:3001/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error('Error fetching user data:', await response.json());
    return NextResponse.json({ error: 'No se pudo obtener la información del usuario' }, { status: 500 });
  }
  const user = await response.json();

  console.log('User data:', user);
  return NextResponse.json(user);
}
