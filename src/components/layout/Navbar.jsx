import { useState } from "react";
import { NAV_LINKS, NAV_ACTIONS } from "../../utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/images/logo/KovharLogo.png";

function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      navigate("/products");
    } else {
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
    }

    setSearchOpen(false);
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setSearchOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-zinc-500 ${isActive ? "font-semibold text-[#5B3A29]" : ""}`;

  const searchField = (
    <div className="flex w-full items-center rounded-full border border-zinc-300 bg-white px-4 py-2">
      <Search size={18} className="shrink-0 text-zinc-400" />

      <input
        autoFocus
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="ml-2 w-full bg-transparent text-sm outline-none lg:w-56"
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
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#FCFCFD]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">
        {/* Logo */}

<<<<<<< HEAD
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="images/KovharLogo.png"
            alt="KOVHAR Logo"
            className="h-10 w-auto"
          />
=======
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <img src={logo} alt="KOVHAR Logo" className="h-9 w-auto lg:h-10" />
>>>>>>> 75bb8b6 (Fix UI rendering issues and logical error using Claude)

          <span className="text-xl font-bold tracking-wider sm:tracking-widest lg:text-2xl">
            KOVHAR
          </span>
        </NavLink>

        {/* Desktop Navigation */}

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          {/* Desktop inline search */}

          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden items-center lg:flex"
            >
              {searchField}

              <button
                type="button"
                onClick={closeSearch}
                className="ml-2 rounded-full p-2 transition hover:bg-zinc-100"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </form>
          )}

          {/* Search toggle (always visible on mobile, hidden on desktop while open) */}

          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Search products"}
            className={`rounded-full p-1.5 transition hover:bg-zinc-100 sm:p-2 ${
              searchOpen ? "lg:hidden" : ""
            }`}
          >
            {searchOpen ? (
              <X size={20} className="lg:hidden" />
            ) : (
              <Search size={20} className="lg:h-[22px] lg:w-[22px]" />
            )}
          </button>

          {/* Wishlist, Cart & other actions */}

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
                onClick={() => setMenuOpen(false)}
                className="relative rounded-full p-1.5 transition hover:bg-zinc-100 sm:p-2"
              >
                <Icon size={20} className="lg:h-[22px] lg:w-[22px]" />

                {badgeCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white sm:h-5 sm:w-5 sm:text-[11px]">
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Mobile menu toggle */}

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-full p-1.5 transition hover:bg-zinc-100 sm:p-2 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}

      {searchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          className="border-t border-gray-200 px-4 py-3 sm:px-6 lg:hidden"
        >
          {searchField}
        </form>
      )}

      {/* Mobile menu */}

      {menuOpen && (
        <div className="border-t border-gray-200 bg-[#FCFCFD] lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base transition hover:bg-zinc-100 ${
                      isActive ? "font-semibold text-[#5B3A29]" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
