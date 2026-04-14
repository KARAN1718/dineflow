import { j as jsxRuntimeExports, e as cn, i as cva } from "./index-Zu5YxTH1.js";
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-display font-medium transition-smooth",
  {
    variants: {
      variant: {
        default: "bg-primary/15 text-primary border border-primary/20",
        secondary: "bg-secondary/15 text-secondary border border-secondary/20",
        accent: "bg-accent/15 text-accent border border-accent/20",
        success: "bg-secondary/20 text-secondary border border-secondary/30",
        warning: "bg-accent/20 text-accent border border-accent/30",
        destructive: "bg-destructive/15 text-destructive border border-destructive/20",
        muted: "bg-muted text-muted-foreground border border-border",
        outline: "border border-border text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(badgeVariants({ variant, className })), ...props });
}
function OrderStatusBadge({ status }) {
  const config = {
    pending: { label: "Pending", variant: "warning" },
    accepted: { label: "Accepted", variant: "secondary" },
    preparing: { label: "Preparing", variant: "default" },
    ready: { label: "Ready", variant: "success" },
    completed: { label: "Completed", variant: "muted" },
    delivered: { label: "Delivered", variant: "muted" },
    cancelled: { label: "Cancelled", variant: "destructive" }
  };
  const { label, variant } = config[status] ?? {
    label: status,
    variant: "muted"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant, children: label });
}
export {
  Badge as B,
  OrderStatusBadge as O
};
