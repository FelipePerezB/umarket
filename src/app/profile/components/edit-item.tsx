import Icon from "@/components/ui/icons/sm";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

export default function EditItem({id, opt}:{id?: number | string, opt: string}) {
  return (
    <Link
      href={`?modal=update&opt=${opt}&id=${id}`}
      className="absolute top-4 right-4 aspect-square overflow-hidden flex items-center justify-center p-2.5 z-30 bg-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-200"
    >
      <Icon icon={faPen} />
    </Link>
  );
}
