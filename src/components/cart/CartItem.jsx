import { Trash2, Heart } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function CartItem({ product }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart, updateSize } =
    useCart();

  const { addToWishlist, isWishlisted } = useWishlist();

  const price = product.discountPrice || product.price;

  const cartItem = {
    _id: product._id,
    selectedSize: product.selectedSize,
  };

  const handleIncrease = () => {
    increaseQuantity(cartItem);
    toast.success("Quantity increased");
  };

  const handleDecrease = () => {
    decreaseQuantity(cartItem);

    if (product.quantity === 1) {
      toast.success("Removed from cart");
    } else {
      toast.success("Quantity decreased");
    }
  };

  const handleRemove = () => {
    removeFromCart(cartItem);
    toast.success("Removed from cart");
  };

  const handleMoveToWishlist = () => {
    if (!isWishlisted(product._id)) {
      addToWishlist(product);
    }

    removeFromCart(cartItem);

    toast.success("Moved to wishlist");
  };

  const handleSizeChange = (event) => {
    const newSize = Number(event.target.value);

    updateSize(product._id, product.selectedSize, newSize);

    toast.success("Size updated");
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm md:flex-row">
      {/* Image */}

      <div className="h-44 w-44 shrink-0 overflow-hidden rounded-2xl border bg-white">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Details */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">{product.name}</h2>

          <p className="mt-2 text-zinc-500">{product.subCategory}</p>

          <div className="mt-3 flex items-center gap-4">
            <span className="text-2xl font-bold">
              ₹{price.toLocaleString()}
            </span>

            {product.discountPrice && (
              <span className="text-lg text-zinc-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Size */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">Size</label>

            <select
              value={product.selectedSize}
              onChange={handleSizeChange}
              className="rounded-lg border border-zinc-300 px-3 py-2"
            >
              {product.sizes?.map((size) => (
                <option key={size.size} value={size.size}>
                  UK {size.size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity */}

        <div className="mt-6 flex w-fit items-center rounded-xl border border-zinc-200">
          <button
            type="button"
            onClick={handleDecrease}
            className="px-4 py-2 text-lg hover:bg-zinc-100"
          >
            −
          </button>

          <span className="min-w-12 text-center font-semibold">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            className="px-4 py-2 text-lg hover:bg-zinc-100"
          >
            +
          </button>
        </div>

        {/* Actions */}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Remove
          </button>

          <button
            type="button"
            onClick={handleMoveToWishlist}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100"
          >
            <Heart size={18} />
            Move to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
