// import postgres from "postgres";
// import { data } from "../lib/dairy";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function seedData() {
//   await sql`
//     CREATE TABLE IF NOT EXISTS data (
//     id VARCHAR(50) PRIMARY KEY,
//     name VARCHAR(255),
//     subtitle VARCHAR(255),
//     brand VARCHAR(100),
//     href VARCHAR(255),
//     availability VARCHAR(255),
//     price_isSaleValueCardDependent BOOLEAN,
//     price_value DECIMAL(10, 2),
//     price_retailValue DECIMAL(10, 2),
//     price_hasLimit BOOLEAN,
//     image_lg VARCHAR(255),
//     image_md VARCHAR(255),
//     image_sm VARCHAR(255),
//     image_xs VARCHAR(255),
//     isRestrictedByAge BOOLEAN,
//     liquorFlag BOOLEAN,
//     isTobacco BOOLEAN,
//     originRegulated BOOLEAN,
//     saleTypes VARCHAR(50),
//     unitOfMeasure VARCHAR(10),
//     unitPrice_plainText VARCHAR(50),
//     unitPrice_value DECIMAL(10, 2),
//     unitPrice_type VARCHAR(10),
//     unitPrice_amount DECIMAL(10, 2),
//     categories VARCHAR(255)
//     );
//   `;

//   const insertedData = await Promise.all(
//     data.map(async (data) => {
//       return sql`
//         INSERT INTO data (id, name, subtitle, brand, href, availability, price_isSaleValueCardDependent, price_value, price_retailValue, price_hasLimit, 
//     image_lg, image_md, image_sm, image_xs, isRestrictedByAge, liquorFlag, isTobacco, originRegulated, saleTypes, 
//     unitOfMeasure, unitPrice_plainText, unitPrice_value, unitPrice_type, unitPrice_amount, categories)
//         VALUES (${data.id}, ${data.name}, ${data.subtitle}, ${data.brand}, ${data.href}, ${data.availability}, ${data.price.isSaleValueCardDependent}, ${data.price.value}, ${data.price.retailValue}, ${data.price.hasLimit}, ${data.images.lg}, ${data.images.md}, ${data.images.sm}, ${data.images.xs}, ${data.isRestrictedByAge}, ${data.liquorFlag}, ${data.isTobacco}, ${data.originRegulated}, ${data.saleTypes}, ${data.unitOfMeasure}, ${data.unitPrice.plainText}, ${data.unitPrice.value}, ${data.unitPrice.type}, ${data.unitPrice.amount}, ${data.categories} )
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     })
//   );

//   return insertedData;
// }

export async function GET() {
  try {
    // const result = await sql.begin(() => [seedData()]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
