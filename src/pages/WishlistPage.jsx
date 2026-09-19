import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-zinc-900">My Wishlist</h1>

          <p className="mt-3 text-lg text-zinc-500">
            {wishlist.length} {wishlist.length === 1 ? "Product" : "Products"}
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="rounded-3xl bg-white py-24 text-center shadow-sm">
            <Heart className="mx-auto mb-6 text-zinc-300" size={60} />

            <h2 className="text-3xl font-bold text-zinc-900">
              Your wishlist is empty
            </h2>

            <p className="mt-4 text-zinc-500">
              Save your favourite Kolhapuri chappals here.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} fromWishlist />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
