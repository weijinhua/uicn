import type { TextareaHTMLAttributes } from "react";

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        border: "1px solid var(--cg-color-border)",
        borderRadius: "var(--cg-radius-md)",
        padding: "10px 12px",
        fontSize: 14,
        minHeight: 120
      }}
    />
  );
}
