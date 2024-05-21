"use client";
import Icon from "@/components/ui/icons/sm";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useFormStatus } from "react-dom";

export default function UpdateBtn() {
  const { pending } = useFormStatus();
  return pending ? <span>p</span> : <Icon icon={faPaperPlane} />;
}
