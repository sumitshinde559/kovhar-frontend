import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const ReturnsPage = lazy(() => import("./pages/ReturnsPage"));
const FAQsPage = lazy(() => import("./pages/FAQsPage"));
const SizeGuidePage = lazy(() => import("./pages/SizeGuidePage"));

function App() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-amber-500" /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Protected: require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
          </Route>

          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
