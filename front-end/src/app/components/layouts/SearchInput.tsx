"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function SearchInput() {
  const [search, setSearch] = useState<string>("");
  const [popup, setPopup] = useState<boolean>(false);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setPopup(false);
    document.body.style.overflow = "";
  };
  const handleClickInside = () => {
    setPopup(true);
    document.body.style.overflow = "hidden";
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <div ref={ref}>
        <input
          id="search-input"
          className="w-full "
          type="text"
          placeholder="Tìm kiếm..."
          onFocus={handleClickInside}
        />
        {popup && (
          <>
            <div className="max-h-[400px] overflow-auto absolute top-16 z-40 left-0 right-0 w-full bg-white rounded-lg shadow-md px-4 py-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h6 className="text-lg font-semibold">keyword tìm kiếm :</h6>
                  <Link href="/dsad">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h6 className="text-lg font-semibold">
                    Thể loại (nếu có ) :
                  </h6>
                  <Link href="/">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                  <Link href="/">Keyword thứ 1</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {popup && (
        <div className="fixed top-16 left-0 w-full h-full z-10 bg-black/30"></div>
      )}
    </>
  );
}
