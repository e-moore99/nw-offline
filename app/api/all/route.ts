import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Adjust path if needed

export async function GET() {
  console.log("API /all called"); // Add this logging
  try {
    const products = await prisma.product.findMany();
    // const count = await prisma.product.count();
    console.log("All products fetched successfully:", products);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error in fetch all api route",error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}