import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul S.",
    city: "Mumbai",
    review:
      "These are the finest Kolhapuris I've owned. Premium leather, excellent finish, and extremely comfortable.",
  },
  {
    name: "Priya M.",
    city: "Pune",
    review:
      "Beautiful craftsmanship. The quality exceeded my expectations and they look even better in person.",
  },
  {
    name: "Aniket P.",
    city: "Bengaluru",
    review:
      "Traditional style with modern comfort. I've already ordered another pair for my father.",
  },
];

export default function CustomerReviews() {
  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="mb-14 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Testimonials
        </p>

        <h2 className="text-5xl font-black text-zinc-900">
          What Our Customers Say
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-500">
          Thousands of customers trust KOVHAR for authentic handcrafted
          Kolhapuri chappals made with premium leather.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 flex text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} fill="currentColor" />
              ))}
            </div>

            <p className="mb-8 leading-8 text-zinc-600">"{review.review}"</p>

            <div>
              <h4 className="font-bold text-zinc-900">{review.name}</h4>

              <p className="text-sm text-zinc-500">{review.city}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-zinc-100 py-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 text-amber-500">
          <Star fill="currentColor" size={22} />
          <span className="text-3xl font-black text-zinc-900">4.9</span>
        </div>

        <p className="text-zinc-600">
          Average rating based on 2,000+ happy customers
        </p>
      </div>
    </section>
  );
}
