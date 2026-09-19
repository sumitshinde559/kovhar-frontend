import ProductCard from "./ProductCard";

export default function RelatedProducts({ products, currentProduct }) {
  if (!products?.length || !currentProduct) return null;

  // Primary category (Men, Women or Kids)
  const primaryCategory =
    currentProduct.category?.find((cat) =>
      ["Men", "Women", "Kids"].includes(cat),
    ) || currentProduct.category?.[0];

  const relatedProducts = products
    .filter((product) => {
      if (product._id === currentProduct._id) return false;

      return product.category?.includes(primaryCategory);
    })
    .slice(0, 4);

  if (!relatedProducts.length) return null;

  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black">You May Also Like</h2>

        <p className="mt-3 text-zinc-500">
          More handcrafted {primaryCategory.toLowerCase()} Kolhapuri chappals.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
