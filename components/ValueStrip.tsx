import { Leaf, PackageCheck, Sparkles, Truck } from "lucide-react";

const items = [
  { Icon: Truck, label: "Free Shipping $50+" },
  { Icon: Sparkles, label: "Cruelty Free" },
  { Icon: Leaf, label: "Clean Ingredients" },
  { Icon: PackageCheck, label: "30-Day Returns" },
];

export default function ValueStrip() {
  return (
    <section className="border-y border-ink/5 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
        {items.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 text-sm text-ink/80"
          >
            <Icon size={20} className="text-accent" />
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
