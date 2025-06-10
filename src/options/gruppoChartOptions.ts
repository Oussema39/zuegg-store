/* eslint-disable @typescript-eslint/no-explicit-any */

export const gruppoChartOptions = (data: any) => ({
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 10,
    textStyle: {
      color: "#333",
    },
    axisPointer: {
      type: "shadow",
      shadowStyle: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
  },
  legend: {
    data: data.series.map((s: any) => s.name),
    bottom: 0,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "18%",
    top: "8%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: data.categories,
    axisLine: {
      lineStyle: {
        color: "#f0f0f0",
      },
    },
    axisLabel: {
      color: "#666",
      rotate: 45,
      interval: 0,
      fontSize: 10,
      formatter: function (value: string) {
        const maxLength = 12;
        if (value.length > maxLength) {
          return value.slice(0, maxLength) + "…";
        }
        return value;
      },
      rich: {
        tooltip: {},
      },
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: "#666",
    },
    splitLine: {
      lineStyle: {
        color: "#f5f5f5",
      },
    },
  },
  series: data.series.map((series: any) => ({
    name: series.name,
    type: "bar",
    data: series.data,
    barMaxWidth: 35,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
  })),
  color: ["#1890ff", "#52c41a", "#faad14", "#722ed1", "#eb2f96"],
  animationDuration: 2000,
});
