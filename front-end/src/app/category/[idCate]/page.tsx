"use client";

import MasonryLayout from "@/app/components/MasonryLayout";
import { getImagesByCateId } from "@/app/utility/axios/api.cates";
import { ResponseDataPicture } from "@/app/utility/axios/api.image";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { idCate: string } }) {
  const idCate = Number(params.idCate);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const handleGetListPicture = async () => {
    try {
      const { totalPage, data } = await getImagesByCateId(idCate, page);
      setMaxPage(totalPage);
      setListData((prevData) => {
        if (prevData) {
          return [...prevData, ...data];
        } else {
          return data;
        }
      });
    } catch (err : any) {
      if(err.statusCode == 404){
        window.location.href = "/not-found";
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
    handleGetListPicture();
  }, [page]);
  return <>{listData && <MasonryLayout listPicture={listData} />}</>;
}
