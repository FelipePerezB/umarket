import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React, { ReactNode } from 'react'

export default function ContactBtn({children}:{children: ReactNode}) {
  const { sessionClaims } = auth();
  const authorizedRoles = ["admin", "moderator", "authorized"];
  const isAuthorized =  authorizedRoles.includes(sessionClaims?.metadata?.role ?? "user");

  return (
    <Link href={!isAuthorized ? "/signin" : "https://wa.me/56975804356"}>
      {children}
    </Link>
  )
}
