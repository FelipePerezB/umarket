// import { clerkClient } from "@clerk/nextjs";
// import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
// import { Role } from "@prisma/client";
import create from "@/libs/commands/create";
import update from "@/libs/commands/update";
import { Role } from "@/models/role";
// import { Role } from "@/types/global";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
// import prisma from "src/utils/prisma";
//
export default async function upsertUser(evt: WebhookEvent) {
  console.log(evt)
  const eventType = evt.type;
  if (!(eventType === "user.created" || eventType === "user.updated"))
    return NextResponse.json(
      { msg: `${eventType} is an invalid event type` },
      {
        status: 400,
      }
    );

  const { id, last_name, first_name, email_addresses, public_metadata } =
    evt.data ?? {};

  if (!id) return NextResponse.json({ msg: "Missing ID" }, { status: 400 });
  if (!first_name)
    return NextResponse.json({ msg: "Missing name" }, { status: 400 });
  if (!email_addresses[0]?.email_address)
    return NextResponse.json({ msg: "Mssing email" }, { status: 400 });

  const email = email_addresses.at(0)?.email_address;
  const role = email?.endsWith("@fen.uchile.cl") ? Role.AUTHORIZED : Role.USER;
  let res 
  if(eventType === "user.created"){
   res = await create({
      table: "users",
      attrs: {
        name: first_name,
        email,
        role,
        phone: public_metadata?.phone,
        location: public_metadata?.location,
        shedule: public_metadata?.shedule,
        rating: public_metadata?.rating,
      },
    });

  } else {
    res = await update({
      table: "users",
      attrs: {
        name: first_name,
        email,
        role,
        phone: public_metadata?.phone,
        location: public_metadata?.location,
        shedule: public_metadata?.shedule,
        rating: public_metadata?.rating,
      },
    });
  }



  if (!res || !res?.lastInsertRowid) {
    await clerkClient.users.deleteUser(id);
    return NextResponse.json({ msg: "upsert failed" }, { status: 400 });
  }

  return NextResponse.json({ msg: "created" }, { status: 200 });
}
