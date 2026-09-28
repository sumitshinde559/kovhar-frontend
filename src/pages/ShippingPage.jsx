import { Truck, Clock, Package, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SHIPPING_OPTIONS = [
  {
    title: "Standard Delivery",
    time: "5–7 Business Days",
    price: "₹99",
    description: "Delivered to your doorstep across India via trusted courier partners.",
  },
  {
    title: "Express Delivery",
    time: "2–3 Business Days",
    price: "₹199",
    description: "Faster dispatch, prioritised handling. Available for most pin codes.",
  },
  {
    title: "Free Shipping",
    time: "5–7 Business Days",
    price: "Free",
    description: "On all orders above ₹1,499. Automatically applied at checkout.",
    highlight: true,
  },
];

const POLICIES = [
  {
    icon: Clock,
    title: "Processing Time",
    body: "All orders are processed within 1–2 business days. Orders placed on weekends or public holidays are processed on the next working day.",
  },
  {
    icon: MapPin,
    title: "Delivery Coverage",
    body: "We ship pan-India. Remote pin codes may take 1–2 additional days. International shipping is currently unavailable.",
  },
  {
    icon: Package,
    title: "Packaging",
    body: "Every pair is carefully packaged in our signature KOVHAR box to ensure it reaches you in perfect condition.",
  },
  {
    icon: ShieldCheck,
    title: "Tracking",
    body: "A tracking link is sent to your registered email once your order is dispatched. You can also track your order on our Track Order page.",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <Truck size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Shipping Information
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            Everything you need to know about how we deliver your handcrafted Kolhapuri chappals.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mt-14">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">Delivery Options</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {SHIPPING_OPTIONS.map((opt) => (
              <div
                key={opt.title}
                className={`rounded-2xl border p-6 ${
                  opt.highlight
                    ? "border-amber-300 bg-amber-50"
                    : "border-zinc-100 bg-white"
                } shadow-sm`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-zinc-900">{opt.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      opt.highlight
                        ? "bg-amber-500 text-white"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {opt.price}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-amber-600">{opt.time}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Details */}
        <div className="mt-14">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">Shipping Policies</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {POLICIES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                  <Icon size={22} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-zinc-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-[#5B3A29] px-8 py-10 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="font-bold text-white">Need to track your order?</p>
            <p className="mt-1 text-sm text-stone-300">
              Use our order tracking tool to get real-time updates.
            </p>
          </div>
          <Link
            to="/track-order"
            className="flex shrink-0 items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
          >
            Track Order <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
