import { toast } from "react-hot-toast";

export const notify = {
  success: (message) => toast.success(message),

  error: (message) => toast.error(message),

  addedToCart: () => toast.success("Added to cart"),

  removedFromCart: () => toast.success("Removed from cart"),

  addedToWishlist: () => toast.success("Added to wishlist"),

  removedFromWishlist: () => toast.success("Removed from wishlist"),

  movedToWishlist: () => toast.success("Moved to wishlist"),

  movedToCart: () => toast.success("Moved to cart"),

  quantityIncreased: () => toast.success("Quantity increased"),

  quantityDecreased: () => toast.success("Quantity decreased"),

  sizeUpdated: () => toast.success("Size updated"),

  addressAdded: () => toast.success("Address added"),

  selectSize: () => toast.error("Please select a size"),

  orderPlaced: () => toast.success("Order placed successfully"),
};
