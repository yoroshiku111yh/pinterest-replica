import Image from "next/image";
import BlockComment from "./BlockComment";
import GridLayoutPicture from "@/app/components/GridLayoutPicture";

export default function Page({ params }: { params: { imageId: string } }) {
  return (
    <>
      <div className=" bg-white lg:max-w-[1016px] m-auto h-[90vh] lg:min-h-[400px] rounded-lg overflow-hidden relative shadow-2xl">
        <div className="flex flex-row h-full w-full">
          <div className="flex justify-center items-center w-1/2">
            <Image
              src="https://i.pinimg.com/564x/7a/59/12/7a5912c991900462e5635af3be743e88.jpg"
              alt="image"
              width={0}
              height={0}
              sizes="auto"
              className="object-contain w-full h-auto"
            />
          </div>
          <BlockComment />
        </div>
      </div>
      <div className="pt-10">
        <h3 className="text-2xl text-center font-bold pb-10">
          Thêm nội dung để khám phá
        </h3>
        <GridLayoutPicture />
      </div>
    </>
  );
}
