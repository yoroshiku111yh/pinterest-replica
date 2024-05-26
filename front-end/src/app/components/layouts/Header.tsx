"use client";

import Image from "next/image";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import LoginPopup from "../popup/Login";
import RegisterPopup from "../popup/Register";
import { TokenPayload } from "@/app/utility/type";
import { ENV } from "@/app/utility/global-variable";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { localStorageFn } from "@/app/utility/axios";
import { logoutApi } from "@/app/utility/axios/api.auth";

export default function Header() {
  const [popupRegister, setPopupRegister] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);
  const { decode, setToken, token } = useTokenDecode();
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

  const clickLogout = () => {
    logoutApi();
  }

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
        {decode && (
          <>
            <>
              <div className="hs-dropdown relative inline-flex">
                <button
                  id="hs-dropdown-custom-trigger"
                  type="button"
                  className="hs-dropdown-toggle w-12 block aspect-square rounded-full overflow-hidden bg-zinc-700"
                >
                  {decode.avatar && (
                    <Image
                      className="fit-cover"
                      src={`${ENV.BASE_URL}/${decode.avatar}`}
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                  )}
                  <span className="text-gray-600 font-medium truncate max-w-[7.5rem]">
                    Maria
                  </span>
                  <svg
                    className="hs-dropdown-open:rotate-180 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2"
                  aria-labelledby="hs-dropdown-custom-trigger"
                >
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    href={`/user/${decode.id}`}
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={clickLogout}
                    className=" text-red-600 flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                    href="#"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </>
          </>
        )}
        {!token && (
          <>
            <div
              className="btn-border-style bg-red-700 text-white cursor-pointer"
              onClick={clickOpenPopupLogin}
            >
              Đăng nhập
            </div>
            <LoginPopup popup={popupLogin} closePopup={clickClosePopup} />

            <div
              className="btn-border-style bg-blue-700 text-white cursor-pointer"
              onClick={clickOpenPopupRegister}
            >
              Đăng ký
            </div>
            <RegisterPopup popup={popupRegister} closePopup={clickClosePopup} />
          </>
        )}
      </nav>
    </header>
  );
}
