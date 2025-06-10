import { Card, Statistic, Typography } from "antd";
import { Users, Percent, Folder, Euro } from "lucide-react";

const { Text } = Typography;

interface MetricCardProps {
  title: string;
  value: number | string | undefined;
  icon: "users" | "euro" | "percent" | "folder";
  type: "success" | "error" | "warning";
  prefix?: string;
  suffix?: string;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "users":
      return <Users size={24} />;
    case "euro":
      return <Euro size={24} />;
    case "percent":
      return <Percent size={24} />;
    case "folder":
      return <Folder size={24} />;
    default:
      return <Users size={24} />;
  }
};

const MetricCard = ({
  title,
  value,
  icon,
  type,
  prefix,
  suffix,
}: MetricCardProps) => {
  const getValueColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-success";
      case "error":
        return "text-error";
      case "warning":
        return "text-warning";
      default:
        return "text-gray-700";
    }
  };

  const formattedValue = value?.toLocaleString();

  return (
    <Card className="metric-card h-full" bordered={false}>
      <div className="flex justify-between items-start">
        <div>
          <Text type="secondary" className="text-sm">
            {title}
          </Text>
          <Statistic
            value={formattedValue}
            precision={0}
            valueStyle={{
              color: getValueColor(type),
            }}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
        <div className="p-2 rounded-lg bg-primary bg-opacity-10">
          {getIcon(icon)}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;
