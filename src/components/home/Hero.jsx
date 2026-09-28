import heroImage from "../../assets/images/Hero.png";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="mt-4 md:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8D8C4] via-[#F3E4D2] to-[#EAD6BE] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Image: on top for mobile, right side on desktop */}
        <div className="order-first lg:order-last h-72 sm:h-96 lg:h-full">
          <img
            src={heroImage}
            alt="Handcrafted Kolhapuri Chappals"
            className="h-full w-full object-cover"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
          <div className="max-w-xl">
            <span className="mb-5 inline-flex items-center whitespace-nowrap rounded-full bg-[#F3E4D2] px-4 py-2 text-sm font-medium text-[#5B3A29]">
              Handmade in Kolhapur
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Handcrafted
              <br />
              Kolhapuri Chappals
              <br />
              For Every Step
            </h1>
            <p className="max-w-md text-stone-600 text-base sm:text-lg leading-7 sm:leading-8 mt-6 sm:mt-8">
              Experience the timeless craftsmanship of authentic Kolhapuri
              footwear, handcrafted for style, comfort, and everyday elegance.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="group mt-8 sm:mt-10 flex w-full sm:w-fit items-center justify-center gap-2 rounded-full bg-[#5B3A29] px-8 py-4 text-base sm:text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#43281D] hover:shadow-xl"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
