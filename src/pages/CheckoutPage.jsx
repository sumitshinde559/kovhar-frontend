import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Plus, CheckCircle, Loader2, PackageCheck } from "lucide-react";
import { notify } from "../utils/toast";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import AddressForm from "../components/address/AddressForm";

export default function CheckoutPage() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const { cart, clearCart } = useCart();
  const { addresses, selectAddress } = useAddress();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const selectedAddress = addresses.find((address) => address.selected);

  const subtotal = cart.reduce(
    (total, item) => total + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  const shipping = subtotal > 1999 ? 0 : 199;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedAddress || isPlacingOrder) return;

    const token = localStorage.getItem("token");

    if (!token) {
      notify.error("Please login before placing your order.");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderItems = cart.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.images?.[0] || "",
        price: item.discountPrice || item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize || null,
      }));

      const deliveryAddress = {
        fullName: selectedAddress.name,
        phone: selectedAddress.phone,
        street: selectedAddress.address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postcode: selectedAddress.postcode,
        country: "India",
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          deliveryAddress,
          subtotal,
          shipping,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      // Backend successfully created the order
      setOrderPlaced(true);

      // Clear cart only after successful order creation
      clearCart();

      notify.orderPlaced();

      console.log("Order created:", data.order);
    } catch (error) {
      console.error("Place order error:", error);

      notify.error(error.message || "Unable to place your order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-4xl font-black text-zinc-900">
            Your cart is empty
          </h1>

          <p className="mt-4 text-zinc-500">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
          >
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-black text-zinc-900">Checkout</h1>

          <p className="mt-3 text-zinc-500">
            Complete your order by selecting a delivery address.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* ADDRESS */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Select where you want your order delivered.
                  </p>
                </div>

                <MapPin className="text-zinc-700" />
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
                  <MapPin size={40} className="mx-auto mb-4 text-zinc-300" />

                  <h3 className="font-semibold text-zinc-900">
                    No delivery address
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Add an address to continue with your order.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <button
                      key={address.id}
                      type="button"
                      onClick={() => selectAddress(address.id)}
                      disabled={orderPlaced}
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        address.selected
                          ? "border-black bg-zinc-50"
                          : "border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-zinc-900">
                              {address.name}
                            </span>

                            {address.selected && (
                              <CheckCircle size={18} className="text-black" />
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-zinc-600">
                            {address.address}
                            <br />
                            {address.city}, {address.state} {address.postcode}
                          </p>

                          <p className="mt-2 text-sm text-zinc-600">
                            Phone: {address.phone}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!orderPlaced && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-zinc-900 px-5 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                  >
                    <Plus size={18} />
                    Add New Address
                  </button>

                  {showAddressForm && (
                    <div className="mt-6 rounded-2xl bg-zinc-50 p-6">
                      <AddressForm
                        onSuccess={() => setShowAddressForm(false)}
                      />
                    </div>
                  )}
                </>
              )}
            </section>

            {/* ORDER ITEMS */}
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-zinc-900">
                Order Items
              </h2>

              <div className="space-y-5">
                {cart.map((item) => {
                  const price = item.discountPrice || item.price;

                  return (
                    <div
                      key={`${item._id}-${item.selectedSize}`}
                      className="flex gap-5 border-b border-zinc-100 pb-5 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-zinc-900">
                          {item.name}
                        </h3>

                        {item.selectedSize && (
                          <p className="mt-1 text-sm text-zinc-500">
                            Size: {item.selectedSize}
                          </p>
                        )}

                        <p className="mt-1 text-sm text-zinc-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-2 font-semibold text-zinc-900">
                          ₹{price * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="h-fit rounded-3xl bg-white p-8 shadow-sm lg:sticky lg:top-24">
            <h2 className="border-b border-zinc-200 pb-5 text-2xl font-bold text-zinc-900">
              Order Summary
            </h2>

            <div className="space-y-4 py-6">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>

              <div className="border-t border-zinc-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-zinc-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* PLACE ORDER */}
            {!orderPlaced ? (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={!selectedAddress || isPlacingOrder}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-semibold text-white transition-all duration-300 ${
                  !selectedAddress
                    ? "cursor-not-allowed bg-zinc-300"
                    : "bg-black hover:bg-zinc-800"
                }`}
              >
                {isPlacingOrder ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <PackageCheck size={20} />
                    Place Order
                  </>
                )}
              </button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500">
                <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-zinc-900 px-6 py-6 text-center text-white">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <CheckCircle
                      size={32}
                      className="animate-in zoom-in duration-500 text-black"
                    />
                  </div>

                  <p className="text-lg font-bold">Order Placed!</p>

                  <p className="mt-1 text-sm text-zinc-300">
                    Your order has been placed successfully.
                  </p>
                </div>

                <Link
                  to="/products"
                  className="mt-4 flex w-full items-center justify-center rounded-2xl border border-zinc-900 px-6 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            )}

            {!selectedAddress && !orderPlaced && (
              <p className="mt-3 text-center text-sm text-red-500">
                Please select a delivery address.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
