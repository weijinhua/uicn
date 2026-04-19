import type { Metadata } from "next";
import { t } from "@/features/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: t("appName"),
  description: t("appName")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
