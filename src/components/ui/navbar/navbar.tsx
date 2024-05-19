import React, { FC } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Icon from "../icons/sm";

export default function Nabvar() {
  return (
    <header className="print:hidden w-full">
      <nav className="py-4 px-6 w-full z-40 fixed top-0 flex justify-between items-center gap-4">
        <Link href={"/"} className="flex items-center gap-1">
          <div className="bg-blue-500 font-bold flex justify-center items-center text-white h-6 w-6 rounded-sm">
            <span>U</span>
          </div>
          <span className="font-bold text-xl">MARKET</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={"?modal=post"}
            className="flex gap-2 px-1.5 py-0.5 items-center border rounded-lg bg-white hover:bg-gray-100 hover:scale-95 cursor-pointer transition-all duration-75"
          >
            <span className="text-sm" title="Publicar producto">
              Publicar
            </span>
          </Link>
          <Link
            href={"/profile"}
            className="flex justify-center aspect-square h-2.5 p-3.5 gap-2 items-center border rounded-full bg-white hover:bg-gray-100 hover:scale-95 cursor-pointer transition-all duration-75"
          >
            {/* <div className="h-3 w-r bg-red-300 flex justify-center items-center"> */}
            <span className="text-gray-500">F</span>
            {/* </div> */}
          </Link>
        </div>
      </nav>
      <div
        className={
          styles.gradient +
          " backdrop-blur-lg z-30 from-white to-transparent left-0 w-full h-20 fixed top-0  "
        }
      ></div>
      <div className="h-14 m-0.5 w-full"></div>
    </header>
  );
}
