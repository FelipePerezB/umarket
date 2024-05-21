import client from '@/libs/client';
import { NextResponse } from 'next/server';

export async function GET(  request: Request,
  { params: { id } }: { params: { id?: string } }) {
    const res = await client.execute(`SELECT image FROM images WHERE ID = ${id}`);
    const base64 = res.rows.at(0)?.image as string;

  if (!base64) {
    return NextResponse.json({ error: 'Base64 string is required' }, { status: 400 });
  }

  const decoded = base64.replace("data:image/png;base64,", "");
  const imageResp = Buffer.from(decoded, "base64")

  return new NextResponse(imageResp, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="image.png"'
    }
  });
}
