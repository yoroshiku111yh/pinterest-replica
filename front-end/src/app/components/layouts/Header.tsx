"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useState } from "react";
import LoginPopup from "../popup/Login";
import RegisterPopup from "../popup/Register";

export default function Header() {
  const [popupRegister, setPopupRegister] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);
  const clickClosePopup = () => {
    document.body.style.overflow = "";
    setPopupRegister(false);
    setPopupLogin(false);
  };

  const clickOpenPopupRegister = () => {
    document.body.style.overflow = "hidden";
    setPopupRegister(true);
  };

  const clickOpenPopupLogin = () => {
    document.body.style.overflow = "hidden";
    setPopupLogin(true);
  };
  return (
    <header className="w-full px-4 py-2 fixed bg-white shadow-sm z-50">
      <nav className="flex flex-row gap-3 justify-center items-center">
        <Link
          href="/"
          className="w-12 aspect-square rounded-full overflow-hidden"
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            id="logo"
            width={48}
            height={48}
          />
        </Link>
        <Link href="/" className="btn-border-style bg-black text-white">
          Trang chủ
        </Link>
        <Link href="/upload" className="btn-border-style">
          Tạo
        </Link>
        <div className="grow input-block flex flex-row items-center gap-2 relative">
          <label htmlFor="search-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
        <Link
          href="/user/ddsadsa"
          className="w-12 block aspect-square rounded-full overflow-hidden bg-zinc-700"
        >
          {/* <Image src="/avatar" alt="avatar" width={48} height={48} /> */}
        </Link>
        <div
          className="btn-border-style bg-red-700 text-white cursor-pointer"
          onClick={clickOpenPopupLogin}
        >
          Đăng nhập
        </div>
        <div
          className="btn-border-style bg-blue-700 text-white cursor-pointer"
          onClick={clickOpenPopupRegister}
        >
          Đăng ký
        </div>
        <LoginPopup popup={popupLogin} closePopup={clickClosePopup} />
        <RegisterPopup popup={popupRegister} closePopup={clickClosePopup} />
      </nav>
    </header>
  );
}
