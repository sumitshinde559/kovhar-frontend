const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const data = await response.json();
  return data.products;
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${API_URL}/products/slug/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product.");
  }

  const data = await response.json();
  return data.product;
}
