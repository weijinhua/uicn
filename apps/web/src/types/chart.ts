export type ChartType = "line" | "bar" | "pie";

export interface ChartSpec {
  type: ChartType;
  title: string;
  labels: string[];
  datasets: Array<{
    label: string;
    values: number[];
  }>;
}
