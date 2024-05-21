import client from "@/libs/client";
import { NextResponse } from "next/server";

export async function GET() {
  const {rows} = await client.execute(`SELECT
  p.id,
  p.title,
  p.author_id,
  p.price,
  GROUP_CONCAT(PI.image_id) AS images
FROM
  products p
LEFT JOIN 
  product_images pi ON p.id = pi.product_id
GROUP BY
  p.id;`);
  // console.log(data)
  // const data = await client.execute("SELECT * FROM products WHERE active = 1");
  return NextResponse.json({ data:rows }, { status: 200 });
}
