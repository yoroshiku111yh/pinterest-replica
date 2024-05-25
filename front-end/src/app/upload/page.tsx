"use client";

import { useForm, Resolver } from "react-hook-form";
import useTokenDecode from "../utility/hooks/useTokenDecode";
import { UploadImageType, uploadImage } from "../utility/axios/api.image";
import { debounce } from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import useFetchAddCate from "../utility/hooks/useFetchAddCate";
import Image from "next/image";
import { searchCate } from "../utility/axios/api.search";
import { CatesTypeReponse } from "../utility/axios/api.cates";

export default function Page() {
  const { token, decode } = useTokenDecode();
  return <>{token ? <UploadImage /> : <h1>Unauthorization</h1>}</>;
}

type FormUploadImageType = Omit<UploadImageType, "image" | "cates"> & {
  image: FileList;
};
const resolver: Resolver<FormUploadImageType> = async (values) => {
  const errors: Record<string, string> = {};
  if(values.name.length > 100 || values.name.length === 0){
    errors.name = "Name length must from 0 to 100 charactes";
  }
  if(values.image.length !== 0 && values.image[0].size > 5000*1000){
    errors.image = "Limit file below 5mb";
  }
  if(values.description.length > 600){
    errors.description = "description length must from 0 to 600 charactes";
  }
  return {
    errors,
    values,
  };
};

const UploadImage = () => {

  const ref = useRef(null);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [previewedImage, setPreviewedImage] = useState<string | null>(null);
  const [searchString, setSearchString] = useState<string>("");

  const handleUpload = async(dataUpload : UploadImageType) => {
    try {
      const data = await uploadImage(dataUpload);
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUploadImageType>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    const arIdCates = selectedCates.reduce(
      (result: number[], _cate: CatesTypeReponse) => {
        result.push(_cate.id);
        return result;
      },
      []
    );
    const dataSend = {
      ...data,
      image: data.image[0],
      cates: JSON.stringify(arIdCates),
    };
    handleUpload(dataSend);
  });
  const { fetchedCates, selectedCates, handleSearch, handleAddRemoveCate } =
    useFetchAddCate(searchCate);
  let debounceFnSearchCate = debounce((value: string) => {
    if (value.length > 1) {
      handleSearch(value);
    } else {
      setIsPopup(false);
    }
  }, 500);
  useOnClickOutside(ref, () => {
    setIsPopup(false);
    setSearchString("");
  });
  useEffect(() => {
    if (fetchedCates.length > 0) setIsPopup(true);
  }, [fetchedCates]);
  const upPreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const path = URL.createObjectURL(e.target.files[0]);
      setPreviewedImage(path);
    } else {
      setPreviewedImage(null);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row gap-10 max-w-[1087px] m-auto px-4 py-7 bg-white rounded-xl shadow-md">
        <div className=" w-1/2 flex flex-col gap-4">
          <>
            <div className="relative cursor-pointer rounded-2xl border-dashed border-2 border-slate-600 aspect-[8/10] bg-zinc-300 flex justify-center flex-col items-center text-base relative">
              {previewedImage ? (
                <Image
                  src={previewedImage}
                  alt="preview upload"
                  width={600}
                  height={400}
                  className="w-auto h-auto max-h-full max-w-full"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <p className="pt-3 text-lg">Chọn / kéo thả 1 tệp ở đây</p>
                </>
              )}

              <input
                {...register("image", {
                  required: true,
                  onChange: upPreviewImage,
                })}
                type="file"
                accept="image/x-png,image/jpeg"
                className=" cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
              />
            </div>
          </>
        </div>
        <div className="w-1/2 flex flex-col gap-7">
          <>
            <div className="flex flex-col gap-2">
              <label>Tiêu đề</label>
              <div className="input-block border-2 border-neutral-300 bg-white">
                <input
                  placeholder="Thêm tiêu đề"
                  {...register("name", { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Mô tả</label>
              <div className="input-block border-2 border-neutral-300 h-[100px] bg-white">
                <textarea
                  placeholder="Thêm mô tả"
                  {...register("description")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Chủ đề được gắn thẻ (0)</label>
              <div
                className="input-block border-2 border-neutral-300 bg-white relative"
                ref={ref}
              >
                <input
                  placeholder="Tìm kiếm thẻ"
                  value={searchString}
                  onChange={(e) => {
                    setSearchString(e.target.value);
                    debounceFnSearchCate(e.target.value);
                  }}
                />
                {isPopup && (
                  <div
                    className="flex-col gap-1 px-2 py-3 absolute z-20 mt-1 top-full left-0 w-full max-h-[100px] overflow-auto shadow-md rounded-md 
                  bg-[#f0eeee]"
                  >
                    {fetchedCates.map((_cate: CatesTypeReponse, index: number) => {
                      return (
                        <div
                          className=" cursor-pointer text-base font-semibold pl-1"
                          key={index}
                          onClick={() => handleAddRemoveCate(_cate)}
                        >
                          + {_cate.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="h-[180px] overflow-auto">
                <div className="flex flex-row flex-wrap gap-2 pt-2 py-4">
                  {selectedCates.map((_cate: CatesTypeReponse, index: number) => {
                    return (
                      <span
                        key={index}
                        className="btn-border-style bg-black text-white flex flex-row justify-between items-center gap-3"
                      >
                        {_cate.name}
                        <svg
                          onClick={() => {
                            handleAddRemoveCate(_cate);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 cursor-pointer"
                        >
                          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btn-border-style bg-red-700 text-white min-w-32 shadow-md"
              >
                Đăng
              </button>
            </div>
          </>
        </div>
      </div>
    </form>
  );
};
