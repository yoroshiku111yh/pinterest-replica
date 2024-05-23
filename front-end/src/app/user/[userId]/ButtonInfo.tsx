"use client";

import { checkIsFollowed, toggleFollow } from "@/app/utility/axios/api";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ButtonInfo(props: { idUser: number }) {
  const { decode, token } = useTokenDecode();
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const fetchIsFollowed = async (id: number) => {
    try {
      const { data } = await checkIsFollowed(id);
      setIsFollowed(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchToggleFollow = async (id: number) => {
    try {
      const { data } = await toggleFollow(id);
      setIsFollowed(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (decode) {
      fetchIsFollowed(props.idUser);
    }
  }, [decode]);
  const handleFollow = () => {
    fetchToggleFollow(props.idUser);
  };
  return (
    <>
      {decode && (
        <div className=" flex flex-row gap-2">
          {decode.id !== props.idUser && (
            <div
              onClick={handleFollow}
              className=" cursor-pointer btn-border-style bg-red-500 text-white"
            >
              {isFollowed ? "Đang theo dõi" : "Theo dõi"}
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
