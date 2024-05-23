import Image from "next/image";
import LoadMasonryImages from "./LoadMasonryImages";
import { ENV } from "@/app/utility/global-variable";
import Link from "next/link";
import { BlockInputComment, Comment } from "./Comment";

async function getDataImage(id: number): Promise<any> {
  const response = await fetch(`${ENV.BASE_URL}/image/${id}`, {
    next: { revalidate: 600 },
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
  const {data} = res;
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
              className="object-contain w-full h-auto"
            />
          </div>
          {/* <BlockComment /> */}
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
              <div className="btn-border-style bg-red-700 text-white cursor-pointer shadow-md">
                Lưu
              </div>
            </div>
            <div className="pt-10 grow flex flex-col gap-4 overflow-auto px-4 my-3 relative border-t-zinc-300 border-r-0 border-l-0 border-b-zinc-300 border-[1px]">
              <h1 className="text-3xl font-semibold">Title image</h1>
              <div className="text-base">Description...</div>
              <div className=" flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <div>
                    <Link
                      href={`/user/${data.user_id}`}
                      className="w-12 block aspect-square rounded-full overflow-hidden bg-zinc-700"
                    >
                      <Image className="fit-cover" src={ENV.BASE_URL + '/' + data.users.avatar} alt="avatar" width={60} height={60} />
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <Link href="/" className="text-sm font-semibold">
                      {data.users.fullname}
                    </Link>
                    <div className="text-sm">Followers</div>
                  </div>
                </div>
                <button className="btn-border-style bg-zinc-200">
                  Theo dõi
                </button>
              </div>
              <div className="pt-8 pb-6">
                <div className="text-lg font-semibold">Nhận xét</div>
                <div className="flex flex-col gap-4">
                  <Comment />
                </div>
              </div>
            </div>
            <div className="px-4">
              <BlockInputComment />
            </div>
          </div>
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
