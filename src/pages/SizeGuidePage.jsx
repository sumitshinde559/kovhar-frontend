import { Ruler, Info } from "lucide-react";

const MEN_SIZES = [
  { uk: "6", india: "6", eu: "39", us: "7", footLength: "24.5" },
  { uk: "7", india: "7", eu: "40", us: "8", footLength: "25.4" },
  { uk: "8", india: "8", eu: "41", us: "9", footLength: "26.2" },
  { uk: "9", india: "9", eu: "42", us: "10", footLength: "27.1" },
  { uk: "10", india: "10", eu: "43", us: "11", footLength: "27.9" },
  { uk: "11", india: "11", eu: "44", us: "12", footLength: "28.8" },
  { uk: "12", india: "12", eu: "45", us: "13", footLength: "29.7" },
];

const WOMEN_SIZES = [
  { uk: "3", india: "3", eu: "36", us: "5", footLength: "22.5" },
  { uk: "4", india: "4", eu: "37", us: "6", footLength: "23.3" },
  { uk: "5", india: "5", eu: "38", us: "7", footLength: "24.1" },
  { uk: "6", india: "6", eu: "39", us: "8", footLength: "24.9" },
  { uk: "7", india: "7", eu: "40", us: "9", footLength: "25.7" },
  { uk: "8", india: "8", eu: "41", us: "10", footLength: "26.5" },
];

const KIDS_SIZES = [
  { uk: "1", india: "1", eu: "32", footLength: "20.0" },
  { uk: "2", india: "2", eu: "33", footLength: "20.8" },
  { uk: "3", india: "3", eu: "34", footLength: "21.6" },
  { uk: "4", india: "4", eu: "35", footLength: "22.3" },
  { uk: "5", india: "5", eu: "36", footLength: "23.1" },
];

const TIPS = [
  "Measure your foot at the end of the day when it is at its largest.",
  "Stand on a flat surface while measuring — don't measure while seated.",
  "Measure both feet and use the larger measurement to choose your size.",
  "If you're between two sizes, size up for a more comfortable fit.",
  "Kolhapuri chappals are designed to feel snug initially and mould to your foot over time.",
];

function SizeTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-100">
      <table className="w-full min-w-[400px] text-sm">
        <thead>
          <tr className="bg-zinc-50">
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-zinc-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-zinc-100 ${
                i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
              }`}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3.5 text-zinc-700">
                  {j === 0 ? (
                    <span className="font-semibold text-zinc-900">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
            <Ruler size={32} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Size Guide
          </h1>
          <p className="mt-4 text-base text-zinc-500">
            Find your perfect fit. All measurements are in centimetres unless stated.
          </p>
        </div>

        {/* How to Measure */}
        <div className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={18} className="text-amber-600" />
            <h2 className="font-bold text-amber-800">How to Measure Your Foot</h2>
          </div>
          <ol className="space-y-2">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-amber-900">
                <span className="shrink-0 font-bold text-amber-500">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ol>
        </div>

        {/* Men */}
        <div className="mt-14">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Men's Sizes</h2>
          <SizeTable
            headers={["India", "UK", "EU", "US", "Foot Length (cm)"]}
            rows={MEN_SIZES.map((s) => [s.india, s.uk, s.eu, s.us, s.footLength])}
          />
        </div>

        {/* Women */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Women's Sizes</h2>
          <SizeTable
            headers={["India", "UK", "EU", "US", "Foot Length (cm)"]}
            rows={WOMEN_SIZES.map((s) => [s.india, s.uk, s.eu, s.us, s.footLength])}
          />
        </div>

        {/* Kids */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Kids' Sizes</h2>
          <SizeTable
            headers={["India", "UK", "EU", "Foot Length (cm)"]}
            rows={KIDS_SIZES.map((s) => [s.india, s.uk, s.eu, s.footLength])}
          />
        </div>

        {/* Note */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm text-sm text-zinc-500">
          <Info size={16} className="mt-0.5 shrink-0 text-zinc-400" />
          <p>
            Size charts are provided as a guide. Small variations may occur between
            styles due to design differences. If you're unsure, our team at{" "}
            <a
              href="mailto:hello@kovhar.com"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              hello@kovhar.com
            </a>{" "}
            is happy to help you find the right fit.
          </p>
        </div>
      </div>
    </div>
  );
}
