import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "gold" | "dark" | "ghost" | "onimage";

const variants: Record<Variant, string> = {
  gold: "btn btn-gold",
  dark: "btn btn-dark",
  ghost: "btn btn-ghost",
  onimage: "btn btn-onimage",
};

type BaseProps = {
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({ variant = "gold", size = "md", block, className = "" }: BaseProps) {
  return [
    variants[variant],
    size === "sm" ? "btn-sm" : "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ButtonLink({
  href,
  ...props
}: BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">) {
  const { variant, size, block, className, children, ...rest } = props;
  return (
    <Link href={href} className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  ...props
}: BaseProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  const { variant, size, block, className, children, ...rest } = props;
  return (
    <button className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </button>
  );
}
