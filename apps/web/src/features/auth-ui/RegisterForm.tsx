"use client";

import { Button, Card, TextInput } from "@charts-generator/ui";
import { t } from "@/features/i18n";

export function RegisterForm() {
  return (
    <Card style={{ maxWidth: 420, margin: "30px auto" }}>
      <h1>{t("registerTitle")}</h1>
      <div style={{ display: "grid", gap: 12 }}>
        <label>
          {t("emailLabel")}
          <TextInput type="email" name="email" />
        </label>
        <label>
          {t("usernameLabel")}
          <TextInput type="text" name="username" />
        </label>
        <label>
          {t("passwordLabel")}
          <TextInput type="password" name="password" />
        </label>
        <Button type="button">{t("registerButton")}</Button>
      </div>
    </Card>
  );
}
