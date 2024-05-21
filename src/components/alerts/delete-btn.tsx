"use client";
import React from "react";
import toast from "react-hot-toast";
import Alert from "./alert";
import { deleteMessages } from "./messages/alert-messages";
import api from "@/libs/api";
import Button from "../forms/btn";

export default function DeleteBtn({
  label,
  name,
  endpoint,
  size = "sm",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  name?: string;
  endpoint: string;
  tags?: string[];
}) {
  const isSm = size === "sm";
  // const router = useRouter();

  const deleteHandler = () => {
    toast((t) => (
      <Alert
        color="red"
        name="Eliminar"
        t={t}
        message={`¿Estas seguro de querer ${
          name ? `eliminar "${name}"` : "eliminarlo"
        }?`}
        callback={() => {
          toast.promise(api(endpoint, { method: "DELETE" }), deleteMessages);
        }}
      />
    ));
  };

  return (
    <Button
      onClick={deleteHandler}
      color={ "red"}
      // color={isSm ? `transparent` : "red"}
      size={"sm" }
      // size={isSm ? "xs" : "sm"}
      title="Eliminar"
      key={"delete-btn"}
    >
      {!!label && label}
      Eliminar
      {/* {isSm ? (
        <FontAwesomeIcon
          className={`h-3.5 w-3.5 ${isSm && "hover:text-red-500"}`}
          icon={faXmark}
        />
      ) : (
        "Eliminar"
      )} */}
    </Button>
  );
}
