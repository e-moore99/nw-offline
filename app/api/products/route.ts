import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma"; // Adjust path if needed

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log("API /products called with query:", query); // Add this logging
  console.log("DATABASE_URL_PRISMA:", process.env.DATABASE_URL_PRISMA); // Add this logging
  if (!query) {
    console.log("Query parameter is missing"); // Add this logging
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
    console.log("Products fetched successfully:", products); // Add this logging
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("error fetching products in api route:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}