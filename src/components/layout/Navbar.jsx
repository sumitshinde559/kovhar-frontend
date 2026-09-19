import { useState } from "react";
import { NAV_LINKS, NAV_ACTIONS } from "../../utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(keyword)}`);

    setSearchOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-[#FCFCFD]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/images/logo/KovharLogo.png"
            alt="KOVHAR Logo"
            className="h-10 w-auto"
          />

          <h1 className="text-2xl font-bold tracking-widest">KOVHAR</h1>
        </NavLink>

        {/* Navigation */}

        <ul className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                className="transition hover:text-zinc-500"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}

        <div className="flex items-center gap-3">
          {/* Search */}

          {!searchOpen ? (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="rounded-full p-2 transition hover:bg-zinc-100"
            >
              <Search size={22} />
            </button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="flex items-center rounded-full border border-zinc-300 bg-white px-4 py-2">
                <Search size={18} className="shrink-0 text-zinc-400" />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  className="ml-2 w-40 bg-transparent text-sm outline-none md:w-56"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="ml-2 text-zinc-400 transition hover:text-zinc-700"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                className="ml-2 rounded-full p-2 transition hover:bg-zinc-100"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </form>
          )}

          {/* Wishlist & Cart */}

          {NAV_ACTIONS.map((action) => {
            const Icon = action.icon;

            const badgeCount =
              action.label === "Wishlist"
                ? wishlist.length
                : action.label === "Cart"
                  ? cart.reduce((total, item) => total + item.quantity, 0)
                  : 0;

            return (
              <NavLink
                key={action.label}
                to={action.path}
                aria-label={action.label}
                className="relative rounded-full p-2 transition hover:bg-zinc-100"
              >
                <Icon size={22} />

                {badgeCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white">
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
