"use client";
import Icon from "@/components/ui/icons/sm";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useFormStatus } from "react-dom";

export default function DeleteBtn() {
  const { pending } = useFormStatus();
  return !pending ? <button className="text-red-500">Eliminar</button> : <Icon icon={faPaperPlane} />;
}
