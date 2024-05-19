import ItemsGrid from "@/components/containers/items-grid";
import Product from "../product/product";

export default async function Products() {
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

  return (
    <>
      <ItemsGrid>
        {products?.map((product, i) => {
          return <Product key={"product-" + product.id} {...{ ...product }} />;
        })}
      </ItemsGrid>
    </>
  );
}
