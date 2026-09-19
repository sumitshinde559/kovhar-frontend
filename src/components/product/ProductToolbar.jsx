import { useSearchParams } from "react-router-dom";

export default function ProductToolbar({ totalProducts }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", e.target.value);

    setSearchParams(params);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900">Products</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Showing{" "}
          <span className="font-semibold text-zinc-900">{totalProducts}</span>{" "}
          product{totalProducts !== 1 && "s"}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm font-medium text-zinc-700">
          Sort By
        </label>

        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        >
          <option value="newest">Newest</option>

          <option value="price-low">Price: Low to High</option>

          <option value="price-high">Price: High to Low</option>

          <option value="rating">Highest Rated</option>

          <option value="name-asc">Name: A - Z</option>

          <option value="name-desc">Name: Z - A</option>
        </select>
      </div>
    </div>
  );
}
