import Link from "next/link";

export default function ErrorLayoutUnAuthor() {
  return (
    <div className="justify-center items-center flex flex-col gap-3 w-screen h-[80vh] max-w-full">
      <h1 className="text-8xl font-bold">401</h1>
      <p className="text-2xl text-center">
        You are not authorized for selected action
      </p>
      <Link href="/" className="text-red-600">
        Back to home
      </Link>
    </div>
  );
}
