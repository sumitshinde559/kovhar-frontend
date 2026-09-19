import { useEffect, useState } from "react";

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
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selectedImage === image ? "border-amber-500" : "border-zinc-200"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-24 w-24 bg-white object-contain p-2"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="group flex-1 overflow-hidden rounded-3xl border bg-white">
        <img
          src={selectedImage}
          alt=""
          className="w-full object-contain p-12 transition duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  );
}
