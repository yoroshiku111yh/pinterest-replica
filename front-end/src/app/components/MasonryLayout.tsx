"use client";

import { ENV } from "../utility/global-variable";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import {
  ResponseDataPicture,
  toggleLikeImage,
  toggleSaveImage,
} from "../utility/axios/api.image";
import useTokenDecode from "../utility/hooks/useTokenDecode";
import { useState } from "react";

interface TypeProps {
  listPicture: ResponseDataPicture[]
  disableInteract ?: boolean
}

export default function MasonryLayout(props: TypeProps) {
  const { listPicture , disableInteract } = props;
  const { token, decode } = useTokenDecode();
  const isLoggedIn = token ? true : false;
  const [parent] = useAutoAnimate({
    duration: 350,
    easing: "ease-in-out",
  });
  return (
    <div className="masonry-images" ref={parent}>
      {listPicture.map((item: ResponseDataPicture, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden relative shadow-sm hover:shadow-lg"
        >
          <div className="md:bg-black/45 md:opacity-0 bg-black/25 opacity-100 hover:opacity-100 transition-opacity absolute top-0 left-0 w-full h-full flex flex-col justify-between items-end p-5">
            <Link
              href={`/image/${item.id}`}
              className="absolute top-0 left-0 w-full h-full z-10"
            ></Link>
            {isLoggedIn && !disableInteract && (
              <LayerInteract
                liked={item.isLiked}
                saved={item.isSaved}
                id={item.id}
              />
            )}
          </div>
          <img
            className="w-full h-auto"
            src={`${ENV.BASE_URL}/${item.thumbnail_url}`}
            alt={item.name}
          />
        </div>
      ))}
    </div>
  );
}

const LayerInteract = ({
  id,
  liked = false,
  saved = false,
}: {
  id: number;
  liked?: boolean;
  saved?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isSaved, setIsSaved] = useState<boolean>(saved);
  const handleToggleLike = async () => {
    try {
      await toggleLikeImage(id);
    } catch (err) {
      console.log(err);
    }
    setIsLiked(!isLiked);
  };
  const handleToggleSave = async () => {
    try {
      await toggleSaveImage(id);
    } catch (err) {
      console.log(err);
    }
    setIsSaved(!isSaved);
  };
  return (
    <>
      <div
        onClick={handleToggleSave}
        className="btn-border-style bg-red-700 text-white cursor-pointer shadow-md z-20 relative"
      >
        {isSaved ? "SAVED" : "SAVE"}
      </div>
      <div className=" flex flex-row gap-3 relative z-20">
        <div className="icon-circle-style">
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
        <div onClick={handleToggleLike} className="icon-circle-style">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked ? "red" : ""}
            className="w-6 h-6"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>
      </div>
    </>
  );
};
