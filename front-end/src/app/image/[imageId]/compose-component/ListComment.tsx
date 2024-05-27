import { MutableRefObject, useContext, useEffect, useState } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import {
  ResponseCommentType,
  getCommentByIdImage,
} from "@/app/utility/axios/api.comment";
import Link from "next/link";
import Image from "next/image";
import { ENV } from "@/app/utility/global-variable";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";

export default function ListComment({
  refForDetectScroll,
}: {
  refForDetectScroll: MutableRefObject<any>;
}) {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const { listComment, setListComment } = dataContext;
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const handleGetComments = async () => {
    try {
      const { totalPage, data } = await getCommentByIdImage(
        dataContext.idImage,
        page
      );
      setMaxPage(totalPage);
      setListComment((prevData: ResponseCommentType[] | null) => {
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
    element: refForDetectScroll,
  });
  useEffect(() => {
    handleGetComments();
  }, [page]);
  return (
    <>
      {listComment &&
        listComment.map((item, index) => {
          return (
            <div
              className="flex flex-row gap-3"
              key={index + "_" + Math.random() + "_" + Date.now()}
            >
              <div>
                <Link
                  href={`user/${item.user_id}`}
                  className="w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700"
                >
                  {item.users.avatar && (
                    <Image
                      alt="avatar"
                      src={`${ENV.BASE_URL}/${item.users.avatar}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>
              </div>
              <div>
                <div className="flex flex-col gap-0 items-start">
                  <h6 className="text-base font-semibold">
                    {item.users.fullname}
                  </h6>
                  <p className="text-xs text-zinc-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="pt-1 pr-3">{item.content}</div>
              </div>
            </div>
          );
        })}
    </>
  );
}
