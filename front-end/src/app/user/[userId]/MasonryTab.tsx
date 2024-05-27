"use client";

import MasonryLayout from "@/app/components/MasonryLayout";
import {
  ResponseDataPicture,
  ResponseGetPictures,
} from "@/app/utility/axios/api.image";
import {
  getImagesCreatedByUserId,
  getImagesSavedByUserId,
} from "@/app/utility/axios/api.user";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { useEffect, useState } from "react";

enum TypeTab {
  CREATED = "CREATED",
  SAVED = "SAVED",
}

export default function MasonryTab({ idUser }: { idUser: number }) {
  const [tab, setTab] = useState<TypeTab>(TypeTab.SAVED);
  const [isVisitGuest, setIsVisitGuest] = useState<boolean>(false);
  const {decode} = useTokenDecode();
  useEffect(() => {
    if (decode) {
      if(decode.id !== idUser){
        setIsVisitGuest(true);
      }
    }
  }, [decode]);
  return (
    <>
      <div className="flex flex-row gap-7 [&>span]:text-base [&>span]:font-semibold">
        <span
          onClick={() => {
            tab !== TypeTab.CREATED && setTab(TypeTab.CREATED);
          }}
          className={
            tab === TypeTab.CREATED
              ? "text-red-600 cursor-pointer"
              : "cursor-pointer"
          }
        >
          Created
        </span>
        <span
          onClick={() => {
            tab !== TypeTab.SAVED && setTab(TypeTab.SAVED);
          }}
          className={
            tab === TypeTab.SAVED
              ? "text-red-600 cursor-pointer"
              : "cursor-pointer"
          }
        >
          Saved
        </span>
      </div>
      <div className="pt-10">
        {tab === TypeTab.SAVED && (
          <MasonryListPicture
            idUser={idUser}
            isVisitGuest={isVisitGuest}
            promiseCall={getImagesSavedByUserId}
          />
        )}
        {tab === TypeTab.CREATED && (
          <MasonryListPicture
            idUser={idUser}
            isVisitGuest={isVisitGuest}
            promiseCall={getImagesCreatedByUserId}
          />
        )}
      </div>
    </>
  );
}

type PromiselFntype = (
  idUser: number,
  page: number
) => Promise<ResponseGetPictures>;

const MasonryListPicture = ({
  idUser,
  isVisitGuest,
  promiseCall,
}: {
  idUser: number;
  isVisitGuest ?: boolean,
  promiseCall: PromiselFntype;
}) => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseDataPicture[] | null>(null);
  const handleGetListPictureSaved = async () => {
    try {
      const { data, totalPage, currentPage } = await promiseCall(idUser, page);
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
    handleGetListPictureSaved();
  }, [page]);
  return <>{listData && <MasonryLayout disableInteract={isVisitGuest} listPicture={listData} />}</>;
};
