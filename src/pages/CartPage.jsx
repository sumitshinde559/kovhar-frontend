import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            Shopping Cart
          </h1>

          <div className="mt-12 rounded-3xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-zinc-500">
              Add some products to your cart to get started.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}

        <div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl">
            Shopping Cart
          </h1>

          <p className="mt-4 text-2xl text-zinc-500">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </p>
        </div>

        {/* Cart Content */}

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}

          <div className="space-y-6 lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={`${item._id}-${item.selectedSize}`}
                product={item}
              />
            ))}
          </div>

          {/* Price Summary */}

          <div className="lg:col-span-1">
            <CartSummary cart={cart} />
          </div>
        </div>
      </div>
    </main>
  );
}
