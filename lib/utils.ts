export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `LC-${random}`;
}

export const FREE_SHIPPING_THRESHOLD = 50;
