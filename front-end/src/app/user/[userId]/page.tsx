import ButtonInfo from "./ButtonInfo";
import Info from "./Info";

export default async function Page({ params }: { params: { userId: string } }) {
  const id = Number(params.userId);
  return (
    <div className="flex flex-col items-center gap-5">
      <Info id={id} />
      <ButtonInfo idUser={id} />
      <div className="flex flex-row gap-7 [&>span]:text-base [&>span]:font-semibold">
        <span>Đã tạo</span>
        <span>Đã lưu</span>
      </div>
      <div className="pt-10">{/* <GridLayoutPicture /> */}</div>
    </div>
  );
}
