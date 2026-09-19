import CategoryCard from "./CategoryCard";
import { FEATURED_CATEGORIES } from "../../utils/constants";

function FeaturedCategories() {
  return (
    <section className="mt-32">
      <div className="mb-10 text-center">
        <h2 className="text-5xl font-bold text-stone-900">Shop by Category</h2>

        <p className="mt-4 text-stone-600">
          Discover handcrafted Kolhapuri footwear for every occasion.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;
