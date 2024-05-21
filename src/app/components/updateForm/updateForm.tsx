import Icon from "@/components/ui/icons/sm";
import client from "@/libs/client";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { revalidatePath, revalidateTag } from "next/cache";
import UpdateBtn from "./update-btn";
import DeleteBtn from "../../../components/alerts/delete-btn";
import update from "@/libs/commands/update";
import { redirect } from "next/navigation";
import createProduct from "./create-product";
import FilesInput from "@/components/forms/inputs/images";

export default function UpdateForm({
  type = "create",
  searchParams,
  deafultValues,
}: {
  type?: "create" | "update";
  searchParams: { [key: string]: string };
  deafultValues?: {
    [key: string]: string | number | readonly string[] | undefined;
  };
}) {
  const opt = searchParams?.opt ?? ("products" as "products" | "announcements");
  const optIsProduct = opt === "products";
  const id = searchParams?.id


  const updateUserWithId = createProduct.bind(null, {
    opt, id, method: "post"
  })


  // console.log(defaulV)
  return (
    <form className="flex flex-col gap-2" action={updateUserWithId}>
      <label>
        Titulo
        <input
          defaultValue={deafultValues?.title}
          name="title"
          className="w-full py-1.5 text-gray-600 px-2.5 border shadow-sm focus:outline-blue-500 rounded-md"
        />
      </label>
      {optIsProduct && (
        <label className="flex flex-col">
          Precio
          <input
            defaultValue={deafultValues?.price}
            name="price"
            className="w-44 py-1.5 text-gray-600 px-2.5 border shadow-sm focus:outline-blue-500 rounded-md"
          />
        </label>
      )}
      <label className="flex flex-col">
        Descripción
        <textarea
          defaultValue={deafultValues?.description}
          name="description"
          className="w-full py-1.5 text-gray-600 px-2.5 border shadow-sm focus:outline-blue-500 rounded-md"
        />
      </label>
      {/* <FilesInput defaultValue={deafultValues?.images?.split('-,-')}/> */}
      {type === "update" && searchParams?.id && (
        <DeleteBtn endpoint={`products/${searchParams.id}`} />
      )}
      <button className="flex items-center gap-2 w-max py-1 px-4 bg-black mt-3 text-white rounded-md hover:scale-95 hover:text-gray-200 transition-all duration-75 active:text-gray-400">
        {type === "create" ? "Publicar" : "Actualizar"}
        <UpdateBtn />
      </button>
    </form>
  );
}
