import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product/ProductCard";

const CATEGORIES = ["All", "Men", "Women", "Kids"];

export default function FeaturedCollection({ products = [] }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    const featured = products.filter((product) => product.isFeatured);

    if (activeCategory === "All") return featured;

    return featured.filter((product) =>
      product.category?.some(
        (cat) => cat.toLowerCase() === activeCategory.toLowerCase(),
      ),
    );
  }, [products, activeCategory]);

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-14">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
            Premium Collection
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Featured Collection
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-500 md:text-lg">
            Discover handcrafted Kolhapuri chappals made from genuine leather,
            blending timeless tradition with modern elegance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-4 md:mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-3 ${
                activeCategory === category
                  ? "bg-stone-900 text-white shadow-lg"
                  : "border border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:bg-stone-900 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center md:py-20">
            <p className="text-base text-stone-500 md:text-lg">
              No products found in this category.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-10 flex justify-center md:mt-14">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="w-full rounded-full border border-stone-900 px-8 py-3 font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white sm:w-auto"
          >
            View Full Collection →
          </button>
        </div>
      </div>
    </section>
  );
}
