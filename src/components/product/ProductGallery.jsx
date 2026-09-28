import { useEffect, useState } from "react";
import AppImage from "../common/AppImage";

export default function ProductGallery({ images }) {
  // const gallery = [images?.top, images?.side, images?.front].filter(Boolean);

  const gallery = images || [];

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (gallery.length) {
      setSelectedImage(gallery[0]);
    }
  }, [images]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Thumbnails */}
      <div className="order-2 flex gap-4 lg:order-1 lg:flex-col">
        {gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selectedImage === image ? "border-amber-500" : "border-zinc-200"
            }`}
          >
            <AppImage
              src={image}
              alt={`Product view ${index + 1}`}
              className="h-24 w-24 object-contain p-2"
              skeletonClassName="h-24 w-24"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="group flex-1 overflow-hidden rounded-3xl border bg-white">
        <AppImage
          src={selectedImage}
          alt="Selected product view"
          className="w-full object-contain p-12 transition duration-500 group-hover:scale-110"
          skeletonClassName="w-full aspect-square"
          loading="eager"
          fetchpriority="high"
        />
      </div>
    </div>
  );
}
