import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import Icon from "@/components/ui/icons/sm";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SearchModal from "@/components/ui/modal/search-modal";
import UpdateForm from "@/app/components/updateForm/updateForm";
import Product from "@/app/components/product/product";
import api from "@/libs/api";
import EditItem from "../components/edit-item";
import getImageUrl from "@/libs/getImgUrl";

export default async function ProfilePage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const opt = searchParams?.opt ?? ("products" as "products" | "announcements");

  const { data: res } = await api("products", { cache: "no-store" }, ["products"]);
  const rows = res as unknown as { "product_id": number, title: string, "author_id": number, price: number, images: string }[];
  const selectedProduct = rows?.find(({ product_id }) => product_id === Number(searchParams?.id))
  console.log(rows)


  return (
    <>
      <SearchModal
        searchParams={searchParams}
        id="update"
        title={`Actualizar ${opt === "products" ? "producto" : "anuncio"}`}
        closeWithBlur={false}
      >

        <UpdateForm
          type="update"
          deafultValues={{ ...selectedProduct }}
          searchParams={searchParams}
        />
      </SearchModal>

      <section>
        <Options
          currentOption="Mis Productos"
          options={[
            { opt: "Mis Productos" },
            { opt: "Mis Anuncios", url: "announcements" },
          ]}
        />
        <ItemsGrid className="pt-5">
          {rows?.map(({ product_id, title, author_id, price, images }, i) => (
            <div key={"product-" + product_id} className="relative group">
              <EditItem id={product_id} opt={"products"} />
              <Product
                key={product_id}
                id={product_id}
                title={title}
                price={price}
                images={images?.split(',')?.map(getImageUrl)}
              />
            </div>
          ))}
        </ItemsGrid>
      </section>
    </>
  );
}
