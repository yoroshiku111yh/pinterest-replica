import Link from "next/link";


export const Comment = () =>  {
    return (
      <div className="flex flex-row gap-3">
        <div>
          <Link
            href="/"
            className="w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700"
          >
            {/* <Image src="/avatar" alt="avatar" width={48} height={48} /> */}
          </Link>
        </div>
        <div>
          <div className="flex flex-col gap-0 items-start">
            <h6 className="text-base font-semibold">Username</h6>
            <p className="text-xs text-zinc-500">21 phút trước</p>
          </div>
          <div className="pt-1 pr-3">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages.
          </div>
        </div>
      </div>
    );
  }

  export const BlockInputComment = () => {
    return (
      <>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-semibold">16 nhận xét</p>
          <div className="icon-circle-style shadow-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 mt-3">
          <div>
            <Link
              href="/"
              className="w-10 block aspect-square rounded-full overflow-hidden bg-zinc-700"
            >
              {/* <Image src="/avatar" alt="avatar" width={48} height={48} /> */}
            </Link>
          </div>
          <div className="grow input-block relative flex flex-row gap-2">
            <input className="w-full" />
            <div className="icon-circle-style shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }
  