import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import Product from "./components/product/product";
import SearchModal from "@/components/ui/modal/search-modal";
import api from "@/libs/api";
import UpdateForm from "./components/updateForm/updateForm";
import { ProductType } from "@/models/product";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const opt = searchParams?.opt ?? ("product" as "product" | "announcement");

  const url = "https://dummyjson.com/products";
  const result = await fetch(url);
  const data = (await result.json()) as {
    products: {
      id: number;
      title: string;
      price: number;
      thumbnail: string;
      images: string[];
    }[];
  };
  const products = data?.products;

  const { data: res } = await api("products", {
    next: { tags: ["products"] },
    // cache: "no-store"
  });

  const realProducts = res.rows as ProductType[];

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
        {products?.map((product, i) => (
          <Product
            key={product.id}
            {...{
              ...product,
              title: (realProducts[i]?.at(1) as string) ?? products[i].title,
              price: (realProducts[i]?.at(6) as number) ?? products[i].price,
            }}
          />
        ))}
      </ItemsGrid>
    </>
  );
}
