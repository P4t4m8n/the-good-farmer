import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="w-full flex  justify-center">
      <div className=" grid grid-flow-row gap-4 text-center w-64 text-black-2 font-bold font-text  ">
        <a href="/api/auth/google" className="bg-white p-4  rounded">
          Google
        </a>
        <Link href="signin/email" className="bg-white p-4   rounded">
          Email
        </Link>
      </div>
    </div>
  );
}
