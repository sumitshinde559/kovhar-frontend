import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

import { getProductBySlug, getProducts } from "../api/productApi";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const currentProduct = await getProductBySlug(slug);
        setProduct(currentProduct);

        const allProducts = await getProducts();

        const related = allProducts
          .filter(
            (item) =>
              item._id !== currentProduct._id &&
              item.category?.some((cat) =>
                currentProduct.category?.includes(cat),
              ),
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (err) {
        setError(err.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <p className="text-lg text-zinc-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (product) {
    console.log("IMAGES-", product.images);
  }
  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
        <p className="text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-5 text-sm text-zinc-500">
          <span>Home</span>

          <ChevronRight size={16} />

          <span>{product.category?.[0]}</span>

          {product.subCategory && (
            <>
              <ChevronRight size={16} />
              <span>{product.subCategory}</span>
            </>
          )}

          <ChevronRight size={16} />

          <span className="font-semibold text-zinc-900">{product.name}</span>
        </div>
      </section>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <ProductTabs product={product} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <RelatedProducts
              products={relatedProducts}
              currentProduct={product}
            />
          </div>
        </section>
      )}
    </main>
  );
}
