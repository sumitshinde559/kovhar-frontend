import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartProvider } from "./context/CartContext";

import { AddressProvider } from "./context/AddressContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AddressProvider>
      <WishlistProvider>
        <CartProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                borderRadius: "12px",
                background: "#18181b",
                color: "#fff",
              },
            }}
          />
        </CartProvider>
      </WishlistProvider>
    </AddressProvider>
  </BrowserRouter>,
);
