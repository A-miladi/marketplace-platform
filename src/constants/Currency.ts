export type Currency = "USD" | "EURO";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EURO: "€",
};

export const CURRENCY_OPTIONS = [
  { label: "USD", value: "USD" },
  { label: "EURO", value: "EURO" },
];
