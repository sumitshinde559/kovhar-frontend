import { Link } from "react-router-dom";

function SectionHeading({ title, subtitle, actionLabel, actionLink }) {
  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {title}
        </h2>

        {subtitle && <p className="mt-3 max-w-2xl text-gray-600">{subtitle}</p>}
      </div>

      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center rounded-md border border-gray-900 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default SectionHeading;
