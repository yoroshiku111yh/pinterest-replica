import Image from "next/image";
import LoadMasonryImages from "./LoadMasonryImages";
import { ENV } from "@/app/utility/global-variable";
import BlockInfoAndComment from "./BlockInfoAndComment";
import { redirect } from "next/navigation";

async function getDataImage(id: number): Promise<any> {
  try {
    const response = await fetch(`${ENV.BASE_URL}/image/${id}`, {
      next: {
        revalidate: 60,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { imageId: string };
}) {
  const data = await getDataImage(Number(params.imageId));
  if (!data) {
    redirect("/not-found");
  }
  return (
    <>
      <div className=" bg-white md:max-w-[1016px] m-auto md:h-[90vh] md:min-h-[400px] max-w-[100%] rounded-lg overflow-hidden relative shadow-2xl">
        <div className="flex md:flex-row h-full w-full flex-col">
          <div className="flex justify-center items-center md:w-1/2 w-full h-full md:pt-0 pt-10">
            <Image
              src={`${ENV.BASE_URL}/${data.url}`}
              alt={data.name}
              width={data.width}
              height={data.height}
              sizes="auto"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between py-7 md:w-1/2 w-full md:h-auto h-[500px]">
            <BlockInfoAndComment
              idImage={Number(params.imageId)}
              idUser={data.user_id}
            />
          </div>
        </div>
      </div>
      <div className="pt-10">
        <h3 className="text-2xl text-center font-bold pb-10">
          Thêm nội dung để khám phá
        </h3>
        <LoadMasonryImages idImagePage={Number(params.imageId)} />
      </div>
    </>
  );
}
