"use client";

import { useEffect, useState } from "react";
import {
  ResponseDataPicture,
  getListPicture,
} from "../utility/axios/api.image";
import { useDebouncedScroll } from "../utility/hooks/useDebounceScroll";
import MasonryLayout from "../components/MasonryLayout";
import { useSearchParams } from "next/navigation";
import { searchListImageByName } from "../utility/axios/api.search";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("keyword");
  const handleGetListPicture = async () => {
    if (search) {
      try {
        const { totalPage, data } = await searchListImageByName(search, page);
        setMaxPage(totalPage);
        setListData((prevData) => {
          if (prevData) {
            return [...prevData, ...data];
          } else {
            return data;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useDebouncedScroll({
    callback: () => {
      if (maxPage > page) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    element: null,
  });
  useEffect(() => {
    if (page > 1) {
      handleGetListPicture();
    }
  }, [page]);
  useEffect(() => {
    setListData(null);
    setPage(1);
    handleGetListPicture();
  }, [search]);
  useEffect(() => {
    window.document.title = "Punterest"
  },[]);
  return (
    <>
      {listData ? (
        <MasonryLayout listPicture={listData} />
      ) : (
        <div className="justify-center items-center flex flex-col gap-3 w-screen h-[80vh] max-w-full">
          <p className="text-2xl text-center">keyword is not found</p>
        </div>
      )}
    </>
  );
}
