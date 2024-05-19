import SearchCloseWrapper from "../../common/search-close-wrapper";
import Modal from "./modal";
import { ReactNode } from "react";

export default function SearchModal({
  closeWithBlur,
  title,
  sidebarKey = "modal",
  id,
  searchParams,
  children,
}: {
  closeWithBlur?: boolean;
  title: string;
  children: ReactNode;
  sidebarKey?: string;
  searchParams: { [key: string]: string };
  id: string;
}) {
  const sidebarId = searchParams[sidebarKey];
  const show = sidebarId === id;
  return (
    <Modal
    closeWithBlur={closeWithBlur}
      show={show}
      title={title}
      CloseWrapper={({ children }) => (
        <SearchCloseWrapper>{children}</SearchCloseWrapper>
      )}
    >
      {children}
    </Modal>
  );
}
