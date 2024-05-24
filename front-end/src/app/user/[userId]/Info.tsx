"use client";

import { getInfoUserById } from "@/app/utility/axios/api.user";
import { ENV } from "@/app/utility/global-variable";
import { ResponseUserType } from "@/app/utility/type";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Info(props: { id: number }) {
  const [data, setData] = useState<ResponseUserType | null>(null);
  const getData = async () => {
    try {
      const { data } = await getInfoUserById(props.id);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="rounded-full w-32 aspect-square overflow-hidden bg-slate-600">
        {data && data.info.avatar && (
          <Image
            className="fit-cover"
            src={`${ENV.BASE_URL}/${data.info.avatar}`}
            alt="avatar"
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="text-2xl font-semibold">{data?.info.fullname}</div>
    </>
  );
}
