import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductFilters({ products, highestPrice }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Current Filters

  const currentCategory = searchParams.get("category") || "";

  const currentCollection = searchParams.get("collection") || "";

  const currentColor = searchParams.get("color") || "";

  const currentSize = searchParams.get("size") || "";

  const currentRating = searchParams.get("rating") || "";

  const minPrice = Number(searchParams.get("minPrice")) || 0;

  const maxPrice = Number(searchParams.get("maxPrice")) || highestPrice;

  const showCategoryFilter = !currentCategory;

  // Filter Options

  const categories = ["Men", "Women", "Kids"];

  const collections = useMemo(
    () =>
      [...new Set(products.map((p) => p.subCategory))].filter(Boolean).sort(),
    [products],
  );

  const colors = useMemo(
    () => [...new Set(products.map((p) => p.color))].filter(Boolean).sort(),
    [products],
  );

  const sizes = useMemo(
    () =>
      [
        ...new Set(products.flatMap((p) => p.sizes.map((s) => Number(s.size)))),
      ].sort((a, b) => a - b),
    [products],
  );

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    requestAnimationFrame(() => {
      setSearchParams(params, {
        replace: true,
        preventScrollReset: true,
      });
    });
  };

  const clearFilters = () => {
    const params = new URLSearchParams();

    if (currentCategory) {
      params.set("category", currentCategory);
    }

    setSearchParams(params, {
      replace: true,
      preventScrollReset: true,
    });
  };

  const Section = ({ title, children }) => (
    <div className="mb-8 border-b border-zinc-200 pb-6">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>

      <div className="space-y-3">{children}</div>
    </div>
  );

  return (
    <aside className="sticky top-24">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Filters</h2>

        <button
          onClick={clearFilters}
          className="text-sm font-medium text-amber-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Price */}
      <Section title="Price">
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Min</span>
              <span>₹{minPrice}</span>
            </div>

            <input
              type="range"
              min={0}
              max={highestPrice}
              step={100}
              value={minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-full accent-amber-600"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Max</span>
              <span>₹{maxPrice}</span>
            </div>

            <input
              type="range"
              min={0}
              max={highestPrice}
              step={100}
              value={maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="rounded-lg bg-amber-50 py-3 text-center font-semibold text-amber-700">
            ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
          </div>
        </div>
      </Section>
      {/* Colour */}

      <Section title="Colour">
        {colors.map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input
              type="radio"
              checked={currentColor === item}
              onChange={() => updateFilter("color", item)}
            />

            {item}
          </label>
        ))}
      </Section>

      {/* Size */}

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => updateFilter("size", String(size))}
              className={`h-10 w-10 rounded-lg border text-sm font-medium transition ${
                currentSize === String(size)
                  ? "border-black bg-black text-white"
                  : "border-zinc-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Section>
      {/* Category */}

      {showCategoryFilter && (
        <Section title="Category">
          {categories.map((item) => (
            <label key={item} className="flex items-center gap-3">
              <input
                type="radio"
                checked={currentCategory === item.toLowerCase()}
                onChange={() => updateFilter("category", item.toLowerCase())}
              />

              {item}
            </label>
          ))}
        </Section>
      )}

      {/* Rating */}

      <Section title="Rating">
        {[4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center gap-3">
            <input
              type="radio"
              name="rating"
              checked={currentRating === String(rating)}
              onChange={() => updateFilter("rating", String(rating))}
            />
            {rating} Stars & Above
          </label>
        ))}
      </Section>

      {/* Collection */}

      <Section title="Collection">
        {collections.map((item) => (
          <label key={item} className="flex items-center gap-3">
            <input
              type="radio"
              checked={currentCollection === item}
              onChange={() => updateFilter("collection", item)}
            />

            {item}
          </label>
        ))}
      </Section>
    </aside>
  );
}
