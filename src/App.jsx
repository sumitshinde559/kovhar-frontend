import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProfilePage from "./pages/Profilepage";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          <Route path="/products" element={<ProductsPage />} />

          {/* Product Details */}
          <Route path="/products/:slug" element={<ProductDetails />} />

          {/* Future Routes */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
