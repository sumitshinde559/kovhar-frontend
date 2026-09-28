import { useState } from "react";

export default function AppImage({
  src,
  alt = "",
  className = "",
  skeletonClassName = "",
  loading = "lazy",
  fetchpriority,
  decoding = "async",
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden ${skeletonClassName}`}>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-zinc-200"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchpriority}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...rest}
      />
    </span>
  );
}
