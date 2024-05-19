import Icon from "@/components/ui/icons/sm";
import client from "@/libs/client";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { revalidatePath, revalidateTag } from "next/cache";
import UpdateBtn from "./delete-btn";

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
  const opt = searchParams?.opt ?? ("product" as "product" | "announcement");
  const optIsProduct = opt === "product";

  const createProduct = async (formData: FormData) => {
    "use server";
    const { title, price, description } = {
      title: formData.get("title"),
      price: formData.get("price"),
      description: formData.get("description"),
    };

    const command = `UPDATE products
    SET price = ${price},
        title = '${title}'
    WHERE
        id = ${searchParams?.id};`;

    if (optIsProduct) {
      const res = await client.execute(command);
      // await client.execute(`INSERT INTO products (title, price, description, active, author_id)
      //   VALUES ('${title}', ${price}, '${description}', 1, 1);
      //   `);
    } else {
      const res =
        await client.execute(`INSERT INTO announcements (title, price, description, active, author_id)
        VALUES ('${title}', ${price}, '${description}', 1, 1);
        `);

      revalidateTag("announcements");
    }
    revalidateTag("products");
    revalidatePath("/");
  };
  return (
    <form className="flex flex-col gap-2" action={createProduct}>
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
      <label>
        Imagenes
        <input type="file" />
      </label>
      <button className="flex items-center gap-2 w-max py-1 px-4 bg-black mt-3 text-white rounded-md hover:scale-95 hover:text-gray-200 transition-all duration-75 active:text-gray-400">
        {type === "create" ? "Publicar" : "Actualizar"}
        <UpdateBtn />
      </button>
    </form>
  );
}
