import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, e as cn } from "./index-Zu5YxTH1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className
}) {
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/30 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") onClose();
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            "aria-modal": "true",
            "aria-labelledby": title ? "modal-title" : void 0,
            className: cn(
              "relative z-10 w-full rounded-2xl bg-card shadow-elevated border border-border flex flex-col max-h-[90vh] m-0 p-0 open:flex",
              sizeMap[size],
              className
            ),
            open: true,
            children: [
              (title != null || onClose != null) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-6 pb-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "modal-title",
                      className: "font-display text-lg font-semibold text-foreground",
                      children: title
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: onClose,
                    "aria-label": "Close modal",
                    "data-ocid": "modal.close_button",
                    className: "shrink-0 -mt-1 -mr-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children }),
              footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 pt-4 border-t border-border flex justify-end gap-3", children: footer })
            ]
          }
        )
      ]
    }
  );
}
export {
  Modal as M
};
