import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, setQuantity }) {
  const increase = () => setQuantity((q) => q + 1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-zinc-300">
      <button onClick={decrease} className="p-4 transition hover:bg-zinc-100">
        <Minus size={18} />
      </button>

      <div className="min-w-[60px] text-center text-lg font-semibold">
        {quantity}
      </div>

      <button onClick={increase} className="p-4 transition hover:bg-zinc-100">
        <Plus size={18} />
      </button>
    </div>
  );
}
