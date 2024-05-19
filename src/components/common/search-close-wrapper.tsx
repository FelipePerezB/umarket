import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function SearchCloseWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <Link href={'?'}>{children}</Link>;
}
