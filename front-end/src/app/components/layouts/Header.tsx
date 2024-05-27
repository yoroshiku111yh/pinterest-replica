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
  };

  return (
    <>
      <header className="w-full px-4 py-2 fixed bg-white shadow-sm z-50">
        <nav className="flex flex-row md:gap-3 gap-2 justify-center items-center">
          <Link
            href="/"
            className="w-12 aspect-square rounded-full overflow-hidden md:block hidden"
          >
            <Image
              src="/images/logo.svg"
              alt="logo"
              id="logo"
              width={48}
              height={48}
            />
          </Link>
          <Link
            href="/"
            className="btn-border-style bg-black text-white md:block hidden"
          >
            Home
          </Link>
          <Link href="/upload" className="btn-border-style md:block hidden">
            Upload
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
              <div className="hs-dropdown relative inline-flex md:block hidden">
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
                    username
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
          )}
          {!token && (
            <>
              <div
                className="btn-border-style bg-red-700 text-white cursor-pointer md:block hidden"
                onClick={clickOpenPopupLogin}
              >
                Login
              </div>
              <LoginPopup popup={popupLogin} closePopup={clickClosePopup} />

              <div
                className="btn-border-style bg-blue-700 text-white cursor-pointer md:block hidden"
                onClick={clickOpenPopupRegister}
              >
                Register
              </div>
              <RegisterPopup
                popup={popupRegister}
                closePopup={clickClosePopup}
              />
            </>
          )}
        </nav>
      </header>
      <div className="mb-header md:hidden block fixed bottom-0 w-full px-4 py-3 fixed bg-white shadow-sm z-50">
        <nav className=" flex flex-row justify-between gap-2 px-6">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>
          <Link href="/upload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          {!token && (
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-custom-icon-trigger"
                type="button"
                className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="flex-none size-4 text-gray-600"
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
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2"
                aria-labelledby="hs-dropdown-custom-icon-trigger"
              >
                <div
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                  onClick={clickOpenPopupLogin}
                >
                  Login
                </div>
                <div
                  className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                  onClick={clickOpenPopupRegister}
                >
                  Register
                </div>
              </div>
            </div>
          )}
          {decode && (
            <>
              <div className="hs-dropdown relative inline-flex">
                <button
                  id="hs-dropdown-custom-trigger"
                  type="button"
                  className="hs-dropdown-toggle w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700"
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
                    username
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
          )}
        </nav>
      </div>
    </>
  );
}
