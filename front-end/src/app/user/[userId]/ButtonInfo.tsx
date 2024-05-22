"use client";

import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import Link from "next/link";

export default function ButtonInfo(props: { idUser: number }) {
  const {decode, token} = useTokenDecode();
  return (
    <>
      {decode && (
        <div className=" flex flex-row gap-2">
          {decode.id !== props.idUser && (
            <div className=" cursor-pointer btn-border-style bg-red-500 text-white">
              Theo dõi
            </div>
          )}
          {decode.id === props.idUser && (
            <Link
              className="btn-border-style bg-gray-500 text-white"
              href="/user/edit"
            >
              Chỉnh sửa hồ sơ
            </Link>
          )}
        </div>
      )}
    </>
  );
}
