import { TProduct } from "../types/TProduct.type";
import { TStore } from "../types/TStore.type";

export const getStoresPerInsegna = (stores: TStore[]) => {
  const counts: Record<string, number> = {};

  stores.forEach((store) => {
    const insegna = store.insegna || "Unknown";
    counts[insegna] = (counts[insegna] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const data = Object.values(counts);

  return {
    categories,
    series: [
      {
        name: "Stores Count",
        data,
      },
    ],
  };
};

export const getStoresPerGruppo = (stores: TStore[]) => {
  const counts: Record<string, number> = {};

  stores.forEach((store) => {
    const gruppo = store.gruppo || "Unknown";
    counts[gruppo] = (counts[gruppo] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const data = Object.values(counts);

  return {
    categories,
    series: [
      {
        name: "Stores Count",
        data,
      },
    ],
  };
};

export const getProductMinPrice = (products: TProduct[]) => {
  const min = products.reduce(
    (acc, product) =>
      Number(product.base_price) < acc ? Number(product.base_price) : acc,
    Number.POSITIVE_INFINITY
  );
  return min;
};

export const getProductMaxPrice = (products: TProduct[]) => {
  const max = products.reduce(
    (acc, product) =>
      Number(product.base_price) > acc ? Number(product.base_price) : acc,
    Number.NEGATIVE_INFINITY
  );
  return max;
};
