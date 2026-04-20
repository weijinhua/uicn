import { ChartWorkspace } from "@/features/chart-workspace/ChartWorkspace";
import { HistoryPanel } from "@/features/history-panel/HistoryPanel";

export default function WorkspacePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 16,
        padding: 16
      }}
    >
      <HistoryPanel />
      <ChartWorkspace />
    </main>
  );
}
