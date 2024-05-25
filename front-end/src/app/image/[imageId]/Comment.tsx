import Link from "next/link";

  export const BlockInputComment = () => {
    return (
      <>
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
  