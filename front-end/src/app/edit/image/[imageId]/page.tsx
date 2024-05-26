"use client";

import ErrorLayoutUnAuthor from "@/app/components/errors/401";
import { CatesTypeReponse } from "@/app/utility/axios/api.cates";
import {
  EditImageType,
  ResponseGetImageById,
  fetchDeleteImageById,
  fetchEditImage,
  getImageById,
} from "@/app/utility/axios/api.image";
import { searchCate } from "@/app/utility/axios/api.search";
import { ENV } from "@/app/utility/global-variable";
import useFetchAddCate from "@/app/utility/hooks/useFetchAddCate";
import useTokenDecode from "@/app/utility/hooks/useTokenDecode";
import { debounce } from "lodash";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";

type FormEditImageType = Omit<EditImageType, "cates">;

export default function Page({ params }: { params: { imageId: string } }) {
  const resolver: Resolver<FormEditImageType> = async (values) => {
    setSuccessMess(null);
    const errors: Record<string, string> = {};
    if (values.name.length > 50 || values.name.length < 1) {
      errors.name = "Name length must be in range from 0 to 50 characters";
    }
    if (values.description.length > 200) {
      errors.description =
        "Description length must be in range from 0 to 200 characters";
    }
    return {
      errors,
      values,
    };
  };
  const [successMess, setSuccessMess] = useState<string | null>(null);
  const ref = useRef(null);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [infoImage, setInfoImage] = useState<ResponseGetImageById | null>(null);
  const {
    fetchedCates,
    selectedCates,
    setSelectedCates,
    handleSearch,
    handleAddRemoveCate,
  } = useFetchAddCate(searchCate);
  const { decode, token } = useTokenDecode();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormEditImageType>({ resolver });
  let debounceFnSearchCate = useCallback(debounce((value: string) => {
    if (value.length > 1) {
      handleSearch(value);
    } else {
      setIsPopup(false);
    }
  }, 500), []);
  const fetchImageById = async (id: number) => {
    try {
      const { data } = await getImageById(id);
      if (data.user_id == decode?.id) {
        setInfoImage(data);
        setSelectedCates(data.cates);
      }
    } catch (err) {
      window.location.href = "/not-found";
    }
  };
  useOnClickOutside(ref, () => {
    setIsPopup(false);
    setSearchString("");
  });
  const handleEditImage = async (formData: EditImageType) => {
    try {
      await fetchEditImage(formData, Number(params.imageId));
      setSuccessMess("Edited successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteImage = async () => {
    try {
      await fetchDeleteImageById(Number(params.imageId));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (fetchedCates.length > 0) setIsPopup(true);
  }, [fetchedCates]);

  useEffect(() => {
    if (decode) {
      fetchImageById(Number(params.imageId));
    }
  }, [decode]);
  const onSubmit = handleSubmit((data) => {
    const arIdCates = selectedCates.reduce(
      (result: number[], _cate: CatesTypeReponse) => {
        result.push(_cate.id);
        return result;
      },
      []
    );
    handleEditImage({
      ...data,
      cates: JSON.stringify(arIdCates),
    });
  });
  return (
    <>
      {(!decode || !infoImage) && <ErrorLayoutUnAuthor />}
      {infoImage && (
        <div className="flex flex-row gap-10 max-w-[1087px] m-auto px-4 py-7 bg-white rounded-xl shadow-md">
          <div className=" w-1/2 flex flex-col gap-4">
            <>
              <div className="relative rounded-2xl border-dashed border-2 border-slate-600 aspect-[8/10] bg-white flex justify-center flex-col items-center text-base relative">
                <Image
                  src={`${ENV.BASE_URL}/${infoImage.url}`}
                  alt="preview upload"
                  width={infoImage.width}
                  height={infoImage.height}
                  className="w-auto h-auto max-h-full max-w-full"
                />
              </div>
            </>
          </div>
          <div className="w-1/2 flex flex-col gap-7">
            {decode && decode.id === infoImage.user_id && (
              <div className="flex flex-row justify-end items-center">
                <div
                  onClick={handleDeleteImage}
                  className="icon-circle-style w-12 h-12 shadow-none aspect-square"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    className="size-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <label>Tiêu đề</label>
                <div className="input-block border-2 border-neutral-300 bg-white">
                  <input
                    placeholder="Thêm tiêu đề"
                    defaultValue={infoImage?.name}
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="error-note">{errors.name && errors.name.toString()}</div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Mô tả</label>
                <div className="input-block border-2 border-neutral-300 h-[100px] bg-white">
                  <textarea
                    placeholder="Thêm mô tả"
                    defaultValue={infoImage?.description}
                    {...register("description")}
                  />
                </div>
                <div className="error-note">{errors.description && errors.description.toString()}</div>
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
                      {fetchedCates.map(
                        (_cate: CatesTypeReponse, index: number) => {
                          return (
                            <div
                              className=" cursor-pointer text-base font-semibold pl-1"
                              key={index}
                              onClick={() => handleAddRemoveCate(_cate)}
                            >
                              + {_cate.name}
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
                <div className="h-[180px] overflow-auto">
                  <div className="flex flex-row flex-wrap gap-2 pt-2 py-4">
                    {selectedCates.map(
                      (_cate: CatesTypeReponse, index: number) => {
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
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-500">{successMess}</div>
                <button
                  type="submit"
                  className="btn-border-style bg-red-700 text-white min-w-32 shadow-md"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
