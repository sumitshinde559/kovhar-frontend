import { useState } from "react";
import { useAddress } from "../../context/AddressContext";
import { notify } from "../../utils/toast";

export default function AddressForm({ onSuccess }) {
  const { addAddress } = useAddress();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some((value) => !value.trim());

    if (isEmpty) {
      alert("Please fill in all address details.");
      return;
    }

    addAddress(form);

    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postcode: "",
    });

    notify.addressAdded();

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-900">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-900">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-900">
          Address
        </label>

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="House number, street, area"
          rows="3"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-900">
            City
          </label>

          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-900">
            State
          </label>

          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-900">
          Postcode
        </label>

        <input
          type="text"
          name="postcode"
          value={form.postcode}
          onChange={handleChange}
          placeholder="Postcode"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
      >
        Save Address
      </button>
    </form>
  );
}
