"use client";

import ErrorLayoutUnAuthor from "@/app/components/errors/401";
import { localStorageFn } from "@/app/utility/axios";
import {
  UpdateInfoUserType,
  getProfile,
  updateInfoUser,
} from "@/app/utility/axios/api.user";
import { ENV } from "@/app/utility/global-variable";
import { ResponseUserType } from "@/app/utility/type";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";

type InfoUserType = Omit<UpdateInfoUserType, "avatar"> & {
  avatar: FileList;
};

export default function Page() {
  const resolver: Resolver<InfoUserType> = async (values) => {
    setSuccessMess(null);
    const errors: Record<string, string> = {};
    const { avatar } = values;
    if (values.fullname.length < 3) {
      errors.fullname = "Fullname must be at least 3 character long";
    }
    if (
      Number(values.age) < 10 ||
      Number(values.age) > 100 ||
      isNaN(values.age)
    ) {
      errors.age = "Age is not valid";
    }
    if (avatar[0] && avatar[0].size > 5000*1000) {
      errors.avatar = "Limit file below 5mb";
    }
    return {
      errors,
      values,
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InfoUserType>({ resolver });
  const [user, setInfo] = useState<ResponseUserType | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [successMess, setSuccessMess] = useState<string | null>(null);
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setInfo(res.data);
      const addPath =
        res.data.info.avatar && `${ENV.BASE_URL}/${res.data.info.avatar}`;
      setAvatarPreview(addPath);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfile();
    window.document.title = "Edit info user"
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    setSuccessMess(null);
    try {
      const response = await updateInfoUser({
        age: data.age,
        fullname: data.fullname,
        avatar: data.avatar[0] || null,
      });
      localStorageFn.token = response.data;
      setSuccessMess("Updated successfully");
    } catch (error) {
      console.error("Error when update info user :" + error);
      setSuccessMess(null);
    }
  });
  const previewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const path = URL.createObjectURL(e.target.files[0]);
      setAvatarPreview(path);
    } else {
      setAvatarPreview(null);
    }
  };
  return (
    <>
      {user ? (
        <div className="flex flex-col gap-4 bg-white px-6 py-8 mx-auto rounded-lg shadow-sm max-w-[1055px]">
          <h6 className="text-2xl font-semibold">Chỉnh sửa hồ sơ</h6>
          <p>
            Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào
            đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.
          </p>
          <div>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-row gap-3 items-center">
                <div className="w-20 block aspect-square rounded-full overflow-hidden bg-zinc-700">
                  {avatarPreview && (
                    <Image
                      className="fit-cover"
                      src={avatarPreview}
                      alt="avatar"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div>
                  <div className=" cursor-pointer btn-border-style bg-zinc-300 shadow-sm relative">
                    Thay đổi
                    <input
                      className=" cursor-pointer opacity-0 absolute w-full h-full top-0 left-0"
                      type="file"
                      accept="image/*"
                      {...register("avatar", {
                        onChange: previewAvatar,
                      })}
                    />
                  </div>
                  <div className="error-note">
                    {errors.avatar && errors.avatar.toString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label>Họ và tên</label>
                <div className="input-block">
                  <input
                    placeholder="Họ tên"
                    defaultValue={user.info.fullname}
                    {...register("fullname", { required: true })}
                  />
                </div>
                <div className="error-note">
                  {errors.fullname && errors.fullname.toString()}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label>Tuổi</label>
                <div className="input-block">
                  <input
                    placeholder="Tuổi của bạn"
                    defaultValue={user.info.age}
                    {...register("age")}
                  />
                </div>
                <div className="error-note">
                  {errors.age && errors.age.toString()}
                </div>
              </div>
              <div className="text-center pt-5 flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="btn-border-style bg-green-600 text-white"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {window.location.reload()}}
                  className="btn-border-style bg-red-600 text-white"
                >
                  Refresh
                </button>
              </div>
              <div className="text-center text-green-500 py-2">
                {successMess}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ErrorLayoutUnAuthor />
      )}
    </>
  );
}
