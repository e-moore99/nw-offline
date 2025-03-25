import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Adjust path if needed

export async function GET() {

  try {
    const products = await prisma.product.findMany();
    // const count = await prisma.product.count();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}