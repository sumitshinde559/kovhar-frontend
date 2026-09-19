import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import FeaturedCategories from "../components/home/FeaturedCategories";
import BestSellers from "../components/home/BestSellers";
import FeaturedCollection from "../components/home/FeaturedCollection";
import { getProducts } from "../api/productApi";
import HeritageBanner from "../components/home/HeritageBanner";

import CustomerReviews from "../components/home/CustomerReviews";

import WhyChoose from "../components/home/WhyChoose";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const bestSellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);

  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers products={bestSellers} loading={loading} error={error} />
      <FeaturedCollection
        products={featuredProducts}
        loading={loading}
        error={error}
      />
      <HeritageBanner />
      <CustomerReviews />
      <WhyChoose />
    </>
  );
}

export default HomePage;
