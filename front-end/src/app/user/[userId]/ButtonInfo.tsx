"use client";

import { checkIsFollowed, toggleFollow } from "@/app/utility/axios/api.user";
import useCheckFollowingAndToggle from "@/app/utility/hooks/useCheckFollowingAndToggle";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ButtonInfo(props: { idUser: number }) {
  const { decode, token } = useTokenDecode();
  const {
    fetchIsFollowed,
    fetchToggleFollow,
    isFollowed,
    fetchTotalFollower,
    followersData,
  } = useCheckFollowingAndToggle();
  useEffect(() => {
    if (decode) {
      fetchIsFollowed(props.idUser);
    }
  }, [decode]);
  useEffect(() => {
    fetchTotalFollower(props.idUser);
  }, [isFollowed]);
  const handleFollow = async () => {
    fetchToggleFollow(props.idUser);
  };
  return (
    <>
      {followersData && (
        <div className="text-base font-semibold">
          {followersData.total + " Follower"}
        </div>
      )}
      {decode && (
        <div className=" flex flex-row gap-2">
          {decode.id !== props.idUser && (
            <div
              onClick={handleFollow}
              className=" cursor-pointer btn-border-style bg-red-500 text-white"
            >
              {isFollowed ? "Following" : "Follow"}
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
