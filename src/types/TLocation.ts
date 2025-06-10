import { TAddress } from "./TAddress";
import { TProduct } from "./TProduct.type";
import { TStore } from "./TStore.type";

export interface TLocation
  extends Pick<TStore, "centrale" | "insegna" | "services" | "orgcedi"> {
  id: string;
  name: string;
  lat: number;
  lng: number;
  value: number;
  address?: TAddress;
  gruppo?: string;
  type: "sales" | "office" | "store";
  product?: TProduct;
}
