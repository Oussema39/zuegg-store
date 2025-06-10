import { Card, Spin } from "antd";
import ReactECharts from "echarts-for-react";
import { gruppoChartOptions } from "../../options/gruppoChartOptions";

interface GruppoBarChartProps {
  title: string;
  data?: {
    categories: string[];
    series: Array<{
      name: string;
      data: number[];
    }>;
  };
  height?: number;
  isLoading?: boolean;
}

const GruppoBarChart = ({
  title,
  data,
  height = 300,
  isLoading = false,
}: GruppoBarChartProps) => {
  if (isLoading || !data) {
    return (
      <Card title={title} className={`"h-[${height}px]"`}>
        <div
          style={{
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin tip="Loading chart data..." />
        </div>
      </Card>
    );
  }

  return (
    <Card title={title} className="h-full" style={{ overflowX: "auto" }}>
      <ReactECharts
        option={gruppoChartOptions(data)}
        style={{ height: `${height}px`, minWidth: data.categories.length * 40 }}
        className="w-full"
      />
    </Card>
  );
};

export default GruppoBarChart;
