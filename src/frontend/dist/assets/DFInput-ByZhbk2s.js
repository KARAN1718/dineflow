import { r as reactExports, j as jsxRuntimeExports, e as cn } from "./index-Zu5YxTH1.js";
const Input = reactExports.forwardRef(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: inputId,
          className: "text-sm font-display font-medium text-foreground",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: inputId,
          ref,
          className: cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-destructive focus:ring-destructive",
            className
          ),
          ...props
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", "data-ocid": "input.error_state", children: error })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input as I
};
