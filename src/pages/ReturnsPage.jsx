import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    title: "Initiate a Return",
    body: 'Email us at hello@kovhar.com with your order ID and reason for return within 7 days of delivery.',
  },
  {
    number: "02",
    title: "Get Approval",
    body: "Our support team will review your request and send a return authorisation within 1–2 business days.",
  },
  {
    number: "03",
    title: "Ship the Item",
    body: "Pack the item in its original packaging and hand it to our courier partner (pickup arranged by us).",
  },
  {
    number: "04",
    title: "Refund / Exchange",
    body: "Once we receive and inspect the item, a refund or exchange is processed within 5–7 business days.",
  },
];

const ELIGIBLE = [
  "Item received in a defective or damaged condition",
  "Wrong product delivered",
  "Size mismatch (when a size guide was not consulted)",
  "Item not as described on the product page",
];

const NOT_ELIGIBLE = [
  "Items that have been worn, washed, or altered",
  "Products without original tags or packaging",
  "Returns requested after 7 days of delivery",
  "Customised or made-to-order products",
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <RotateCcw size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Returns & Refunds
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            We want you to love every pair. If something isn't right, we'll make it right.
          </p>
        </div>

        {/* Policy Highlight */}
        <div className="mt-12 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-5 text-center">
          <p className="font-semibold text-amber-800">
            7-Day Return Window &nbsp;·&nbsp; Free Pickup &nbsp;·&nbsp; Easy Refunds
          </p>
        </div>

        {/* Return Steps */}
        <div className="mt-14">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">How to Return</h2>
          <div className="space-y-4">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
              >
                <span className="shrink-0 text-3xl font-black text-amber-400 leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-zinc-900">Eligible for Return</h2>
            <ul className="space-y-3">
              {ELIGIBLE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-600">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-green-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-bold text-zinc-900">Not Eligible for Return</h2>
            <ul className="space-y-3">
              {NOT_ELIGIBLE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-600">
                  <XCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Note */}
        <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 font-bold text-zinc-900">Refund Method</h2>
          <p className="text-sm leading-6 text-zinc-500">
            Approved refunds are credited to your original payment method (UPI, card, net
            banking) within <span className="font-semibold text-zinc-800">5–7 business days</span> of
            us receiving the returned item. For cash-on-delivery orders, refunds are
            processed via bank transfer — we'll reach out to collect the details.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-[#5B3A29] px-8 py-10 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="font-bold text-white">Ready to initiate a return?</p>
            <p className="mt-1 text-sm text-stone-300">
              Our support team responds within 24 hours on business days.
            </p>
          </div>
          <a
            href="mailto:hello@kovhar.com"
            className="flex shrink-0 items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
          >
            <Mail size={16} />
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
