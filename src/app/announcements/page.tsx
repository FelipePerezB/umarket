import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import ExpandableParagraph from "@/components/ui/text/expandable-paragraph";
import Link from "next/link";
import Slider from "../components/slider/slider";

const Announcement = ({
  description,
  title,
  images,
}: {
  images?: string[];
  description: string;
  title: string;
}) => {
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
};

export default async function AnnouncementPage() {
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
      <Options
        currentOption="Anuncios"
        options={[{ opt: "Productos", url: "/" }, { opt: "Anuncios" }]}
      />
      <ItemsGrid className="py-3" size="lg">
        {products?.map(({ images, id }, i) => (
          <Announcement
            key={"product-" + id}
            images={images}
            title="Busco camisa de futbol"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi maiores dolorem deserunt cum eum possimus vero dolore, aperiam, facere nobis provident consequuntur? Aperiam fugit in hic quas quaerat id repudiandae. Similique explicabo repellendus eos iure quis cupiditate, iusto nesciunt provident fugit sunt minima hic magni a aut saepe esse, perspiciatis quia aspernatur facere! Reprehenderit aliquid, perferendis velit eaque officiis labore. Tenetur ab iure praesentium enim, illo mollitia saepe non exercitationem inventore ullam neque"
          />
        ))}
        <Announcement
          title="Busco entrada para concierto no se cuanto"
          description="ratione nobis praesentium deleniti optio commodi molestiae beatae laudantium?
Excepturi nulla quas sint ut ratione at perspiciatis porro laborum doloremque corrupti provident in ipsum aliquid, cum aperiam molestiae eius autem molestias doloribus incidunt? Dolore tempora natus optio minima cumque!
Ea fugit odio, laborum distinctio at, quod assumenda sunt corporis aperiam modi repellendus quisquam nulla qui? Facilis at, aliquid nesciunt minus repellendus cum dolorum non illum aspernatur aut nisi repellat.
Sequi, esse! Quos, similique fuga minima, incidunt nulla distinctio sed laborum autem doloribus recusandae, eum velit quod dolores! Corrupti esse, laborum minima dicta molestiae eveniet cupiditate recusandae maxime ipsum explicabo."
        />
        <Announcement
          title="Unete a nuestro equipo!"
          description="veniam voluptates ipsa possimus reiciendis! Ab, similique. Enim assumenda quos qui?
Omnis ratione cupiditate qui dolorum! Eum, veritatis nisi saepe id sequi ea nihil veniam dolorum quae odio quisquam atque minus exercitationem dolores sit. Necessitatibus delectus eligendi dicta voluptatibus saepe maiores!
Necessitatibus voluptates odit neque ipsa. Modi natus impedit est ut eum pariatur laudantium minus repudiandae, eaque cumque, quaerat tempora quos autem ab laborum aliquid velit adipisci recusandae rerum incidunt odio.
At pariatur accusamus maxime eligendi eaque vitae magni placeat omnis, ab odio quasi quibusdam atque quis alias facere nulla asperiores nobis doloribus culpa eius in. Ducimus minus accusantium eius. Aperiam.
Repellat, facilis ratione vero cumque aliquam labore eius neque aspernatur animi, recusandae fugiat cum quisquam quos nihil quasi esse officiis, tenetur praesentium. Nesciunt dicta ad distinctio officia ipsam laborum dignissimos.
Tenetur aliquid repudiandae incidunt, cum ipsum, ipsam natus eum dolorum hic libero tempore vel corrupti, fuga laborum minima alias soluta neque cupiditate porro placeat. Qui porro similique odio. Eligendi, saepe.
Odio porro tempore commodi fuga itaque sapiente consectetur omnis? At enim repellat delectus nesciunt fugiat illo ut atque id, corrupti necessitatibus ratione nobis praesentium deleniti optio commodi molestiae beatae laudantium?
Excepturi nulla quas sint ut ratione at perspiciatis porro laborum doloremque corrupti provident in ipsum aliquid, cum aperiam molestiae eius autem molestias doloribus incidunt? Dolore tempora natus optio minima cumque!
Ea fugit odio, laborum distinctio at, quod assumenda sunt corporis aperiam modi repellendus quisquam nulla qui? Facilis at, aliquid nesciunt minus repellendus cum dolorum non illum aspernatur aut nisi repellat."
        />
      </ItemsGrid>
    </>
  );
}
