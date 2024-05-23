"use client";

import { ResponseDataPicture, getListPicture } from "./utility/axios/api";
import MasonryLayout from "./components/MasonryLayout";
import useScrollToLoadMore from "./utility/hooks/useScrollToLoadMore";

export default function Home() {
  const { listData } = useScrollToLoadMore<ResponseDataPicture>(getListPicture);
  return <MasonryLayout listPicture={listData} />;
}
