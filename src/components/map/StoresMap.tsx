/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, Spin } from "antd";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useDeferredValue } from "react";
import StoreModal from "../ui/StoreModal";
import StoreMapTooltip from "../ui/StoreMapTooltip";
import { TLocation } from "../../types/TLocation";
import { createColoredMarker, getColorForValue } from "../../utils/mapUtils";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface StoresMapProps {
  title: string;
  data?: TLocation[];
  isLoading?: boolean;
}

const StoresMap = ({ title, data, isLoading = false }: StoresMapProps) => {
  const [selectedStore, setSelectedStore] = useState<TLocation | null>(null);
  const deferredData = useDeferredValue(data); // Defer the data

  const prices = deferredData?.map((s) => s.product?.base_price || 0) ?? [];

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (isLoading || !data) {
    return (
      <Card title={title} className="h-full">
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin tip="Loading map data..." />
        </div>
      </Card>
    );
  }

  const center =
    deferredData && deferredData.length > 0
      ? ([
          deferredData.reduce((sum, item) => sum + item.lat, 0) /
            deferredData.length,
          deferredData.reduce((sum, item) => sum + item.lng, 0) /
            deferredData.length,
        ] as [number, number])
      : ([40.7128, -74.006] as [number, number]);

  return (
    <Card
      title={<h3 className="text-lg font-semibold">{title}</h3>}
      className="h-full shadow-lg rounded-xl"
      style={{ overflow: "hidden" }}
    >
      {/* Conditionally render MapContainer based on deferredData existence to avoid initial rendering issues */}
      {deferredData && deferredData.length > 0 ? (
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {deferredData.map((store) => {
            const color = getColorForValue(
              store.product?.base_price || 0,
              minPrice,
              maxPrice
            );
            const icon = createColoredMarker(color);

            return (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => setSelectedStore(store),
                }}
              >
                <Tooltip
                  direction="top"
                  permanent={false}
                  className="custom-tooltip"
                >
                  <StoreMapTooltip store={store} />
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin tip="Preparing map..." />
        </div>
      )}

      <StoreModal
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
      />
    </Card>
  );
};

export default StoresMap;
