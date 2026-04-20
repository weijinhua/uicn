import { Card } from "@charts-generator/ui";
import { t } from "@/features/i18n";

const demoHistory = ["Q1 销售趋势", "北京与上海月度销售", "产品占比分析"];

export function HistoryPanel() {
  return (
    <Card style={{ height: "100%" }}>
      <h2>{t("historyTitle")}</h2>
      <ul style={{ paddingLeft: 18 }}>
        {demoHistory.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </Card>
  );
}
