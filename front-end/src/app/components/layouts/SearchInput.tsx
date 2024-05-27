"use client";

import { CatesTypeReponse } from "@/app/utility/axios/api.cates";
import { ResponseDataPicture } from "@/app/utility/axios/api.image";
import { searchApi } from "@/app/utility/axios/api.search";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function SearchInput() {
  const [search, setSearch] = useState<string>("");
  const [searchedCates, setSearchedCates] = useState<CatesTypeReponse[]>([]);
  const [searchedNameImage, setSearchedNameImage] = useState<
    ResponseDataPicture[]
  >([]);
  const [popup, setPopup] = useState<boolean>(false);
  const ref = useRef(null);
  const debounceSearch = useCallback(
    debounce(async (value: string) => {
      try {
        const { data } = await searchApi(value);
        setSearchedCates(data.category);
        setSearchedNameImage(data.images);
      } catch (err) {
        console.log(err);
      }
    }, 400),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopup(true);
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleClickOutside = () => {
    setPopup(false);
    document.body.style.overflow = "";
  };
  const handleClickInside = () => {
    setPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleClickLink = () => {
    setPopup(false);
    setSearch("");
    document.body.style.overflow = "";
  };
  const router = useRouter();
  const handleNavigateSearch = () => {
    setPopup(false);
    document.body.style.overflow = "";
    router.replace(`/search?keyword=${search}`);
  };
  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <div ref={ref}>
        <form
          onSubmit={(e) => {
            if (search.length > 2) {
              handleNavigateSearch();
            }
            e.preventDefault();
          }}
        >
          <input
            id="search-input"
            className="w-full "
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onFocus={handleClickInside}
            onChange={onChange}
          />
        </form>
        {popup &&
          (searchedNameImage.length > 0 || searchedCates.length > 0) && (
            <>
              <div className="max-h-[400px] overflow-auto absolute top-16 z-40 left-0 right-0 w-full bg-white rounded-lg shadow-md px-4 py-6">
                <div className="flex flex-col gap-6">
                  {searchedNameImage.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <>
                        <h6 className="text-lg font-semibold">
                          Search images :
                        </h6>
                        {searchedNameImage.map((item, index) => (
                          <Link
                            onClick={handleClickLink}
                            href={`/image/${item.id}`}
                            key={index}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </>
                    </div>
                  )}
                  {searchedCates.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <>
                        <h6 className="text-lg font-semibold">
                          Search categories :
                        </h6>
                        {searchedCates.map((item, index) => (
                          <Link
                            onClick={handleClickLink}
                            href={`/category/${item.id}`}
                            key={index}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </>
                    </div>
                  )}
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
