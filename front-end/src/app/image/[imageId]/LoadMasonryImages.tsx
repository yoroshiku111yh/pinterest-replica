"use client";

import { ResponseDataPicture, getListPicture } from "../../utility/axios/api.image";
import useScrollToLoadMore from "../../utility/hooks/useScrollToLoadMore";
import MasonryLayout from "../../components/MasonryLayout";

export default function LoadMasonryImages() {
  const { listData } = useScrollToLoadMore<ResponseDataPicture>(getListPicture);
  return <MasonryLayout listPicture={listData} />;
}
