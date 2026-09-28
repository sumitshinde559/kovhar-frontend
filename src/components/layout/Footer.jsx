import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa6";
import { notify } from "../../utils/toast";

const SHOP_LINKS = [
  { label: "Men", path: "/products?category=men" },
  { label: "Women", path: "/products?category=women" },
  { label: "Kids", path: "/products?category=kids" },
  { label: "Collections", path: "/products" },
  { label: "Best Sellers", path: "/products?sort=rating" },
  { label: "New Arrivals", path: "/products?sort=newest" },
];

const CARE_LINKS = [
  { label: "Track Order", path: "/track-order" },
  { label: "Shipping", path: "/shipping" },
  { label: "Returns", path: "/returns" },
  { label: "FAQs", path: "/faqs" },
  { label: "Size Guide", path: "/size-guide" },
];

// Replace these with your real profile URLs
const SOCIAL_LINKS = [
  { label: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/" },
  { label: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/" },
  { label: "Pinterest", icon: FaPinterestP, url: "https://www.pinterest.com/" },
  { label: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/" },
];

const linkClass = "transition hover:text-amber-400";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      notify.error("Enter a valid email address");
      return;
    }

    // TODO: connect to a backend endpoint, e.g. POST `${API_URL}/newsletter`
    notify.success("You're subscribed to KOVHAR updates");
    setEmail("");
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-stone-800 bg-[#181512] text-stone-300 md:mt-32">
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 translate-x-10 translate-y-8 text-[160px] font-black text-white/[0.02] md:text-[260px]"
      >
        K
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-16">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-4">
              <img
                src="/images/KovharLogo.png"
                alt="KOVHAR"
                className="h-12 w-12 rounded-xl object-contain md:h-14 md:w-14"
              />

              <span className="text-3xl font-bold tracking-wide text-white md:text-4xl">
                KOVHAR
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-stone-400 md:leading-8">
              Authentic handcrafted Kolhapuri chappals from the artisans of
              Kolhapur. Every pair is made using premium leather and traditional
              craftsmanship passed down through generations.
            </p>

            {/* Newsletter */}
            <div className="mt-10 max-w-md">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Stay Updated
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="flex overflow-hidden rounded-xl"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none sm:px-5"
                />

                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-2 bg-amber-500 px-4 font-semibold text-black transition hover:bg-amber-400 sm:px-6"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-8 flex gap-4">
                {SOCIAL_LINKS.map(({ label, icon: Icon, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`KOVHAR on ${label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-700 transition hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop">
            <h3 className="mb-6 text-lg font-semibold text-white">Shop</h3>

            <ul className="space-y-4 text-sm text-stone-400">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Customer Care */}
          <nav aria-label="Customer care">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Customer Care
            </h3>

            <ul className="space-y-4 text-sm text-stone-400">
              {CARE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>

            <address className="space-y-6 text-sm not-italic">
              <div className="flex gap-4">
                <MapPin size={20} className="mt-1 shrink-0 text-amber-400" />
                <span className="leading-6">
                  Kolhapur,
                  <br />
                  Maharashtra, India
                </span>
              </div>

              <a href="tel:+918877446363" className={`flex gap-4 ${linkClass}`}>
                <Phone size={20} className="mt-0.5 shrink-0 text-amber-400" />
                <span>+91 88774 46363</span>
              </a>

              <a
                href="mailto:hello@kovhar.com"
                className={`flex gap-4 ${linkClass}`}
              >
                <Mail size={20} className="mt-0.5 shrink-0 text-amber-400" />
                <span>hello@kovhar.com</span>
              </a>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-stone-800 pt-8 md:mt-20">
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