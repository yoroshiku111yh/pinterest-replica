import Image from "next/image";
import LoadMasonryImages from "./LoadMasonryImages";
import { ENV } from "@/app/utility/global-variable";
import Link from "next/link";
import { BlockInputComment, Comment } from "./Comment";
import BlockInfoAndComment from "./BlockInfoAndComment";

async function getDataImage(id: number): Promise<any> {
  const response = await fetch(`${ENV.BASE_URL}/image/${id}`, {
    cache : "force-cache",
    next : {
      revalidate : 600
    }
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const { data } = await response.json();
  return data;
}

export default async function Page({
  params,
}: {
  params: { imageId: string };
}) {
  const res = await getDataImage(Number(params.imageId));
  const { data } = res;
  console.log(data);
  return (
    <>
      <div className=" bg-white lg:max-w-[1016px] m-auto h-[90vh] lg:min-h-[400px] rounded-lg overflow-hidden relative shadow-2xl">
        <div className="flex flex-row h-full w-full">
          <div className="flex justify-center items-center w-1/2">
            <Image
              src={`${ENV.BASE_URL}/${data.url}`}
              alt={data.name}
              width={data.width}
              height={data.height}
              sizes="auto"
              className="object-contain w-full h-full"
            />
          </div>
          <BlockInfoAndComment
            idImage={Number(params.imageId)}
            title={data.name}
            description={data.description}
            idUser={data.user_id}
          />
        </div>
      </div>
      <div className="pt-10">
        <h3 className="text-2xl text-center font-bold pb-10">
          Thêm nội dung để khám phá
        </h3>
        <LoadMasonryImages />
      </div>
    </>
  );
}
