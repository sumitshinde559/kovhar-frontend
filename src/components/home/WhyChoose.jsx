import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Hammer,
  Gem,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Genuine Leather",
    description: "Premium handcrafted leather sourced for lasting quality.",
  },
  {
    icon: Hammer,
    title: "Handmade in Kolhapur",
    description: "Crafted by skilled artisans using traditional techniques.",
  },
  {
    icon: Gem,
    title: "Premium Craftsmanship",
    description:
      "Meticulously handcrafted with attention to every stitch and detail.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free delivery across India on every order.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free 7-day return and exchange policy.",
  },
  // {
  //   icon: CreditCard,
  //   title: "Secure Payments",
  //   description: "100% safe and encrypted checkout experience.",
  // },
];

export default function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Why Choose Us
        </p>

        <h2 className="text-5xl font-black text-zinc-900">Why Choose KOVHAR</h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-500">
          Every pair is handcrafted with premium leather and traditional
          Kolhapuri craftsmanship, delivering comfort, durability and timeless
          style.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Icon size={30} strokeWidth={2} />
              </div>

              <h3 className="mb-3 text-lg font-bold text-zinc-900">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-zinc-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
