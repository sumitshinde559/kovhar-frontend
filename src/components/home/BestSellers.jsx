import SectionHeading from "../common/SectionHeading";
import ProductGrid from "../product/ProductGrid";

function BestSellers({ products, loading, error }) {
  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Best Sellers"
            subtitle="Discover our most loved handcrafted Kolhapuri chappals."
          />

          <div className="mt-10 text-center text-gray-500">
            Loading products...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Best Sellers"
            subtitle="Discover our most loved handcrafted Kolhapuri chappals."
          />

          <div className="mt-10 text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Best Sellers"
            subtitle="Discover our most loved handcrafted Kolhapuri chappals."
          />

          <div className="mt-10 text-center text-gray-500">
            No products available.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Best Sellers"
          subtitle="Discover our most loved handcrafted Kolhapuri chappals."
          actionLabel="View All"
          actionLink="/products"
        />

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
