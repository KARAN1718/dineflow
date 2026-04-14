import { c as createLucideIcon, j as jsxRuntimeExports, L as Layout, S as Spinner, b as Link, B as Button } from "./index-Zu5YxTH1.js";
import { O as OrderStatusBadge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./DFCard-Bk6ObHHP.js";
import { e as useCustomerOrders, g as formatOrderId, h as formatDate, f as formatPrice } from "./use-customer-f37_WYK4.js";
import { C as ClipboardList } from "./clipboard-list-ZBPI_0_D.js";
import "./backend-DKDm-Gkb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function CustomerOrdersPage() {
  const { data: orders = [], isLoading } = useCustomerOrders();
  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "orders.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Orders" })
        ] }),
        sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 gap-4",
            "data-ocid": "orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 text-muted-foreground/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "No orders yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs", children: "When you place an order it will appear here so you can track its status." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/explore", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", "data-ocid": "orders.explore_button", children: "Find a Restaurant" }) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "orders.list", children: sorted.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/customer/orders/$orderId",
            params: { orderId: order.id.toString() },
            "data-ocid": `orders.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:shadow-elevated transition-smooth cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: formatOrderId(order.id) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDate(order.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status.toLowerCase() })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-1", children: order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary", children: formatPrice(
                    order.items.reduce(
                      (s, i) => s + i.price * i.quantity,
                      BigInt(0)
                    )
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
                ] })
              ] })
            ] })
          },
          order.id.toString()
        )) })
      ]
    }
  ) });
}
export {
  CustomerOrdersPage as default
};
