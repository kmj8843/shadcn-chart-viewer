import { Store } from "@tanstack/store";

type ChartType = "area" | "bar" | "line" | "pie" | "radar" | "radial";
type ChartStyle = string;
type ChartOption = {
  grid: {
    enabled: boolean;
  };
  axis: {
    enabled: boolean;
    key: string | null;
  };
  legend: {
    enabled: boolean;
  };
  tooltip: {
    enabled: boolean;
  };
};

export type ChartStore = {
  chart: ChartType | string | null;
  style: ChartStyle | null;
  options: ChartOption;
};

export const chartStore = new Store<ChartStore>({
  chart: null,
  style: null,
  options: {
    grid: {
      enabled: false,
    },
    axis: {
      enabled: false,
      key: null,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
  },
});
