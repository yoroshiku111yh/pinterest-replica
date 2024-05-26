import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { useContext, useEffect, useState } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import { checkIsInteract, getTotalLikes, toggleLikeImage } from "@/app/utility/axios/api.image";

export default function LikesComponent() {
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
    if(!decode) return false;
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
}
