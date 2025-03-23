// app/api/products/route.ts
import { PrismaClient, Product } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma"; // Adjust path if needed

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(query),
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: String(query),
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}