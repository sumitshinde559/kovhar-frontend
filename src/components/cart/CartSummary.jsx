import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function CartSummary({ cart }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const mrp = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const sellingPrice = cart.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  const discount = mrp - sellingPrice;

  const shipping = sellingPrice > 1999 ? 0 : 199;

  const grandTotal = sellingPrice + shipping;

  return (
    <aside className="sticky top-24 rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="border-b pb-5 text-2xl font-bold">Price Details</h2>

      <div className="mt-6 space-y-5 text-zinc-700">
        {/* Price */}
        <div className="flex justify-between">
          <span>
            Price ({totalItems} {totalItems === 1 ? "Item" : "Items"})
          </span>

          <span>₹{mrp.toLocaleString()}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-green-600">
          <span>Discount</span>

          <span>−₹{discount.toLocaleString()}</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between">
          <span>Delivery</span>

          <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between text-xl font-bold">
          <span>Total Amount</span>

          <span>₹{grandTotal.toLocaleString()}</span>
        </div>

        {/* Savings */}
        <p className="rounded-xl bg-green-50 p-3 text-center text-sm font-medium text-green-700">
          You save ₹{discount.toLocaleString()} on this order.
        </p>

        {/* Checkout */}
        <Link
          to="/checkout"
          className="mt-4 block rounded-2xl bg-black py-4 text-center font-semibold text-white transition hover:bg-zinc-800"
        >
          Proceed to Checkout
        </Link>
      </div>

      {/* Information */}
      <div className="mt-8 space-y-4 border-t pt-6 text-sm text-zinc-600">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-green-600" />
          Secure Checkout
        </div>

        <div className="flex items-center gap-3">
          <Truck size={18} className="text-blue-600" />
          Free Shipping Above ₹1,999
        </div>

        <div className="flex items-center gap-3">
          <RotateCcw size={18} className="text-purple-600" />
          Easy Returns
        </div>
      </div>
    </aside>
  );
}
