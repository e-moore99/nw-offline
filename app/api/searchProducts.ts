import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import { Product } from "../lib/types";
import { fetchProductsByQuery } from "../lib/fetch";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchQuery } = req.query;

  if (!searchQuery || typeof searchQuery !== "string") {
    return res.status(400).json({ error: "Invalid search query" });
  }

  try {
    // const products = await fetchProductsByQuery(searchQuery);
    res.status(200).json(products);
    const client = await pool.connect();
    const result = await client.query<Product[]>(
      `SELECT * FROM data WHERE name ILIKE $1 OR brand ILIKE $1`,
      [`%${searchQuery}%`]
    `SELECT * FROM data WHERE name LIKE %${searchQuery}% OR brand LIKE %${searchQuery}%`
    );
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
