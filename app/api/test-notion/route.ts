import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/notion';

export async function GET() {
  try {
    const res = await testConnection();
    return NextResponse.json({ status: 'success', title: res });
  } catch (e) {
    return NextResponse.json({ status: 'error', message: (e as Error).message }, { status: 500 });
  }
}