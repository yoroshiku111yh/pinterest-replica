"use client";

import Link from "next/link";
import { BlockInputComment } from "./Comment";
import { getInfoUserById } from "@/app/utility/axios/api.user";
import { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { ResponseUserType, TokenPayload } from "@/app/utility/type";
import Image from "next/image";
import { ENV } from "@/app/utility/global-variable";
import {
  checkIsInteract,
  getImageById,
  getTotalLikes,
  toggleLikeImage,
  toggleSaveImage,
} from "@/app/utility/axios/api.image";
import useCheckFollowingAndToggle from "@/app/utility/hooks/useCheckFollowingAndToggle";
import {
  ResponseCommentType,
  getCommentByIdImage,
} from "@/app/utility/axios/api.comment";
import { useDebouncedScroll } from "@/app/utility/hooks/useDebounceScroll";

interface TypeProps {
  idUser: number;
  idImage: number;
}

interface ContextType {
  idUser: number;
  idImage: number;
  infoUser: ResponseUserType | null;
  setInfoUser: (data: ResponseUserType) => void;
}

const ContextImageDetail = createContext<ContextType | null>(null);

const InfoUserComponent = () => {
  const { decode } = useTokenDecode();
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const { infoUser, setInfoUser, idUser } = dataContext;
  const {
    fetchIsFollowed,
    fetchToggleFollow,
    isFollowed,
    followersData,
    fetchTotalFollower,
  } = useCheckFollowingAndToggle();
  const handleFetchInfoUser = async (userId: number) => {
    try {
      const { data } = await getInfoUserById(userId);
      setInfoUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggleFollow = () => {
    if (infoUser && decode) {
      fetchToggleFollow(infoUser.info.id);
    }
  };
  useEffect(() => {
    if (idUser) {
      handleFetchInfoUser(idUser);
    }
  }, []);
  useEffect(() => {
    if (decode) {
      fetchIsFollowed(idUser);
    }
  }, [decode]);
  useEffect(() => {
    fetchTotalFollower(idUser);
  }, [isFollowed]);
  return (
    <div className=" flex flex-row justify-between items-center">
      {infoUser && (
        <div className="flex flex-row items-center gap-2">
          <div>
            <Link
              href={`/user/${infoUser.info.id}`}
              className="w-20 block aspect-square rounded-full overflow-hidden bg-zinc-700"
            >
              <Image
                className="fit-cover"
                src={ENV.BASE_URL + "/" + infoUser?.info.avatar}
                alt="avatar"
                width={80}
                height={80}
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
            <div className="text-sm">{followersData?.total || 0} Followers</div>
          </div>
        </div>
      )}
      {decode && infoUser?.info.id !== decode.id && (
        <button
          onClick={handleToggleFollow}
          className="btn-border-style bg-zinc-200"
        >
          {isFollowed ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

const SaveButton = () => {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const [isSave, setIsSave] = useState<boolean>(false);
  const handleClickSaveImage = async () => {
    setIsSave(!isSave);
    try {
      await toggleSaveImage(dataContext.idImage);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckInteract = async () => {
    try {
      const { data } = await checkIsInteract(dataContext.idImage);
      setIsSave(data.isSaved);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleCheckInteract();
  }, []);
  return (
    <div
      className="btn-border-style bg-red-700 text-white cursor-pointer shadow-md"
      onClick={handleClickSaveImage}
    >
      {isSave ? "SAVED" : "SAVE"}
    </div>
  );
};

const LikesComponent = () => {
  const { decode } = useTokenDecode();
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const handleCheckInteract = async () => {
    try {
      const { data } = await checkIsInteract(dataContext.idImage);
      setIsLike(data.isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetTotalLikes = async () => {
    try {
      const { data } = await getTotalLikes(dataContext.idImage);
      setLikes(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickLikeImage = async () => {
    if (isLike) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    setIsLike(!isLike);
    try {
      await toggleLikeImage(dataContext.idImage);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetTotalLikes();
  }, []);
  useEffect(() => {
    if (decode) {
      handleCheckInteract();
    }
  }, [decode]);
  return (
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
  );
};

const InfoImageComponent = () => {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const handleFetchInfoImage = async () => {
    try {
      const { data } = await getImageById(dataContext.idImage);
      setTitle(data.name);
      setDesc(data.description);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFetchInfoImage();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="text-base">{desc}</div>
    </>
  );
};

const ListComment = ({refForDetectScroll} : {refForDetectScroll : MutableRefObject<any>}) => {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(Infinity);
  const [listData, setListData] = useState<ResponseCommentType[] | null>(null);
  const handleGetComments = async () => {
    try {
      const { totalPage, data } = await getCommentByIdImage(
        dataContext.idImage,
        page
      );
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
    element: refForDetectScroll,
  });
  useEffect(() => {
    handleGetComments();
  }, [page]);
  return (
    <>
      {listData &&
        listData.map((item, index) => {
          return (
            <div className="flex flex-row gap-3" key={index + "_" + Math.random() + "_" + Date.now()}>
              <div>
                <Link
                  href={`user/${item.user_id}`}
                  className="w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700"
                >
                  <Image
                    alt="avatar"
                    src={`${ENV.BASE_URL}/${item.users.avatar}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <div>
                <div className="flex flex-col gap-0 items-start">
                  <h6 className="text-base font-semibold">
                    {item.users.fullname}
                  </h6>
                  <p className="text-xs text-zinc-500">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div className="pt-1 pr-3">{item.content}</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

////////////////

export default function BlockInfoAndComment(props: TypeProps) {
  const { decode } = useTokenDecode();
  const [infoUser, setInfoUser] = useState<ResponseUserType | null>(null);
  const refWrapper = useRef(null);
  const obj = {
    ...props,
    ...{
      infoUser,
      setInfoUser,
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
        <div ref={refWrapper} className="pt-10 grow flex flex-col gap-4 overflow-auto px-4 my-3 relative border-t-zinc-300 border-r-0 border-l-0 border-b-zinc-300 border-[1px]">
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
