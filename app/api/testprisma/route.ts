// app/api/testprisma/route.ts
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const test = await prisma.product.findFirst();
    return NextResponse.json({ success: true, test });
  } catch (error) {
    console.error("Prisma test error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}