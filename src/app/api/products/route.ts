import client from "@/libs/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.execute("SELECT * FROM products WHERE active = 1");
  console.log("data",data)
  return NextResponse.json({ data }, { status: 200 });
}
