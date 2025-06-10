import { TProduct } from "../types/TProduct.type";
import { TStore } from "../types/TStore.type";
import { readCSVFileWithParser } from "./mockApi";

export const dashboardService = {
  getStoresData: async (): Promise<TStore[]> => {
    const data = await readCSVFileWithParser<TStore[]>(
      "data/stores visible.csv"
    );
    return data;
  },

  getProductsData: async (): Promise<TProduct[]> => {
    const data = await readCSVFileWithParser<TProduct[]>(
      "data/zuegg products.csv"
    );
    return data;
  },
};
