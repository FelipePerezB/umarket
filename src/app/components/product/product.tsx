import Link from "next/link";

export default function Product({ id, title, price, thumbnail, images }:{
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
}) {
  return (
    <div className="flex w-full min-w-36 max-w-60 flex-col justify-center items-left gap-2 hover:bg-gray-50/80 group cursor-pointer px-3 pb-1.5 pt-2.5 rounded-md">
      <div className="w-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer">
        <div className="w-3/5 h-3/5 relative">
          <Link href={`?id=${id}&img=3`}>
            <img
              className={` absolute object-cover rotate-6 group-hover:rotate-12 duration-200 transition-transform group-hover:scale-[90%] scale-[80%] translate-x-[24px] group-hover:translate-x-8 overflow-hidden rounded-md aspect-square object-center  inline-block drop-shadow-lg`}
              src={images[2]}
            />
          </Link>
          <Link href={`?id=${id}&img=2`}>
            <img
              className={` absolute object-cover -rotate-6 group-hover:-rotate-12 duration-200 transition-transform group-hover:scale-[90%] scale-[80%] -translate-x-[24px] group-hover:-translate-x-8 overflow-hidden rounded-md aspect-square object-center  inline-block drop-shadow-lg`}
              src={images[1]}
            />
          </Link>
          <Link href={`${id}`}>
            <img
              className={`object-cover absolute overflow-hidden rounded-md aspect-square object-center  inline-block drop-shadow-lg group-hover:scale-105 transition-transform duration-150`}
              src={images[0] ?? thumbnail}
            />
          </Link>
        </div>
      </div>
      <div>
        <h3
          title={title}
          className="text-ellipsis overflow-hidden whitespace-nowrap max-w-24"
        >
          {title}
        </h3>
        <span className="text-sm font-extralight">${price}</span>
      </div>
    </div>
  );
}
