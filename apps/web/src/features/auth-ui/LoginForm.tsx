"use client";

import { Button, Card, TextInput } from "@charts-generator/ui";
import { t } from "@/features/i18n";

export function LoginForm() {
  return (
    <Card style={{ maxWidth: 420, margin: "30px auto" }}>
      <h1>{t("loginTitle")}</h1>
      <div style={{ display: "grid", gap: 12 }}>
        <label>
          {t("emailLabel")}
          <TextInput type="email" name="email" />
        </label>
        <label>
          {t("passwordLabel")}
          <TextInput type="password" name="password" />
        </label>
        <Button type="button">{t("loginButton")}</Button>
      </div>
    </Card>
  );
}
