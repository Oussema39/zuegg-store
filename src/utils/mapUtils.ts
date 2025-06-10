import { TLocation } from "../types/TLocation";
import { TProduct } from "../types/TProduct.type";
import { TStore } from "../types/TStore.type";
import L from "leaflet";

export const formatStoresData = (
  rawData: TStore[],
  productsMapByStore?: Map<number, TProduct>
): TLocation[] => {
  return rawData.map((store) => ({
    id: store.store_id.toString(),
    name: store.insegna,
    lat: store.latitude,
    lng: store.longitude,
    value: 0,
    type: "store",
    address: store.address,
    gruppo: store.gruppo,
    services: store.services,
    centrale: store.centrale,
    orgcedi: store.orgcedi,
    insegna: store.insegna,
    product: productsMapByStore?.get(store.store_id) ?? undefined,
  }));
};

export const getColorForValue = (
  value: number,
  min: number,
  max: number
): string => {
  if (!value && !min && !max) return "#40a9ff";
  const ratio = (value - min) / (max - min);
  const r = Math.round(255 * ratio);
  const g = Math.round(255 * (1 - ratio));
  return `rgb(${r}, ${g}, 0)`;
};

export const createColoredMarker = (color: string): L.DivIcon => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
  });
};
