"use client";

import Link from "next/link";
import { createContext, useRef, useState } from "react";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { ResponseUserType } from "@/app/utility/type";
import InfoUserComponent from "./compose-component/InfoUser";
import SaveButton from "./compose-component/SaveButton";
import InfoImageComponent from "./compose-component/InfoImage";
import ListComment from "./compose-component/ListComment";
import LikesComponent from "./compose-component/LikesComponent";
import BlockInputComment from "./compose-component/InputComment";
import { ResponseCommentType } from "@/app/utility/axios/api.comment";

interface TypeProps {
  idUser: number;
  idImage: number;
}

interface ContextType {
  idUser: number;
  idImage: number;
  infoUser: ResponseUserType | null;
  setInfoUser: (data: ResponseUserType) => void;
  listComment : ResponseCommentType[] | null,
  setListComment: (data: ResponseCommentType[] | ((prevData: ResponseCommentType[] | null) => ResponseCommentType[])) => void
}

export const ContextImageDetail = createContext<ContextType | null>(null);

////////////////

export default function BlockInfoAndComment(props: TypeProps) {
  const { decode } = useTokenDecode();
  const [infoUser, setInfoUser] = useState<ResponseUserType | null>(null);
  const [listComment, setListComment] = useState<ResponseCommentType[] | null>(null);
  const refWrapper = useRef(null);
  const obj = {
    ...props,
    ...{
      infoUser,
      setInfoUser,
      listComment,
      setListComment
    },
  };
  return (
    <ContextImageDetail.Provider value={obj}>
      <div className="flex flex-col justify-between py-7 w-1/2">
        <div className="flex flex-row justify-between items-center px-4">
          <div className="icon-circle-style shadow-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-row gap-3">
            {decode && <SaveButton></SaveButton>}
            {decode && decode.id === props.idUser && (
              <Link
                href={`/edit/image/${props.idImage}`}
                className="icon-circle-style cursor-pointer shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
        <div
          ref={refWrapper}
          className="pt-10 grow flex flex-col gap-4 overflow-auto px-4 my-3 relative border-t-zinc-300 border-r-0 border-l-0 border-b-zinc-300 border-[1px]"
        >
          <InfoImageComponent></InfoImageComponent>
          <InfoUserComponent></InfoUserComponent>
          <div className="pt-8 pb-6">
            <div className="text-lg font-semibold pb-4">Nhận xét</div>
            <div className="flex flex-col gap-4 pb-6">
              <ListComment refForDetectScroll={refWrapper} />
            </div>
          </div>
        </div>
        <div className="px-4">
          <LikesComponent />
          {decode && <BlockInputComment />}
        </div>
      </div>
    </ContextImageDetail.Provider>
  );
}
