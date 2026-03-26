import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      const response = NextResponse.json({ user: null }, { status: 401 });
      response.cookies.delete('philosophid_session');
      return response;
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching /api/auth/me:', error);
    const response = NextResponse.json({ user: null }, { status: 500 });
    response.cookies.delete('philosophid_session');
    return response;
  }
}
