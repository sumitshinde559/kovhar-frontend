import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import WishlistButton from "./WishlistButton";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { notify } from "../../utils/toast";

export default function ProductCard({ product, fromWishlist = false }) {
  const { addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();

  const handleAddToCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const defaultSize = product.sizes?.find((item) => item.stock > 0)?.size;

    if (!defaultSize) {
      notify.error("Product is out of stock");
      return;
    }

    addToCart({
      ...product,
      selectedSize: defaultSize,
      quantity: 1,
    });

    notify.addedToCart();

    // If this card is being displayed inside Wishlist,
    // remove the product from Wishlist after adding to Cart.
    if (fromWishlist) {
      await removeFromWishlist(product._id);
      notify.movedToCart();
    }
  };

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Wishlist */}
          <div className="absolute right-4 top-4">
            <WishlistButton product={product} />
          </div>
        </div>

        {/* Product Information */}
        <div className="p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-600">
            {product.category?.join(" • ")}
          </p>

          <h3 className="text-lg font-bold text-zinc-900">{product.name}</h3>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-semibold">⭐ {product.rating}</span>

            <span className="text-sm text-zinc-400">
              ({product.totalReviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-black text-zinc-900">
              ₹{(product.discountPrice || product.price).toLocaleString()}
            </span>

            {product.discountPrice && (
              <span className="text-sm text-zinc-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-zinc-800"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
