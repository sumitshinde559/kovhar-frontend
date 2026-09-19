import { useMemo, useState } from "react";
import ProductCard from "../product/ProductCard";

export default function FeaturedCollection({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Men", "Women", "Kids"];

  const filteredProducts = useMemo(() => {
    let data = products.filter((product) => product.isFeatured);
    if (activeCategory !== "All") {
      data = data.filter((product) =>
        product.category?.some(
          (cat) => cat.toLowerCase() === activeCategory.toLowerCase(),
        ),
      );
    }
    return data;
  }, [products, activeCategory]);

  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
            Premium Collection
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Featured Collection
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-500">
            Discover handcrafted Kolhapuri chappals made from genuine leather,
            blending timeless tradition with modern elegance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 py-20 text-center">
            <p className="text-lg text-stone-500">
              No products found in this category.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-14 flex justify-center">
          <button className="rounded-full border border-stone-900 px-8 py-3 font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white">
            View Full Collection →
          </button>
        </div>
      </div>
    </section>
  );
}
