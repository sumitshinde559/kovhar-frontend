import { useState } from "react";
import { Package, Truck, CheckCircle2, Clock, Search, MapPin } from "lucide-react";

const STATUS_STEPS = [
  { id: "placed", label: "Order Placed", icon: Package },
  { id: "processing", label: "Processing", icon: Clock },
  { id: "shipped", label: "Shipped", icon: Truck },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <Package size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Track Your Order
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            Enter your order details below to check the status of your shipment.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="order-id"
                className="mb-2 block text-sm font-semibold text-zinc-700"
              >
                Order ID
              </label>
              <input
                id="order-id"
                type="text"
                placeholder="e.g. KOV-2024-001234"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div>
              <label
                htmlFor="track-email"
                className="mb-2 block text-sm font-semibold text-zinc-700"
              >
                Email Address
              </label>
              <input
                id="track-email"
                type="email"
                placeholder="Email used during checkout"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B3A29] py-3.5 font-semibold text-white transition hover:bg-[#4a2e20]"
            >
              <Search size={18} />
              Track Order
            </button>
          </div>
        </form>

        {/* Mock Result */}
        {submitted && (
          <div className="mt-8 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Order
                </p>
                <p className="mt-1 text-lg font-bold text-zinc-900">{orderId}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700">
                In Transit
              </span>
            </div>

            {/* Timeline */}
            <div className="relative mt-6">
              {STATUS_STEPS.map((step, idx) => {
                const isActive = idx <= 2;
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isActive
                            ? "bg-amber-500 text-white"
                            : "bg-zinc-100 text-zinc-400"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      {idx < STATUS_STEPS.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 my-1 ${
                            isActive ? "bg-amber-400" : "bg-zinc-200"
                          }`}
                          style={{ minHeight: "24px" }}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? "text-zinc-900" : "text-zinc-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {idx === 0 && "Your order has been placed successfully."}
                          {idx === 1 && "We're preparing your handcrafted pair."}
                          {idx === 2 && "Your order is on its way to you."}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
              <MapPin size={16} className="text-amber-500" />
              Expected delivery in <span className="font-semibold text-zinc-800">&nbsp;2–3 business days</span>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-zinc-400">
          Need help?{" "}
          <a
            href="mailto:hello@kovhar.com"
            className="font-medium text-amber-600 hover:text-amber-500"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
