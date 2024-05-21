import client from "@/libs/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.execute("SELECT * FROM announcements WHERE active = 1");
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST() {
  const data = await client.execute("SELECT * FROM announcements WHERE active = 1");
  return NextResponse.json({ data }, { status: 200 });
}