import styles from "./modal.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode } from "react";
import Blur from "./blur";

export default function Modal({
  closeWithBlur=true,
  title,
  children,
  CloseWrapper,
  show,
}: {
  closeWithBlur?: boolean;
  children: ReactNode;
  title: string;
  show: boolean;
  CloseWrapper: React.FC<{ children: ReactNode }>;
}) {
  return (
    <>
      <div
        autoFocus
        className={`top-0 left-0 h-full fixed flex justify-center items-center z-40 rounded-md `}
      >
        <Blur CloseWrapper={closeWithBlur ? CloseWrapper : ({children})=> <>{children}</>} show={show} />
        <dialog
          open={show}
          className={`${
            !show ? styles.hide : "animate-show-modal"
          }  z-50 fixed justify-center items-center w-[calc(100vw-40px)] max-w-md h-max print:hidden p-4 rounded-md`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <CloseWrapper>
              <FontAwesomeIcon
                className="h-5 w-5 cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-200"
                icon={faClose}
              />
            </CloseWrapper>
          </div>
          <hr className="my-2.5" />
          <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden max-h-96 p-1">
            {children}
          </div>
        </dialog>
      </div>
    </>
  );
}
