import type { CSSProperties, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ style?: CSSProperties }>;

export function Card({ children, style }: CardProps) {
  return (
    <section
      style={{
        background: "var(--cg-color-surface)",
        border: "1px solid var(--cg-color-border)",
        borderRadius: "var(--cg-radius-md)",
        padding: "var(--cg-space-4)",
        ...style
      }}
    >
      {children}
    </section>
  );
}
