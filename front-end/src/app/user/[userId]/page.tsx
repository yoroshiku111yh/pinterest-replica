
import ButtonInfo from "./ButtonInfo";
import Info from "./Info";
import MasonryTab from "./MasonryTab";

export default async function Page({ params }: { params: { userId: string } }) {
  const id = Number(params.userId);
  return (
    <div className="flex flex-col items-center gap-5">
      <Info id={id} />
      <ButtonInfo idUser={id} />
      <MasonryTab idUser={id} />
    </div>
  );
}
