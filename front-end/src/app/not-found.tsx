import Link from "next/link";

export default function NotFound() {
  return (
    <div className="justify-center items-center flex flex-col gap-3 w-screen h-[80vh]">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl text-center">Page is not found</p>
      <Link href="/" className="text-red-600">
        Back to home
      </Link>
    </div>
  );
}
