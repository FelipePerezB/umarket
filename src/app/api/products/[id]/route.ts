import client from "@/libs/client";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id?: string } }
) {
  if (!id) return NextResponse.json({ msg: "id is missing" }, { status: 400 });
  const data = await client.execute(`DELETE FROM products WHERE ID = ${id}`);
  return NextResponse.json({ data }, { status: 200 });
}
