import { TLocation } from "../../types/TLocation";
import { formatCurrency } from "../../utils/formatCurrency";
import { Typography, Space, Divider } from "antd";

const { Title, Text } = Typography;

type StoreMapTooltipProps = { store: TLocation };

const StoreMapTooltip = ({ store }: StoreMapTooltipProps) => {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        maxWidth: 250,
      }}
    >
      <Title level={5} style={{ margin: 0, color: "#1677ff" }} ellipsis>
        {store.name}
      </Title>

      <Space direction="vertical" size={4} style={{ marginTop: 4 }}>
        {store.address?.street && (
          <Text type="secondary">
            <Text strong>Street:</Text> {store.address.street}
          </Text>
        )}

        {store.address?.city && (
          <Text type="secondary">
            <Text strong>City:</Text> {store.address.city} (
            {store.address.province})
          </Text>
        )}

        {store.product?.base_price && (
          <Text style={{ color: "#3f8600" }}>
            <Text strong>Base Price:</Text>{" "}
            {formatCurrency(store.product.base_price)}
          </Text>
        )}

        {store.product?.promo_price && (
          <Text style={{ color: "#cf1322" }}>
            <Text strong>Promo:</Text>{" "}
            {formatCurrency(store.product.promo_price)}
          </Text>
        )}
      </Space>

      {store.gruppo && (
        <>
          <Divider style={{ margin: "8px 0" }} />
          <Text type="secondary" italic style={{ fontSize: 11 }}>
            Gruppo: <Text strong>{store.gruppo}</Text>
          </Text>
        </>
      )}
    </div>
  );
};

export default StoreMapTooltip;
