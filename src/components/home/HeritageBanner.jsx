import { ArrowRight } from "lucide-react";

export default function HeritageBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div
        className="relative overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/heritage-banner.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[520px] items-center px-10 md:px-20">
          <div className="max-w-2xl text-white">
            <span className="mb-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              Authentic Craftsmanship
            </span>

            <h2 className="mb-6 text-5xl font-black leading-tight md:text-6xl">
              Handcrafted Since
              <br />
              Generations
            </h2>

            <p className="mb-10 max-w-xl text-lg leading-8 text-gray-200">
              Every pair of KOVHAR Kolhapuri chappals is handcrafted by skilled
              artisans using traditional techniques passed down through
              generations. Premium leather, timeless craftsmanship, and
              unmatched comfort come together in every step.
            </p>

            <button className="inline-flex items-center gap-3 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-black transition hover:bg-amber-400">
              Shop Heritage Collection
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
