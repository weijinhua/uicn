import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Button({ children, style, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        border: "1px solid var(--cg-color-primary)",
        background: "var(--cg-color-primary)",
        color: "var(--cg-color-primary-text)",
        borderRadius: "var(--cg-radius-md)",
        padding: "10px 14px",
        fontWeight: 600,
        cursor: "pointer",
        ...style
      }}
    >
      {children}
    </button>
  );
}
