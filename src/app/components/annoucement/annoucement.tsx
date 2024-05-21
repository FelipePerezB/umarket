import ExpandableParagraph from "@/components/ui/text/expandable-paragraph";
import Link from "next/link";
import Slider from "../slider/slider";

export default function Announcement({
  description,
  title,
  images,
}: {
  images?: string[];
  description: string | number;
  title: string | number;
}) {
  return (
    <article className="flex h-max flex-col gap-2 shadow-sm border rounded-md p-2 transition-all duration-150">
      <div>
        <h3 className="font-semibold text-xl text-ellipsis overflow-hidden whitespace-nowrap max-w-[100%]">
          {title}
        </h3>
        <Link
          href={""}
          className="text-sm font hover:text-blue-500 transition-colors duration-150"
        >
          Contactar
        </Link>
      </div>
      <ExpandableParagraph>
        {
          <>
            <p>{description}</p>
            <div className="max-w-[80%] mx-auto mt-4">
              <Slider slides={images?.map((url) => ({ url, alt: "" })) ?? []} />
            </div>
          </>
        }
      </ExpandableParagraph>
    </article>
  );
}
