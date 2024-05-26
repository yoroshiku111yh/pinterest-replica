import { useContext, useEffect, useState } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import {
  checkIsInteract,
  toggleSaveImage,
} from "@/app/utility/axios/api.image";

export default function SaveButton() {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const [isSave, setIsSave] = useState<boolean>(false);
  const handleClickSaveImage = async () => {
    setIsSave(!isSave);
    try {
      await toggleSaveImage(dataContext.idImage);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckInteract = async () => {
    try {
      const { data } = await checkIsInteract(dataContext.idImage);
      setIsSave(data.isSaved);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleCheckInteract();
  }, []);
  return (
    <div
      className="btn-border-style bg-red-700 text-white cursor-pointer shadow-md"
      onClick={handleClickSaveImage}
    >
      {isSave ? "SAVED" : "SAVE"}
    </div>
  );
}
