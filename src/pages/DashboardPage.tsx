import { Row, Col, Typography, Spin, Card } from "antd";
import InsegnaBarChart from "../components/charts/InsegnaBarChart";
import GruppoBarChart from "../components/charts/GruppoBarChart";
import {
  getProductMaxPrice,
  getProductMinPrice,
  getStoresPerGruppo,
  getStoresPerInsegna,
} from "../utils/chartUtils";
import StoresMap from "../components/map/StoresMap";
import { formatStoresData } from "../utils/mapUtils";
import DashboardFilter from "../components/filter/DashboardFilter";
import { useProducts } from "../hooks/useProducts";
import { useStores } from "../hooks/useStores";
import MetricCard from "../components/ui/MetricCard";
import { useState, useTransition } from "react";
import { formatCurrency } from "../utils/formatCurrency";

const { Title } = Typography;

const DashboardPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const {
    productsMapByName: productsMap,
    productsMapByStore,
    isLoading: isProductsDataLoading,
  } = useProducts();

  const {
    filteredStores: filteredStoresData,
    stores,
    isLoading: isStoresDataLoading,
    filterStores,
  } = useStores();

  if (isStoresDataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  const onFilter = (productName: string) => {
    const products = productsMap.get(productName);
    const storesPerProduct = products?.map((product) => product.store_id);
    const filteredStores = stores?.filter((store) =>
      storesPerProduct?.includes(store.store_id)
    );
    setSelectedProduct(productName);
    filterStores(filteredStores ?? []);
  };

  const onResetFilter = () => {
    setSelectedProduct("");
    startTransition(() => {
      filterStores(stores ?? []);
    });
  };

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Title level={4}>Filter</Title>
          <DashboardFilter
            isLoading={isProductsDataLoading}
            onSubmit={onFilter}
            onReset={onResetFilter}
          />
        </Col>
      </Row>

      {/* Metric Cards Row */}
      <Card
        title={
          selectedProduct
            ? `Prices of ${selectedProduct}`
            : "No selected product"
        }
        className="mb-6"
      >
        <Row gutter={[16, 0]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Minimum Price"
              value={
                selectedProduct
                  ? formatCurrency(
                      getProductMinPrice(productsMap.get(selectedProduct) ?? [])
                    )
                  : "--"
              }
              icon="euro"
              type="success"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Maximum Price"
              value={
                selectedProduct
                  ? formatCurrency(
                      getProductMaxPrice(productsMap.get(selectedProduct) ?? [])
                    )
                  : "--"
              }
              icon="euro"
              type="success"
            />
          </Col>
        </Row>
      </Card>

      {/* Charts: Stores per Insegna and Stores per Gruppo */}
      <Row gutter={[16, 16]} className="mb-6">
        {/* Insegna Chart */}
        <Col xs={24} md={12}>
          <InsegnaBarChart
            title="Stores per insegna"
            data={getStoresPerInsegna(filteredStoresData ?? [])}
            isLoading={isStoresDataLoading}
            height={350}
          />
        </Col>

        {/* Gruppo Chart */}
        <Col xs={24} md={12}>
          <GruppoBarChart
            title="Stores per gruppo"
            data={getStoresPerGruppo(filteredStoresData ?? [])}
            isLoading={isStoresDataLoading}
            height={350}
          />
        </Col>
      </Row>

      {/* Stores Map */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <StoresMap
            title="Stores Distribution"
            data={
              !isStoresDataLoading && filteredStoresData
                ? formatStoresData(
                    filteredStoresData,
                    selectedProduct ? productsMapByStore : undefined
                  )
                : []
            }
            isLoading={isStoresDataLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
