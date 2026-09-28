import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 5–7 business days. Express delivery (2–3 business days) is available at checkout. Orders placed on weekends or holidays are processed the next working day.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! All orders above ₹1,499 qualify for free standard shipping. The discount is applied automatically at checkout.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order is dispatched, you'll receive an email with a tracking link. You can also use our Track Order page with your order ID and email.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "Orders can be modified or cancelled within 2 hours of placement. Please contact us immediately at hello@kovhar.com. Once dispatched, cancellations are not possible.",
      },
    ],
  },
  {
    category: "Products & Quality",
    items: [
      {
        q: "Are KOVHAR chappals made from genuine leather?",
        a: "Yes, every pair is crafted from premium, vegetable-tanned genuine leather sourced locally in Kolhapur. We do not use synthetic or faux leather in our products.",
      },
      {
        q: "How long do Kolhapuri chappals last?",
        a: "With proper care, a quality pair of Kolhapuri chappals can last 3–5 years. Avoid prolonged exposure to water and store in a cool, dry place when not in use.",
      },
      {
        q: "Do the chappals come with any warranty?",
        a: "We offer a 30-day quality guarantee on all products. If you experience any craftsmanship defects within this period, we will repair or replace the item at no cost.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for items that are defective, damaged, or incorrectly delivered. Items must be unused and in their original packaging.",
      },
      {
        q: "How do I initiate a return?",
        a: "Email hello@kovhar.com with your order ID and the reason for the return. Our team will respond within 1–2 business days with return instructions and arrange a free pickup.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5–7 business days of us receiving the returned item. The amount is credited to your original payment method.",
      },
    ],
  },
  {
    category: "Sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "We recommend visiting our Size Guide page, where you'll find a detailed measurement chart and fitting tips for men, women, and kids.",
      },
      {
        q: "Do KOVHAR chappals run true to size?",
        a: "Our sizes follow standard Indian sizing. If you are between two sizes, we recommend sizing up for a more comfortable fit, especially for wider feet.",
      },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery for eligible pin codes.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. All transactions are secured with SSL encryption. We do not store your card details on our servers.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-zinc-800">{q}</span>
        <ChevronDown
          size={20}
          className={`mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-7 text-zinc-500">{a}</p>
      )}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <HelpCircle size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            Can't find your answer? Reach us at{" "}
            <a
              href="mailto:hello@kovhar.com"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              hello@kovhar.com
            </a>
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="mt-14 space-y-6">
          {FAQS.map((section) => (
            <div
              key={section.category}
              className="rounded-3xl border border-zinc-100 bg-white px-6 py-2 shadow-sm"
            >
              <h2 className="border-b border-zinc-100 py-5 text-sm font-bold uppercase tracking-widest text-amber-600">
                {section.category}
              </h2>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-12 rounded-3xl bg-[#5B3A29] px-8 py-10 text-center">
          <p className="text-lg font-bold text-white">Still have questions?</p>
          <p className="mt-2 text-sm text-stone-300">
            Our team is happy to help. We typically respond within a few hours.
          </p>
          <a
            href="mailto:hello@kovhar.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
