"use client";

import Link from "next/link";
import { BlockInputComment, Comment } from "./Comment";
import { getInfoUserById } from "@/app/utility/axios/api.user";
import { useEffect, useState } from "react";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { ResponseUserType } from "@/app/utility/type";
import Image from "next/image";
import { ENV } from "@/app/utility/global-variable";
import {
  checkIsInteract,
  getTotalLikes,
  toggleLikeImage,
  toggleSaveImage,
} from "@/app/utility/axios/api.image";
import useCheckFollowingAndToggle from "@/app/utility/hooks/useCheckFollowingAndToggle";

interface TypeProps {
  idUser: number;
  title: string;
  description: string;
  idImage: number;
}

export default function BlockInfoAndComment(props: TypeProps) {
  const { decode, token } = useTokenDecode();
  const [infoUser, setInfoUser] = useState<ResponseUserType | null>(null);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const {
    fetchIsFollowed,
    fetchToggleFollow,
    isFollowed,
    followersData,
    fetchTotalFollower,
  } = useCheckFollowingAndToggle();
  const handleGetUserAuthor = async () => {
    try {
      const { data } = await getInfoUserById(props.idUser);
      setInfoUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckInteract = async () => {
    try {
      const { data } = await checkIsInteract(props.idImage);
      setIsSave(data.isSaved);
      setIsLike(data.isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetTotalLikes = async () => {
    try {
      const { data } = await getTotalLikes(props.idImage);
      setLikes(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickSaveImage = async () => {
    if (!decode) return false;
    try {
      const { data } = await toggleSaveImage(props.idImage);
      setIsSave(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickLikeImage = async () => {
    if (!decode) return false;
    try {
      const { data } = await toggleLikeImage(props.idImage);
      if (data) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
      handleGetTotalLikes();
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggleFollow = () => {
    if (infoUser) {
      fetchToggleFollow(infoUser.info.id);
    }
  };
  useEffect(() => {
    handleGetUserAuthor();
    handleGetTotalLikes();
  }, []);
  useEffect(() => {
    if (infoUser) {
      fetchTotalFollower(infoUser.info.id);
    }
  }, [isFollowed]);
  useEffect(() => {
    if (decode) {
      handleCheckInteract();
    }
  }, [decode]);
  useEffect(() => {
    if (infoUser) {
      fetchIsFollowed(infoUser.info.id);
    }
  }, [infoUser]);
  return (
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
        {decode && (
          <div
            className="btn-border-style bg-red-700 text-white cursor-pointer shadow-md"
            onClick={handleClickSaveImage}
          >
            {isSave ? "SAVED" : "SAVE"}
          </div>
        )}
      </div>
      <div className="pt-10 grow flex flex-col gap-4 overflow-auto px-4 my-3 relative border-t-zinc-300 border-r-0 border-l-0 border-b-zinc-300 border-[1px]">
        <h1 className="text-3xl font-semibold">{props.title}</h1>
        <div className="text-base">{props.description}</div>
        <div className=" flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            {infoUser && (
              <>
                <div>
                  <Link
                    href={`/user/${infoUser.info.id}`}
                    className="w-12 block aspect-square rounded-full overflow-hidden bg-zinc-700"
                  >
                    <Image
                      className="fit-cover"
                      src={ENV.BASE_URL + "/" + infoUser?.info.avatar}
                      alt="avatar"
                      width={60}
                      height={60}
                    />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link
                    href={`/user/${infoUser.info.id}`}
                    className="text-sm font-semibold"
                  >
                    {infoUser.info.fullname}
                  </Link>
                  <div className="text-sm">
                    {followersData?.total || 0} Followers
                  </div>
                </div>
              </>
            )}
          </div>
          {decode?.id !== infoUser?.info.id && decode && (
            <button
              onClick={handleToggleFollow}
              className="btn-border-style bg-zinc-200"
            >
              {isFollowed ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="pt-8 pb-6">
          <div className="text-lg font-semibold">Nhận xét</div>
          <div className="flex flex-col gap-4">
            <Comment />
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-row justify-end items-center">
          <div
            className="flex flex-row gap-0 items-center"
            onClick={handleClickLikeImage}
          >
            <p>{likes || ""}</p>
            <div className="icon-circle-style shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isLike ? "red" : "currentColor"}
                className="w-6 h-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
          </div>
        </div>
        <BlockInputComment />
      </div>
    </div>
  );
}
