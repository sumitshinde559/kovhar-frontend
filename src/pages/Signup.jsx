import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../utils/toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      form.firstName,
      form.lastName,
      form.email,
      form.password,
    ];

    if (requiredFields.some((value) => !value.trim())) {
      notify.error?.("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      notify.success?.("Account created successfully.");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      notify.error?.(error.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
            Create Account
          </p>

          <h1 className="mt-3 text-3xl font-black text-zinc-900">
            Join KOVHAR
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Create your account to manage your orders and wishlist.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                First Name
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Last Name
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Email</label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Phone</label>

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
