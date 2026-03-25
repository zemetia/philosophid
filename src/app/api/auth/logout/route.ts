import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the frontend custom auth session cookie
  response.cookies.delete('philosophid_session');
  
  return response;
}
