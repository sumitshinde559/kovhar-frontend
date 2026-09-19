import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistButton({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const active = isWishlisted(product._id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      className="rounded-full bg-white p-2 shadow transition hover:scale-110"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={20}
        className={active ? "fill-red-500 text-red-500" : "text-zinc-700"}
      />
    </button>
  );
}
