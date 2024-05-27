import { useContext, useEffect, useState } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import { getImageById } from "@/app/utility/axios/api.image";

export default function InfoImageComponent() {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const handleFetchInfoImage = async () => {
    try {
      const { data } = await getImageById(dataContext.idImage);
      setTitle(data.name);
      setDesc(data.description);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFetchInfoImage();
  }, []);
  return (
    <>
      <h1 className="md:text-3xl text-2xl font-semibold">{title}</h1>
      <div className="md:text-base text-sm italic">{desc}</div>
    </>
  );
}
