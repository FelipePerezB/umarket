import React, { FC } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Icon from "../icons/sm";
import ReediectToSignInBtn from "@/components/auth/redirect-to-signin";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

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
          <ReediectToSignInBtn
            url={"?modal=post"}
          >
            <div
              className="flex gap-2 px-1.5 py-0.5 items-center border rounded-lg bg-white hover:bg-gray-100 hover:scale-95 cursor-pointer transition-all duration-75"
            >
              <span className="text-sm" title="Publicar producto">
                Publicar
              </span>

            </div>
          </ReediectToSignInBtn>
          <ReediectToSignInBtn url="/profile/products">
            <div
              className="flex justify-center aspect-square overflow-hidden h-2.5 p-3.5 gap-2 items-center border rounded-full bg-white hover:bg-gray-100 hover:scale-95 cursor-pointer transition-all duration-75"
            >
              <span className="text-gray-500">F</span>
            </div>

          </ReediectToSignInBtn>
        </div>
        <SignOutButton/>
        <SignInButton/>
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
