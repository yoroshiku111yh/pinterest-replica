import Image from "next/image";
import { useContext, useEffect } from "react";
import { ContextImageDetail } from "../BlockInfoAndComment";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { ENV } from "@/app/utility/global-variable";
import { useForm, Resolver } from "react-hook-form";
import {
  FormCommentType,
  ResponseCommentType,
  postCommentToIdImage,
} from "@/app/utility/axios/api.comment";

const resolver: Resolver<FormCommentType> = async (values) => {
  const errors: Record<string, string> = {};
  if (values.content.length > 200 || values.content.length < 1) {
    errors.name = "Name length must be in range from 0 to 200 characters";
  }
  return {
    errors,
    values,
  };
};

export default function BlockInputComment() {
  const dataContext = useContext(ContextImageDetail);
  if (!dataContext) {
    throw new Error("Component need inside provider");
  }
  const { idImage, setListComment } = dataContext;
  const { decode } = useTokenDecode();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormCommentType>({ resolver });
  const onSubmit = handleSubmit(async (dataComment) => {
    try {
      const { data } = await postCommentToIdImage(dataComment, idImage);
      if (decode) {
        const obj: ResponseCommentType = {
          ...data,
          users: {
            id: decode.id,
            fullname: decode.fullname,
            avatar: decode.avatar,
          },
        };
        setListComment((prevData: ResponseCommentType[] | null) => {
          if (prevData) {
            return [...[obj], ...prevData];
          } else {
            return [obj];
          }
        });
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <form onSubmit={onSubmit}>
      {decode && (
        <div className="flex flex-row items-center gap-3 mt-3">
          <div className="w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700">
            {decode.avatar && (
              <Image
                src={`${ENV.BASE_URL}/${decode.avatar}`}
                className="w-full h-full object-cover"
                alt="avatar"
                width={48}
                height={48}
              />
            )}
          </div>
          <div className="grow input-block relative flex flex-row gap-2">
            <input
              className="w-full"
              {...register("content", { required: true })}
            />
            <button type="submit" className="icon-circle-style shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
