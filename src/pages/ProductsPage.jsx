import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { getProducts } from "../api/productApi";

import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import ProductToolbar from "../components/product/ProductToolbar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // URL Filters

  const category = searchParams.get("category") || "";
  const collection = searchParams.get("collection") || "";
  const color = searchParams.get("color") || "";
  const size = searchParams.get("size") || "";
  const rating = Number(searchParams.get("rating")) || 0;

  const minPrice = Number(searchParams.get("minPrice")) || 0;

  const search = searchParams.get("search")?.toLowerCase() || "";

  const sort = searchParams.get("sort") || "newest";

  // Highest Product Price

  const highestPrice = useMemo(() => {
    if (!products.length) return 5000;

    return Math.max(
      ...products.map((product) => product.discountPrice || product.price),
    );
  }, [products]);

  const maxPrice = Number(searchParams.get("maxPrice")) || highestPrice;

  // Category Products

  const baseProducts = useMemo(() => {
    if (!category) return products;

    return products.filter((product) =>
      product.category?.some(
        (cat) => cat.toLowerCase() === category.toLowerCase(),
      ),
    );
  }, [products, category]);

  // Final Products

  const filteredProducts = useMemo(() => {
    let data = [...baseProducts];

    if (collection) {
      data = data.filter((product) => product.subCategory === collection);
    }

    if (color) {
      data = data.filter((product) => product.color === color);
    }

    if (size) {
      data = data.filter((product) =>
        product.sizes?.some((item) => String(item.size) === size),
      );
    }

    if (rating) {
      data = data.filter((product) => product.rating >= rating);
    }

    data = data.filter((product) => {
      const price = product.discountPrice || product.price;

      return price >= minPrice && price <= maxPrice;
    });

    if (search) {
      data = data.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search) ||
          product.color?.toLowerCase().includes(search) ||
          product.subCategory?.toLowerCase().includes(search) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(search))
        );
      });
    }

    switch (sort) {
      case "price-low":
        data.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
        );
        break;

      case "price-high":
        data.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
        );
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "name-asc":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [
    baseProducts,
    collection,
    color,
    size,
    rating,
    minPrice,
    maxPrice,
    search,
    sort,
  ]);

  const pageTitle = category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)} Collection`
    : "All Collections";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-zinc-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-zinc-50">
      {/* Breadcrumb */}

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-5 text-sm text-zinc-500">
          <Link to="/" className="hover:text-black">
            Home
          </Link>

          <ChevronRight size={16} />

          <span className="font-medium text-zinc-900">{pageTitle}</span>
        </div>
      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-black text-zinc-900">{pageTitle}</h1>

          <p className="mt-3 text-zinc-500">
            {filteredProducts.length} Products
          </p>
        </div>

        <div className="flex items-start gap-10">
          <aside className="sticky top-24 hidden w-72 shrink-0 self-start lg:block">
            <ProductFilters
              products={baseProducts}
              highestPrice={highestPrice}
            />
          </aside>

          <section className="min-w-0 flex-1">
            <ProductToolbar totalProducts={filteredProducts.length} />

            {filteredProducts.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white py-24 text-center">
                <h2 className="text-2xl font-semibold">No products found</h2>

                <p className="mt-3 text-zinc-500">Try changing your filters.</p>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
