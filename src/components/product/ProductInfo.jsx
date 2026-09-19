import { useEffect, useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Hammer,
  Heart,
} from "lucide-react";

import QuantitySelector from "./QuantitySelector";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { notify } from "../../utils/toast";

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (!product) return;

    setSelectedSize(product.sizes?.[0]?.size || "");
    setQuantity(1);
  }, [product]);

  const price = product.discountPrice || product.price;

  const discount =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      notify.selectSize();
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity,
    });

    notify.addedToCart();
  };

  const handleWishlist = () => {
    const wishlisted = isWishlisted(product._id);

    toggleWishlist(product);

    if (wishlisted) {
      notify.removedFromWishlist();
    } else {
      notify.addedToWishlist();
    }
  };

  return (
    <div>
      {/* Category */}

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
        {product.category?.join(" • ")}
      </p>

      {/* Name */}

      <h1 className="mt-3 text-4xl font-black text-zinc-900">{product.name}</h1>

      {/* Rating */}

      <div className="mt-5 flex items-center gap-3">
        <div className="flex text-amber-500">
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={18} fill="currentColor" />
          ))}
        </div>

        <span className="font-semibold">{product.rating}</span>

        <span className="text-zinc-500">({product.totalReviews} Reviews)</span>
      </div>

      {/* Price */}

      <div className="mt-8 flex items-center gap-4">
        <span className="text-4xl font-black">₹{price.toLocaleString()}</span>

        {product.discountPrice && (
          <>
            <span className="text-xl text-zinc-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Description */}

      <p className="mt-8 leading-8 text-zinc-600">{product.description}</p>

      {/* Size */}

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Size</h3>

          <button
            type="button"
            className="text-sm text-amber-600 hover:underline"
          >
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {product.sizes?.map((item) => (
            <button
              key={item.size}
              type="button"
              disabled={item.stock === 0}
              onClick={() => setSelectedSize(item.size)}
              className={`h-12 w-12 rounded-xl border font-semibold transition ${
                selectedSize === item.size
                  ? "border-black bg-black text-white"
                  : "border-zinc-300 hover:border-black"
              } ${item.stock === 0 ? "cursor-not-allowed opacity-40" : ""}`}
            >
              {item.size}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          Selected Size
          <span className="ml-2 font-semibold text-black">
            UK {selectedSize}
          </span>
        </p>
      </div>

      {/* Quantity */}

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-semibold">Quantity</h3>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </div>

      {/* Trust */}

      <div className="mt-10 space-y-4 rounded-2xl bg-stone-50 p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-green-600" />
          Premium Genuine Leather
        </div>

        <div className="flex items-center gap-3">
          <Hammer size={20} className="text-amber-600" />
          Handmade in Kolhapur
        </div>

        <div className="flex items-center gap-3">
          <Truck size={20} className="text-blue-600" />
          Free Shipping Across India
        </div>

        <div className="flex items-center gap-3">
          <RotateCcw size={20} className="text-purple-600" />
          Easy {product.deliveryInfo?.returnDays}
          Day Returns
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
        >
          Add to Cart
        </button>

        <button
          type="button"
          onClick={handleWishlist}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-300 transition hover:bg-zinc-100"
        >
          <Heart
            size={22}
            className={
              isWishlisted(product._id) ? "fill-red-500 text-red-500" : ""
            }
          />
        </button>
      </div>

      {/* Delivery */}

      <div className="mt-10 rounded-2xl border border-zinc-200 p-6">
        <div className="flex justify-between">
          <span className="text-zinc-500">Free Delivery</span>

          <span className="font-medium">
            {product.deliveryInfo?.estimatedDays} Business Days
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span className="text-zinc-500">Returns</span>

          <span className="font-medium">
            {product.deliveryInfo?.returnDays} Days Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
}
