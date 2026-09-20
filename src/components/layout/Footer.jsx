import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-stone-800 bg-[#181512] text-stone-300">
      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-0 right-0 translate-x-10 translate-y-8 text-[260px] font-black text-white/[0.02]">
        K
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img
                src="images/KovharLogo.png"
                alt="KOVHAR"
                className="h-14 w-14 rounded-xl object-contain"
              />

              <h2 className="text-4xl font-bold tracking-wide text-white">
                KOVHAR
              </h2>
            </div>

            <p className="mt-6 max-w-md leading-8 text-stone-400">
              Authentic handcrafted Kolhapuri chappals from the artisans of
              Kolhapur. Every pair is made using premium leather and traditional
              craftsmanship passed down through generations.
            </p>

            {/* Newsletter */}
            <div className="mt-10 max-w-md">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Stay Updated
              </h3>

              <div className="flex overflow-hidden rounded-xl">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white px-5 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                />

                <button className="flex items-center gap-2 bg-amber-500 px-6 font-semibold text-black transition hover:bg-amber-400">
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="mt-8 flex gap-4">
                {[FaInstagram, FaFacebookF, FaPinterestP, FaYoutube].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                    >
                      <Icon size={17} />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Shop</h3>

            <ul className="space-y-4 text-sm text-stone-400">
              {[
                "Men",
                "Women",
                "Kids",
                "Collections",
                "Best Sellers",
                "New Arrivals",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition hover:text-amber-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">
              Customer Care
            </h3>

            <ul className="space-y-4 text-sm text-stone-400">
              {["Track Order", "Shipping", "Returns", "FAQs", "Size Guide"].map(
                (item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition hover:text-amber-400"
                  >
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <MapPin size={20} className="mt-1 shrink-0 text-amber-400" />
                <span className="leading-6">
                  Kolhapur,
                  <br />
                  Maharashtra, India
                </span>
              </div>

              <div className="flex gap-4">
                <Phone size={20} className="mt-1 shrink-0 text-amber-400" />
                <span>+91 8877446363</span>
              </div>

              <div className="flex gap-4">
                <Mail size={20} className="mt-1 shrink-0 text-amber-400" />
                <span>hello@kovhar.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-stone-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm tracking-wide text-stone-500">
              Handcrafted in Kolhapur • Genuine Leather • Made in India
            </p>

            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} KOVHAR. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
