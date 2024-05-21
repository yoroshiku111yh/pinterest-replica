"use client";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 bg-white px-6 py-8 mx-auto rounded-lg shadow-sm max-w-[1055px]">
      <h6 className="text-2xl font-semibold">Chỉnh sửa hồ sơ</h6>
      <p>
        Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây
        hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-3 items-center">
          <div className="w-20 block aspect-square rounded-full overflow-hidden bg-zinc-700">
            {/* avatar image here */}
          </div>
          <button className="btn-border-style bg-zinc-300 shadow-sm">
            Thay đổi
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <label>Họ và tên</label>
          <div className="input-block">
            <input placeholder="Họ tên" />
          </div>
        </div>
        <div className="text-center pt-5">
          <button className="btn-border-style bg-green-600 text-white">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
