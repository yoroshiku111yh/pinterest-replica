import GridLayoutPicture from "@/app/components/GridLayoutPicture";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="rounded-full w-32 aspect-square overflow-hidden bg-slate-600">
        {/* image here */}
      </div>
      <div className="text-2xl font-semibold">Username</div>
      <div className="text-base font-semibold">3 người đang theo dõi</div>
      <div className=" flex flex-row gap-2">
        <Link className="btn-border-style bg-gray-500 text-white" href="/user/edit">
          Chỉnh sửa hồ sơ
        </Link>
      </div>
      <div className="flex flex-row gap-7 [&>span]:text-base [&>span]:font-semibold">
        <span>Đã tạo</span>
        <span>Đã lưu</span>
      </div>
      <div className="pt-10">
        <GridLayoutPicture />
      </div>
    </div>
  );
}
