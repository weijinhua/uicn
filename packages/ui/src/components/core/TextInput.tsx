import type { InputHTMLAttributes } from "react";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        border: "1px solid var(--cg-color-border)",
        borderRadius: "var(--cg-radius-md)",
        padding: "10px 12px",
        fontSize: 14
      }}
    />
  );
}
