"use client";

import { ResponseDataPicture, getListPicture } from "../../utility/axios/api.image";
import MasonryLayout from "../../components/MasonryLayout";
import { useEffect, useState } from "react";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";

export default function LoadMasonryImages({idImagePage} : {idImagePage ?: number}) {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const handleGetListPicture = async () => {
    try {
      const {totalPage, data} = await getListPicture(page);
      setMaxPage(totalPage);
      setListData(prevData => {
        if(prevData){
          return [...prevData,...data];
        }
        else{
          return data;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useDebouncedScroll({
    callback: () => {
      if(maxPage > page){
        setPage((prevPage) => prevPage + 1);
      }
    },
    element: null,
  });
  useEffect(() => {
    handleGetListPicture();
  }, [page]);
  const filtered = listData?.filter(item => item.id !== idImagePage);
  return <>{filtered && <MasonryLayout listPicture={filtered} />}</>;
}
