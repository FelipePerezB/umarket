import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React, { ReactNode } from 'react'

export default function ReediectToSignInBtn({ children, url }: { children: ReactNode, url: string }) {
  const { sessionClaims } = auth();
  const authorizedRoles = ["admin", "moderator", "authorized"];
  const isAuthorized = authorizedRoles.includes(sessionClaims?.metadata?.role ?? "user");

  return (
    <Link href={!isAuthorized ? "/signin" : url}>
      {children}
    </Link>
  )
}
