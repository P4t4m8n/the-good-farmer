import Link from "next/link";
import Parallax from "../Parallax/Parallax";

export default function Home() {
  return (
    <div>
      <Parallax>
        <div className="relative  flex flex-col  items-center justify-center h-full text-center">
          <h1 className="text-5xl font-title font-bold text-amber-50">
            Welcome to Framer Market
          </h1>
          <p className="mt-4 font-text text-2xl text-yellow-50">
            Your one-stop shop for amazing products!
          </p>
          <button className="border-effect mt-4  z-10 w-[31rem]">
            <Link
              href={"/products/vegetable"}
              className=" font-title text-center"
            >
              Start shopping
            </Link>
          </button>
        </div>
      </Parallax>
    </div>
  );
}
