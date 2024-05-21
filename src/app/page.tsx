import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import Product from "./components/product/product";
import SearchModal from "@/components/ui/modal/search-modal";
import api from "@/libs/api";
import UpdateForm from "./components/updateForm/updateForm";
import client from "@/libs/client";
import getImageUrl from "@/libs/getImgUrl";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const opt = searchParams?.opt ?? ("product" as "product" | "announcement");
  const { data: res } = await api("products", { cache: "no-store" }, ["products"]);
  console.log(res)
  const rows = res as unknown as { ID: number, title: string, "author_id": number, price: number, images: string }[]

  return (
    <>
      <SearchModal
        searchParams={searchParams}
        id="post"
        title="Publicar producto"
        closeWithBlur={false}
      >
        <Options
          currentOption={opt}
          options={[
            { opt: "Producto", id: "product", url: "?modal=post&opt=product" },
            {
              opt: "Anuncio",
              id: "announcement",
              url: "?modal=post&opt=announcement",
            },
          ]}
        />
        <UpdateForm searchParams={searchParams} />
      </SearchModal>
      <Options
        currentOption="Productos"
        options={[
          { opt: "Productos" },
          { opt: "Anuncios", url: "announcements" },
        ]}
      />
      <ItemsGrid>
        {rows?.map(({ ID, title, author_id, price, images }, i) => (
          <Product
            key={ID}
            id={ID} 
            title={title} 
            price={price}
            images={images?.split(',')?.map(getImageUrl)}
          />
        ))}
      </ItemsGrid>
    </>
  );
}
