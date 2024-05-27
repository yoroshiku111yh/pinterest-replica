"use client";

import MasonryLayout from "@/app/components/MasonryLayout";
import { CatesTypeReponse, getImagesByCateId } from "@/app/utility/axios/api.cates";
import { ResponseDataPicture } from "@/app/utility/axios/api.image";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { idCate: string } }) {
  const idCate = Number(params.idCate);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const [cateData, setCate] = useState< CatesTypeReponse | null>(null);
  const handleGetListPicture = async () => {
    try {
      const { totalPage, data, cate } = await getImagesByCateId(idCate, page);
      setMaxPage(totalPage);
      setCate(cate);
      setListData((prevData) => {
        if (prevData) {
          return [...prevData, ...data];
        } else {
          return data;
        }
      });

      window.document.title = `Category : ${cate.name}`;
    } catch (err: any) {
      if (err.statusCode == 404) {
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
  return (
    <>
      {(listData && listData.length > 0) ? (
        <>
          <h3 className="md:text-3xl text-2xl text-center uppercase font-bold pb-4">{cateData && cateData.name}</h3>
          <p>{cateData && cateData.description}</p>
          <MasonryLayout listPicture={listData} />
        </>
      ) : (
        <div className="justify-center items-center flex flex-col gap-3 w-screen h-[80vh] max-w-full">
          <p className="text-2xl text-center">
            Category don't have any picture :'(
          </p>
        </div>
      )}
    </>
  );
}
