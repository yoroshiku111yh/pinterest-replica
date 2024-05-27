"use client";

import { localStorageFn } from "@/app/utility/axios";
import { RegisterDataType, registerApi } from "@/app/utility/axios/api.auth";
import { useRef, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  popup: boolean;
  closePopup: () => void;
}

const resolver: Resolver<RegisterDataType> = async (values) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 character long";
  }
  if (values.fullname.length < 3 || values.fullname.length > 30) {
    errors.fullname = "Fullname must be at least 3 character and below 30 characters long";
  }
  if (values.age < 10 || isNaN(values.age)) {
    errors.age = "Age is not valid";
  }
  return {
    errors,
    values,
  };
};

export default function RegisterPopup(props: Props) {
  const ref = useRef(null);
  const [apiError, setApiError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({ resolver });
  const { popup, closePopup } = props;
  const handleClickOutside = () => {
    closePopup();
    document.body.style.overflow = "";
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await registerApi(data);
      if (response.data.length > 0) {
        localStorageFn.token = response.data;
        window.location.href = "/";
      }
    } catch (error: any) {
      if (error.statusCode === 409) {
        setApiError("Email already registered");
      } else {
        setApiError("Please try again later");
      }
    }
  });
  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      {popup ? (
        <div className="fixed bg-black/30 sm:py-0 py-20 top-0 left-0 z-50 w-full h-full flex justify-center items-center overflow-auto">
          <div
            ref={ref}
            className="md:w-[484px] w-[90%] h-auto rounded-2xl shadow-lg bg-white relative flex flex-col md:gap-4 gap-1 px-4 py-5"
          >
            <div className="text-center">
              <h6 className="text-2xl font-bold uppercase">Đăng ký</h6>
              <p className="text-sm">Hãy bắt đầu khám phá ngay hôm nay! </p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <div className="input-block">
                  <input
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="min-h-5 error-note">
                  {errors.email && errors.email.toString()}
                </div>
                <label>Password</label>
                <div className="input-block">
                  <input
                    placeholder="Email"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="min-h-5 error-note">
                  {errors.password && errors.password.toString()}
                </div>
                <label>Họ tên</label>
                <div className="input-block">
                  <input
                    placeholder="Họ tên"
                    {...register("fullname", { required: true })}
                  />
                </div>
                <div className="min-h-5 error-note">
                  {errors.fullname && errors.fullname.toString()}
                </div>
                <label>Tuổi</label>
                <div className="input-block">
                  <input placeholder="tuổi" {...register("age")} />
                </div>
                <div className="min-h-5 error-note">
                  {errors.age && errors.age.toString()}
                </div>
              </div>
              <div className="min-h-5 error-note">
                {apiError.length !== 0 && apiError}
              </div>
              <button
                type="submit"
                className="btn-border-style bg-red-600 text-white text-base font-bold"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
