import ItemsGrid from "@/components/containers/items-grid";
import Options from "@/components/navigation/options";
import SearchModal from "@/components/ui/modal/search-modal";
import UpdateForm from "../../components/updateForm/updateForm";
import api from "@/libs/api";
import { AnnouncementType } from "@/models/announcement";
import Announcement from "@/app/components/annoucement/annoucement";
import EditItem from "../components/edit-item";
import { ResultSet } from "@libsql/client";
import update from "@/libs/commands/update";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const opt = searchParams?.opt ?? ("product" as "product" | "announcement");

  const { data: res } = (await api("announcements", {}, ["announcements"])) as { data: ResultSet };
  const cols = res?.columns;

  const annoucements = res.rows.map((row) =>
    Object.fromEntries((row as unknown as AnnouncementType).map((cell, i) => [cols[i]?.toLowerCase(), cell]))
  );

  const selectedAnnoucement = annoucements?.find(announcement => announcement.id === Number(searchParams?.id))

  return (
    <>
      <SearchModal
        searchParams={searchParams}
        id="update"
        title={`Actualizar ${opt === "product" ? "producto" : "anuncio"}`}
        closeWithBlur={false}
      >
        <UpdateForm
          type="update"
          deafultValues={{ ...selectedAnnoucement }}
          searchParams={searchParams}
        />
      </SearchModal>

      <section>
        <Options
          currentOption="Mis Anuncios"
          options={[
            { opt: "Mis Productos", url: "products" },
            { opt: "Mis Anuncios" },
          ]}
        />
        <ItemsGrid className="py-8" size="lg">
          {annoucements?.map(({ id, title, description }, i) => (
            <div key={"announcement-" + id} className="relative">
              <EditItem id={id} opt={"announcements"} />
              <Announcement title={title} description={description} />
            </div>
          ))}
        </ItemsGrid>
      </section>
    </>
  );
}
