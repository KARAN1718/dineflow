import { j as jsxRuntimeExports, e as cn } from "./index-Zu5YxTH1.js";
function Card({ className, elevated, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-xl border border-border bg-card text-card-foreground",
        elevated ? "shadow-elevated" : "shadow-card",
        className
      ),
      ...props
    }
  );
}
function CardHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex flex-col gap-1.5 p-5 pb-3", className),
      ...props
    }
  );
}
function CardTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      className: cn(
        "font-display text-lg font-semibold leading-tight text-card-foreground",
        className
      ),
      ...props
    }
  );
}
function CardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("px-5 pb-3", className), ...props });
}
function CardFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center px-5 pb-5 pt-2", className),
      ...props
    }
  );
}
export {
  Card as C,
  CardContent as a,
  CardHeader as b,
  CardTitle as c,
  CardFooter as d
};
