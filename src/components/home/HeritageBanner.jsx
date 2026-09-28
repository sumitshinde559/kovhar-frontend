import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeritageBanner() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/heritage-banner.png')",
        }}
      >
        {/* Overlay: stronger on mobile for text readability */}
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[460px] items-center px-6 py-12 sm:px-10 md:min-h-[520px] md:px-20 md:py-16">
          <div className="w-full min-w-0 max-w-2xl text-white">
            <span className="mb-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-medium backdrop-blur sm:text-sm">
              Authentic Craftsmanship
            </span>

            <h2 className="mb-5 text-3xl font-black leading-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
              Handcrafted Since
              <br className="hidden sm:block" /> Generations
            </h2>

            <p className="mb-8 max-w-xl text-base leading-7 text-gray-200 md:mb-10 md:text-lg md:leading-8">
              Every pair of KOVHAR Kolhapuri chappals is handcrafted by skilled
              artisans using traditional techniques passed down through
              generations. Premium leather, timeless craftsmanship, and
              unmatched comfort come together in every step.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products?search=heritage")}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-500 px-6 py-4 text-base font-semibold text-black transition hover:bg-amber-400 sm:w-auto sm:px-8"
            >
              Shop Heritage Collection
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
