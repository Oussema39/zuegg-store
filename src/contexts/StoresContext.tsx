import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { TStore } from "../types/TStore.type";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export interface StoresContextType {
  stores: TStore[] | undefined;
  storesMapById: Map<string | number, TStore[]>;
  filteredStores: TStore[] | undefined;
  filterStores: (stores: TStore[]) => void;
  isLoading: boolean;
}

export const StoresContext = createContext<StoresContextType | undefined>(
  undefined
);

interface StoresProviderProps {
  children: ReactNode;
}

export const StoresProvider: React.FC<StoresProviderProps> = ({ children }) => {
  const {
    data: storesData,
    isLoading: isStoresDataLoading,
    isFetched,
  } = useQuery<TStore[]>({
    queryKey: ["storesData"],
    queryFn: dashboardService.getStoresData,
  });

  const [filteredStores, setFilteredStores] = useState<TStore[]>([]);

  const storesMapById = useMemo(() => {
    if (!storesData?.length) return new Map<string | number, TStore[]>();

    const map = new Map<string | number, TStore[]>();
    for (const store of storesData) {
      map.set(store.store_id, [...(map.get(store.store_id) ?? []), store]);
    }

    return map;
  }, [storesData]);

  const handleFilter = (updatedProducts: TStore[]) => {
    setFilteredStores(updatedProducts);
  };

  useEffect(() => {
    setFilteredStores(storesData || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  const contextValue: StoresContextType = {
    stores: storesData,
    storesMapById: storesMapById,
    isLoading: isStoresDataLoading,
    filteredStores,
    filterStores: handleFilter,
  };

  return (
    <StoresContext.Provider value={contextValue}>
      {children}
    </StoresContext.Provider>
  );
};
