import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "../components/product/product";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Slider from "../components/slider/slider";
import { RedirectToSignIn, SignedIn } from "@clerk/nextjs";
import ContactBtn from "./contact-btn";
import ReediectToSignInBtn from "@/components/auth/redirect-to-signin";
import client from "@/libs/client";
import getImageUrl from "@/libs/getImgUrl";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {

  console.log(Number(id))
  const res = await client.execute(`SELECT
  p.id,
  p.title,
  p.author_id,
  p.description,
  p.price,
  GROUP_CONCAT(PI.image_id) AS images
FROM
  products p
LEFT JOIN product_images PI ON p.id = PI.product_id
  WHERE p.id = ${Number(id)}
GROUP BY
  p.id;`)


  const product = res?.rows[0] as unknown as { ID: number, title: string, "author_id": number, price: number, images: string, description: string };
  console.log(product)
  const recomendationsRes = await client.execute(`SELECT
  p.id,
  p.title,
  p.author_id,
  p.price,
  GROUP_CONCAT(PI.image_id) AS images
FROM
  products p
FULL JOIN product_images PI ON p.id = PI.product_id
WHERE
  p.author_id = ${product?.author_id ?? 0}
GROUP BY
  p.id`)
  const recomendations = recomendationsRes?.rows as unknown as { ID: number, title: string, "author_id": number, price: number, images: string }[];
  const userRes = await client.execute(`SELECT
  u.email,
  u.phone,
  u.location,
  u.rating,
  u.schedule
FROM
  users u
WHERE
  u.id = ${product?.author_id ?? 0};
  `)

  console.log(userRes)
  // const recomendations = recomendationsRes?.rows as unknown as { ID: number, title: string, "author_id": number, price: number, images: string }[];

  const user = userRes.rows[0] as unknown as { email: string, phone: string, location: string, rating: number, schedule: string }


  return (
    <>
      <article className="flex flex-col gap-5 justify-center max-w-xl w-full mx-auto">
        <Slider
          slides={product?.images?.split(',')?.map((image) => ({ url: getImageUrl(image), alt: "A" }))}
        />
        <section>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">
              {product?.title}
            </h1>
          </div>
          <span className="text-xl font-extralight">${product?.price} c/u</span>
        </section>
        <section className="flex flex-col gap-2.5">
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Ubicación</h2>
              <span className="font-light text-sm">{user?.location}</span>
            </div>
            <div className="flex flex-col last:items-center">
              <h2 className="font-semibold">Horario</h2>
              <span className="font-light text-sm">{user?.schedule}</span>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Correo Electrónico</h2>
              <span className="font-light text-sm">{user?.email}</span>
            </div>
            <div className="flex flex-col last:items-center">
              <h2 className="font-semibold">Calificación</h2>
              <span className="font-light text-sm">{user?.rating} / 10 ☆</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-lg">Descripción</h2>
          <p className="indent-4 font-light">{product?.description}</p>
        </section>
        <section className="overflow-x-hidden w-full">
          <h2 className="font-semibold text-lg">
            Otros productos de Felipe Pérez
          </h2>
          <div className="flex gap-5 overflow-x-auto w-full py-2">
            {recomendations?.map(({ ID, author_id, images, price, title }) => (
              <Product key={"product-" + product?.ID} id={ID} images={images?.split(',')?.map(getImageUrl)} price={price} title={title} />
            ))}
          </div>
        </section>
      </article>
      {user?.phone &&
        <ReediectToSignInBtn url={`https://wa.me/${user?.phone}`}>
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="w-8 h-8 p-3 cursor-pointer rounded-full fixed bottom-10 right-10 bg-green-500 text-white hover:scale-95 hover:bg-green-600 transition-all duration-100"
          />
        </ReediectToSignInBtn>
      }
    </>
  );
}
