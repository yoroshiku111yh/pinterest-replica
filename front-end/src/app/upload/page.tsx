export default function Page() {
  return (
    <div className="flex flex-row gap-10 max-w-[1087px] m-auto px-4 py-7 bg-white rounded-xl shadow-md">
      <div className=" w-1/2 flex flex-col gap-4">
        <UploadBlock />
      </div>
      <div className="w-1/2 flex flex-col gap-7">
        <InfoUpload />
      </div>
    </div>
  );
}

function UploadBlock() {
  return (
    <>
      <div className="relative cursor-pointer rounded-2xl border-dashed border-2 border-slate-600 aspect-[8/10] bg-zinc-300 flex justify-center flex-col items-center text-base relative">
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
        <input type="file" accept="image/x-png,image/jpeg" className=" cursor-pointer absolute top-0 left-0 w-full h-full opacity-0" />
      </div>
    </>
  );
}

function InfoUpload() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label>Tiêu đề</label>
        <div className="input-block border-2 border-neutral-300 bg-white">
          <input placeholder="Thêm tiêu đề" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Mô tả</label>
        <div className="input-block border-2 border-neutral-300 h-[100px] bg-white">
          <textarea placeholder="Thêm mô tả" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Chủ đề được gắn thẻ (0)</label>
        <div className="input-block border-2 border-neutral-300 bg-white">
          <input placeholder="Tìm kiếm thẻ" />
        </div>
        <div className="h-[180px] overflow-auto">
          <div className="flex flex-row flex-wrap gap-2 pt-2 py-4">
            <span className="btn-border-style bg-black text-white flex flex-row justify-between items-center gap-3">
              Chủ đề 1
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <button className="btn-border-style bg-red-700 text-white min-w-32 shadow-md">
          Đăng
        </button>
      </div>
    </>
  );
}
