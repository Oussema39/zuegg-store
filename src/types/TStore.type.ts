import { TAddress } from "./TAddress";

export interface TStore {
  store_id: number;
  address?: TAddress;
  latitude: number;
  longitude: number;
  services: string;
  centrale: string;
  gruppo: string;
  orgcedi: string;
  insegna: string;
}
