"use client";

import { ResponseDataPicture, getListPicture } from "./utility/axios/api.image";
import MasonryLayout from "./components/MasonryLayout";
import { useDebouncedScroll } from "./utility/hooks/useDebounceScroll";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const handleGetListPicture = async () => {
    try {
      const { totalPage, data } = await getListPicture(page);
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
    handleGetListPicture();
  }, [page]);
  return (
    <>
      {listData && <MasonryLayout listPicture={listData} />}
    </>
  );
}
