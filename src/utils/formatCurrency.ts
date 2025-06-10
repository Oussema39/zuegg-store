export const formatCurrency = (
  value: number,
  currency = "EUR",
  locale = "it-IT",
  formatSmallNumbers = false
) => {
  if (typeof value !== "number") {
    throw new Error(`${value} is a ${typeof value}: should be a number.`);
  }

  if (typeof value === "number" && isNaN(value)) {
    value = 0;
  }
  if (value < 10000 && !formatSmallNumbers) {
    return new Intl.NumberFormat(locale, {
      currency: currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      notation: "standard",
      style: "currency",
    }).format(value);
  }
  return new Intl.NumberFormat(locale, {
    currency: currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    notation: "compact",
    style: "currency",
  }).format(value);
};
