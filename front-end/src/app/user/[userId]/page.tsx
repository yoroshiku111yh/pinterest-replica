import { ENV } from "@/app/utility/global-variable";
import { ResponseUserType } from "@/app/utility/type";
import Link from "next/link";
import ButtonInfo from "./ButtonInfo";
import Image from "next/image";

async function getDataUser(id: number): Promise<ResponseUserType> {
  const response = await fetch(`${ENV.BASE_URL}/user/${id}`, {
    next: { revalidate: 600 },
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const { data } = await response.json();
  return data;
}

export default async function Page({ params }: { params: { userId: string } }) {
  const id = Number(params.userId);
  const data = await getDataUser(id);
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="rounded-full w-32 aspect-square overflow-hidden bg-slate-600">
        {data.info.avatar && (
          <Image
            className="fit-cover"
            src={`${ENV.BASE_URL}/${data.info.avatar}`}
            alt="avatar"
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="text-2xl font-semibold">{data.info.fullname}</div>
      <div className="text-base font-semibold">
        {data.follower.total > 0 &&
          data.follower.total + " Người đang theo dõi"}
      </div>
      <ButtonInfo idUser={id} />
      <div className="flex flex-row gap-7 [&>span]:text-base [&>span]:font-semibold">
        <span>Đã tạo</span>
        <span>Đã lưu</span>
      </div>
      <div className="pt-10">
        {/* <GridLayoutPicture /> */}
      </div>
    </div>
  );
}
