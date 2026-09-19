import heroImage from "../../assets/images/Hero.png";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8D8C4] via-[#F3E4D2] to-[#EAD6BE] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col justify-center px-16 py-14">
          <div className="max-w-xl">
            <span className="mb-6 inline-flex items-center rounded-full bg-[#F3E4D2] px-4 py-2 text-sm font-medium text-[#5B3A29]">
              Handmade in Kolhapur
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Handcrafted
              <br />
              Kolhapuri Chappals
              <br />
              For Every Step
            </h1>
            <p className="max-w-md text-stone-600 text-lg leading-8 mt-8">
              Experience the timeless craftsmanship of authentic Kolhapuri
              footwear, handcrafted for style, comfort, and everyday elegance.
            </p>
            <button className="group mt-10 flex w-fit items-center gap-2 rounded-full bg-[#5B3A29] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#43281D] hover:shadow-xl">
              Shop Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="">
          <img
            src={heroImage}
            alt="Handcrafted Kolhapuri Chappals"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
