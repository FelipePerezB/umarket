"use server";

import client from "@/libs/client";
import create from "@/libs/commands/create";
import update from "@/libs/commands/update";
import { Dropbox } from "dropbox";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProduct(
  {
    opt,
    id,
    method,
  }: { opt: string; id: number | string; method: "update" | "post" },
  formData: FormData
) {
  // base64 files
  const files = (formData.getAll("files")[0] as string).split("-,-");
  // const imagesIds: number[] = []

  // const image = await client.execute("SELECT * FROM images WHERE id = 1")
  console.log(files);

  const optIsProduct = opt === "products";
  const inputsNames = optIsProduct
    ? ["title", "price", "description"]
    : ["title", "description"];
  const attrs = Object.fromEntries(
    inputsNames.map((name) => [name, formData.get(name)])
  );

  let res;

  if (optIsProduct) {
    res =
      method === "post"
        ? await create({
            table: opt,
            attrs: { ...attrs, active: 1, author_id: 1 },
          })
        : await update({ table: opt, attrs: { id, ...attrs } });
    revalidateTag("products");
  } else {
    res =
      method === "post"
        ? await create({
            table: opt,
            attrs: { ...attrs, active: 1, author_id: 1 },
          })
        : await update({ table: opt, attrs: { id, ...attrs } });
    revalidateTag("announcements");
  }

  const resId = res?.lastInsertRowid;

  if (resId) {
    files.forEach(async (file) => {
      const imageRes = await create({
        table: "images",
        attrs: { image: file },
      });
      if (imageRes.lastInsertRowid) {
        await create({
          table: `product_images`,
          attrs: { product_id: resId, image_id: imageRes.lastInsertRowid },
        });
      }
    });
  }

  redirect("?");
}
