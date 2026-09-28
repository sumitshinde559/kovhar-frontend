import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-[120px] font-black leading-none text-zinc-100 sm:text-[180px]">
        404
      </p>

      <div className="-mt-4">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-zinc-500">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-[#5B3A29] px-7 py-3.5 font-semibold text-white transition hover:bg-[#4a2e20]"
        >
          Go Home <ArrowRight size={16} />
        </Link>
        <Link
          to="/products"
          className="rounded-full border border-zinc-200 bg-white px-7 py-3.5 font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
