"use client";

import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  popup: boolean;
  closePopup: () => void;
}

export default function RegisterPopup(props: Props) {
  const ref = useRef(null);
  const { popup, closePopup } = props;
  const handleClickOutside = () => {
    closePopup();
    document.body.style.overflow = "";
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      {popup ? (
        <div className="fixed bg-black/30 top-0 left-0 z-50 w-full h-full flex justify-center items-center overflow-auto">
          <div
            ref={ref}
            className="w-[484px] h-auto rounded-2xl shadow-lg bg-white relative flex flex-col gap-4 px-4 py-5"
          >
            <div className="text-center">
              <h6 className="text-2xl font-bold uppercase">Đăng ký</h6>
              <p className="text-sm">Hãy bắt đầu khám phá ngay hôm nay! </p>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <div className="input-block">
                  <input placeholder="Email" />
                </div>
                <label>Password</label>
                <div className="input-block">
                  <input placeholder="Email" type="password" />
                </div>
                <label>Họ tên</label>
                <div className="input-block">
                  <input placeholder="Họ tên" />
                </div>
                <label>Tuổi</label>
                <div className="input-block">
                  <input placeholder="tuổi" />
                </div>
              </div>
              <button className="btn-border-style bg-red-600 text-white text-base font-bold">
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
