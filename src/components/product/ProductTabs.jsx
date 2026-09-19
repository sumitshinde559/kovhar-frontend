import { useState } from "react";

const tabs = ["Description", "Features", "Care", "Shipping"];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="mt-20">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-zinc-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8">
        {activeTab === "Description" && (
          <div>
            <h3 className="mb-5 text-2xl font-bold">Product Description</h3>

            <p className="leading-8 text-zinc-600">
              {product.description ||
                "Every KOVHAR Kolhapuri chappal is handcrafted by skilled artisans using premium genuine leather. Combining traditional craftsmanship with modern comfort, each pair is designed for durability, elegance and everyday wear."}
            </p>
          </div>
        )}

        {activeTab === "Features" && (
          <div>
            <h3 className="mb-5 text-2xl font-bold">Features</h3>

            <ul className="grid gap-4 md:grid-cols-2">
              {(
                product.features || [
                  "Premium Genuine Leather",
                  "Handmade in Kolhapur",
                  "Traditional Craftsmanship",
                  "Comfort Fit",
                  "Durable Sole",
                  "Elegant Finish",
                ]
              ).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-xl bg-stone-50 p-4"
                >
                  <span className="text-lg text-green-600">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Care" && (
          <div>
            <h3 className="mb-5 text-2xl font-bold">Care Instructions</h3>

            <ul className="space-y-4 text-zinc-600">
              <li>• Clean using a soft dry cloth.</li>
              <li>• Avoid prolonged exposure to water.</li>
              <li>• Store in a cool, dry place.</li>
              <li>• Apply leather conditioner occasionally.</li>
              <li>• Do not machine wash.</li>
            </ul>
          </div>
        )}

        {activeTab === "Shipping" && (
          <div>
            <h3 className="mb-5 text-2xl font-bold">Shipping & Returns</h3>

            <div className="space-y-6">
              <div className="rounded-xl bg-stone-50 p-5">
                <h4 className="mb-2 font-semibold">Shipping</h4>

                <p className="text-zinc-600">
                  Free shipping across India. Orders are dispatched within 24–48
                  hours and typically delivered within 3–7 business days.
                </p>
              </div>

              <div className="rounded-xl bg-stone-50 p-5">
                <h4 className="mb-2 font-semibold">Returns</h4>

                <p className="text-zinc-600">
                  Enjoy hassle-free returns and exchanges within 7 days of
                  delivery, provided the product remains unused and in its
                  original condition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
