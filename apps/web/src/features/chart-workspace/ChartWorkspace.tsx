"use client";

import { Button, Card, TextArea } from "@charts-generator/ui";
import { t } from "@/features/i18n";

export function ChartWorkspace() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card>
        <h2>{t("viewerTitle")}</h2>
        <div
          style={{
            minHeight: 260,
            border: "1px dashed var(--cg-color-border)",
            borderRadius: "var(--cg-radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span>{t("viewerTitle")}</span>
        </div>
      </Card>
      <Card>
        <h2>{t("promptTitle")}</h2>
        <TextArea placeholder={t("promptPlaceholder")} />
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button type="button">{t("generateButton")}</Button>
          <Button type="button">{t("saveButton")}</Button>
          <Button type="button">{t("exportButton")}</Button>
        </div>
      </Card>
    </div>
  );
}
