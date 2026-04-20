import { enUSMessages } from "./messages/en-US";
import { zhCNMessages, type MessageKey } from "./messages/zh-CN";

type Locale = "zh-CN" | "en-US";

const dictionaries: Record<Locale, Record<MessageKey, string>> = {
  "zh-CN": zhCNMessages,
  "en-US": enUSMessages
};

export function getDefaultLocale(): Locale {
  const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  return locale === "en-US" ? "en-US" : "zh-CN";
}

export function t(key: MessageKey, locale: Locale = getDefaultLocale()): string {
  return dictionaries[locale][key];
}
