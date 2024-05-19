import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import Product from "../components/product/product";
import Icon from "@/components/ui/icons/sm";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SearchModal from "@/components/ui/modal/search-modal";
import UpdateForm from "../components/updateForm/updateForm";

export default async function ProfilePage({
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
  const selectedProduct = products?.find(
    (product) => product.id === Number(searchParams?.id)
  );

  return (
    <>
      <SearchModal
        searchParams={searchParams}
        id="post"
        title={`Actualizar ${opt === "product" ? "producto" : "anuncio"}`}
        closeWithBlur={false}
      >
        {/* <Options
          currentOption={opt}
          options={[
            { opt: "Producto", id: "product", url: "?modal=post&opt=product" },
            {
              opt: "Anuncio",
              id: "announcement",
              url: "?modal=post&opt=announcement",
            },
          ]}
        /> */}
        {/* AA */}
        <UpdateForm
          type="update"
          deafultValues={{ ...selectedProduct }}
          searchParams={searchParams}
        />
      </SearchModal>
      <section>
        <div>
          <div className="w-5 h-5 rounded-full">IMG</div>
          <div className="">Nombre Apellido</div>
          <div className="">Contacto: email o whatsapp</div>
          <div className="">Ubicación: </div>
          <div className="">Mas opciones </div>
          <div className="">Estrellas? </div>
        </div>
      </section>
      <section>
        <Options
          currentOption="Mis Productos"
          options={[{ opt: "Mis Productos", url: "" }, { opt: "Mis Anuncios" }]}
        />
        <ItemsGrid className="pt-5">
          {products?.map((product, i) => (
            <div className="relative group">
              <Link
                href={`?modal=post&opt=product&id=${product?.id}`}
                className="absolute top-5 right-5 p-2 z-30 bg-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-200"
              >
                <Icon icon={faPen} />
              </Link>
              <Product {...{ ...product }} />
            </div>
          ))}
        </ItemsGrid>
      </section>
    </>
  );
}
