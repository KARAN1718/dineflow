import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ className, elevated, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground",
        elevated ? "shadow-elevated" : "shadow-card",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-5 pb-3", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-semibold leading-tight text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-3", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center px-5 pb-5 pt-2", className)}
      {...props}
    />
  );
}
