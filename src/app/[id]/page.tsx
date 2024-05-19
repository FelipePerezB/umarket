import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../components/product/product";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Slider from "../components/slider/slider";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const url = "https://dummyjson.com/products/" + id;
  const result = await fetch(url);
  const product = (await result.json()) as {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    images: string[];
    description: string;
  };

  const urlProducts = "https://dummyjson.com/products";
  const res = await fetch(urlProducts);
  const data = (await res.json()) as {
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
      <article className="flex flex-col gap-5 justify-center max-w-xl w-full mx-auto">
        <Slider
          slides={product.images?.map((image) => ({ url: image, alt: "A" }))}
        />
        <section>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">
              {product.title}
            </h1>
          </div>
          <span className="text-xl font-extralight">${product.price} c/u</span>
        </section>
        <section className="flex flex-col gap-2.5">
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Ubicación</h2>
              <span className="font-light text-sm">Sala P-201, FEN</span>
            </div>
            <div className="flex flex-col last:items-center">
              <h2 className="font-semibold">Horario</h2>
              <span className="font-light text-sm">08:00 - 14:00</span>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Correo Electrónico</h2>
              <span className="font-light text-sm">fperezbe@fen.uchile.cl</span>
            </div>
            <div className="flex flex-col last:items-center">
              <h2 className="font-semibold">Calificación</h2>
              <span className="font-light text-sm">5.4 / 10 ☆</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-lg">Descripción</h2>
          <p className="indent-4 font-light">{product.description}</p>
        </section>
        <section className="overflow-x-hidden w-full">
          <h2 className="font-semibold text-lg">
            Otros productos de Felipe Pérez
          </h2>
          <div className="flex gap-5 overflow-x-auto w-full py-2">
            {products?.map((product) => (
              <Product key={"product-" + product.id} {...{ ...product }} />
            ))}
          </div>
        </section>
      </article>
      <Link href={"https://wa.me/56975804356"}>
        <FontAwesomeIcon
          icon={faWhatsapp}
          className="w-8 h-8 p-3 cursor-pointer rounded-full fixed bottom-10 right-10 bg-green-500 text-white hover:scale-95 hover:bg-green-600 transition-all duration-100"
        />
      </Link>
    </>
  );
}
