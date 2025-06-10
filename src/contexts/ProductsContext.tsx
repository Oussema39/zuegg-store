import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { TProduct } from "../types/TProduct.type";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export interface ProductsContextType {
  products: TProduct[] | undefined;
  filteredProducts: TProduct[] | undefined;
  filterProducts: (products: TProduct[]) => void;
  productsMapByName: Map<string, TProduct[]>;
  productsMapByStore: Map<number, TProduct>;
  distinctProductNames: string[];
  isLoading: boolean;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const {
    data: productsData,
    isLoading: isProductsDataLoading,
    isFetched,
  } = useQuery<TProduct[]>({
    queryKey: ["productsData"],
    queryFn: dashboardService.getProductsData,
  });

  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  const productsMapByName = useMemo(() => {
    if (!productsData?.length) return new Map<string, TProduct[]>();

    const map = new Map<string, TProduct[]>();
    for (const product of productsData) {
      map.set(product.name, [...(map.get(product.name) ?? []), product]);
    }

    return map;
  }, [productsData]);

  const productsMapByStore = useMemo(() => {
    if (!productsData?.length) return new Map<number, TProduct>();

    const map = new Map<number, TProduct>();
    for (const product of productsData) {
      map.set(product.store_id, product);
    }

    return map;
  }, [productsData]);

  const distinctProductNames = useMemo(() => {
    if (!productsData?.length) return [];

    const uniqueNames = productsData.reduce<string[]>((acc, curr) => {
      if (!acc.includes(curr.name)) {
        acc.push(curr.name);
      }
      return acc;
    }, []);

    return uniqueNames;
  }, [productsData]);

  const handleFilter = (updatedProducts: TProduct[]) => {
    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    setFilteredProducts(productsData || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  const contextValue: ProductsContextType = {
    products: productsData,
    isLoading: isProductsDataLoading,
    filterProducts: handleFilter,
    productsMapByStore,
    filteredProducts,
    productsMapByName,
    distinctProductNames,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
