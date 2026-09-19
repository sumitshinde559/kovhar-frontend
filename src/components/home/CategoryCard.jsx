import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CategoryCard({ category }) {
  const { name, image, slug } = category;

  return (
    <Link to={`/products?category=${slug}`} className="group block">
      <div className="relative h-[450px] overflow-hidden rounded-3xl shadow-lg">
        {/* Category Image */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-3xl font-bold">{name}</h3>

          <div className="mt-2 flex items-center gap-2 text-sm font-medium">
            <span>Explore</span>

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
