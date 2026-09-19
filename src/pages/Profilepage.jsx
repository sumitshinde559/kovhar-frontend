import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Check,
  Loader2,
} from "lucide-react";

import { useAddress } from "../context/AddressContext";
import { useWishlist } from "../context/WishlistContext";
import AddressForm from "../components/address/AddressForm";
import { notify } from "../utils/toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { addresses, deleteAddress, selectAddress } = useAddress();

  const { wishlist } = useWishlist();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadProfile();
    loadOrders();
  }, []);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);

      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load profile.");
      }

      setUser(data.user);
    } catch (error) {
      console.error("Profile loading error:", error);

      if (
        error.message?.toLowerCase().includes("token") ||
        error.message?.toLowerCase().includes("unauthorized")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);

      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load orders.");
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Orders loading error:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDeleteAddress = (id) => {
    deleteAddress(id);
    notify.success("Address deleted");
  };

  const handleSelectAddress = (id) => {
    selectAddress(id);
    notify.success("Delivery address selected");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    notify.success("Logged out successfully");

    navigate("/login");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loadingProfile) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-600">
          <Loader2 className="animate-spin" size={22} />
          Loading profile...
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const initials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`;

  return (
    <main className="bg-stone-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
            My Account
          </p>

          <h1 className="mt-2 text-4xl font-black text-zinc-900">Profile</h1>

          <p className="mt-3 text-zinc-500">
            Manage your personal information, orders and saved addresses.
          </p>
        </div>

        {/* Profile Overview */}
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
                {initials}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">KOVHAR customer</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 font-semibold transition hover:bg-zinc-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="mt-8 grid gap-4 border-t border-zinc-100 pt-8 md:grid-cols-3">
            <div className="rounded-2xl bg-stone-50 p-5">
              <Mail size={20} className="mb-3 text-amber-600" />

              <p className="text-sm text-zinc-500">Email</p>

              <p className="mt-1 break-all font-semibold">{user.email}</p>
            </div>

            <div className="rounded-2xl bg-stone-50 p-5">
              <Phone size={20} className="mb-3 text-amber-600" />

              <p className="text-sm text-zinc-500">Phone</p>

              <p className="mt-1 font-semibold">
                {user.phone || "Not provided"}
              </p>
            </div>

            <div className="rounded-2xl bg-stone-50 p-5">
              <UserRound size={20} className="mb-3 text-amber-600" />

              <p className="text-sm text-zinc-500">Account</p>

              <p className="mt-1 font-semibold">Active Customer</p>
            </div>
          </div>
        </section>

        {/* Account Summary */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <Link
            to="/wishlist"
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"
          >
            <Heart size={24} className="text-red-500" />

            <p className="mt-4 text-3xl font-black">{wishlist.length}</p>

            <p className="mt-1 text-sm text-zinc-500">Wishlist Items</p>
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Package size={24} className="text-amber-600" />

            <p className="mt-4 text-3xl font-black">{orders.length}</p>

            <p className="mt-1 text-sm text-zinc-500">Orders</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <MapPin size={24} className="text-green-600" />

            <p className="mt-4 text-3xl font-black">{addresses.length}</p>

            <p className="mt-1 text-sm text-zinc-500">Saved Addresses</p>
          </div>
        </section>

        {/* Orders */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Purchase History
              </p>

              <h2 className="mt-1 text-2xl font-bold">My Orders</h2>
            </div>
          </div>

          {loadingOrders ? (
            <div className="flex items-center justify-center rounded-3xl bg-white p-12">
              <Loader2 className="animate-spin" size={22} />
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Package size={40} className="mx-auto text-zinc-300" />

              <h3 className="mt-4 text-xl font-bold">No orders yet</h3>

              <p className="mt-2 text-zinc-500">
                Your completed orders will appear here.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 font-semibold text-white"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-3xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-zinc-100 pb-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-zinc-500">Order</p>

                      <p className="font-bold">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Placed</p>

                      <p className="font-semibold">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Total</p>

                      <p className="font-bold">
                        ₹{order.total?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold capitalize text-amber-700">
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex items-center gap-4"
                      >
                        <div className="h-20 w-20 overflow-hidden rounded-xl bg-stone-50">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package size={24} className="text-zinc-300" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>

                          <p className="mt-1 text-sm text-zinc-500">
                            Size: {item.selectedSize || "N/A"} · Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹{item.price?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Addresses */}
        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Delivery
              </p>

              <h2 className="mt-1 text-2xl font-bold">Saved Addresses</h2>
            </div>

            <button
              type="button"
              onClick={() => setShowAddressForm((prev) => !prev)}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white"
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>

          {showAddressForm && (
            <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
              <AddressForm onSuccess={() => setShowAddressForm(false)} />
            </div>
          )}

          {addresses.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              <MapPin size={40} className="mx-auto text-zinc-300" />

              <h3 className="mt-4 text-xl font-bold">No saved addresses</h3>

              <p className="mt-2 text-zinc-500">
                Add an address for faster checkout.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`rounded-3xl bg-white p-6 shadow-sm ${
                    address.selected ? "ring-2 ring-black" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{address.name}</h3>

                      {address.selected && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          <Check size={13} />
                          Selected
                        </span>
                      )}
                    </div>

                    <MapPin
                      size={20}
                      className={
                        address.selected ? "text-green-600" : "text-zinc-400"
                      }
                    />
                  </div>

                  <div className="mt-5 space-y-1 text-sm leading-6 text-zinc-600">
                    <p>{address.phone}</p>
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} {address.postcode}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-5">
                    {!address.selected && (
                      <button
                        type="button"
                        onClick={() => handleSelectAddress(address.id)}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                      >
                        Select
                      </button>
                    )}

                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="flex items-center gap-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
