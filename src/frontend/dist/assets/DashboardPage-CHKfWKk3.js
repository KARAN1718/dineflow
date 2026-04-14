import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, L as Layout, C as ChefHat, B as Button, U as UtensilsCrossed, b as Link, S as Spinner } from "./index-Zu5YxTH1.js";
import { O as OrderStatus } from "./backend-DKDm-Gkb.js";
import { O as OrderStatusBadge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./DFCard-Bk6ObHHP.js";
import { u as useMyRestaurant, a as useRestaurantOrders } from "./use-restaurant-5nL47CXJ.js";
import { C as CircleCheck } from "./circle-check-BFDbYaP0.js";
import { C as ClipboardList } from "./clipboard-list-ZBPI_0_D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode);
function QRDisplay({ value }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=160x160&margin=8&color=8B4513&bgcolor=FFF8F0`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-2 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrUrl,
        alt: "Restaurant QR Code",
        className: "h-40 w-40 rounded-lg"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-[180px]", children: "Customers scan this to access your menu" })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-10 w-10 rounded-xl flex items-center justify-center ${color}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display", children: label })
    ] })
  ] }) }) });
}
function RecentOrderRow({ order }) {
  const total = order.items.reduce(
    (s, i) => s + Number(i.price) * Number(i.quantity),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-medium text-foreground text-sm truncate", children: [
        "#",
        order.id.toString(),
        " — ",
        order.customerName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0 ml-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display font-semibold text-foreground", children: [
        "₹",
        (total / 100).toFixed(2)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status.toLowerCase() })
    ] })
  ] });
}
function DashboardPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const { data: orders = [], isLoading: ordersLoading } = useRestaurantOrders(
    restaurant == null ? void 0 : restaurant.rid
  );
  const navigate = useNavigate();
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && isAuthenticated && !restLoading && !restaurant) {
      navigate({ to: "/restaurant/setup" });
    }
  }, [isInitializing, isAuthenticated, restLoading, restaurant, navigate]);
  if (isInitializing || restLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-12 w-12 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Owner Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to manage your restaurant." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, size: "lg", "data-ocid": "dashboard.login_button", children: "Sign in" })
    ] }) });
  }
  if (!restaurant) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.Pending
  ).length;
  const preparingCount = orders.filter(
    (o) => o.status === OrderStatus.Preparing
  ).length;
  const readyCount = orders.filter(
    (o) => o.status === OrderStatus.Ready
  ).length;
  const completedCount = orders.filter(
    (o) => o.status === OrderStatus.Completed
  ).length;
  const recentOrders = [...orders].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
  function copyRid() {
    navigator.clipboard.writeText(restaurant.rid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-5 w-5 opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display opacity-80", children: "Restaurant Owner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: restaurant.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-75 mt-1", children: restaurant.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurant/menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
            "data-ocid": "dashboard.menu_link",
            children: "Manage Menu"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurant/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
            "data-ocid": "dashboard.orders_link",
            children: "All Orders"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Order Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Clock,
                label: "Pending",
                value: pendingCount,
                color: "bg-accent/15 text-accent"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Package,
                label: "Preparing",
                value: preparingCount,
                color: "bg-primary/15 text-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: CircleCheck,
                label: "Ready",
                value: readyCount,
                color: "bg-secondary/15 text-secondary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: ClipboardList,
                label: "Completed",
                value: completedCount,
                color: "bg-muted text-muted-foreground"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurant/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-primary gap-1",
                "data-ocid": "dashboard.view_all_orders_link",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex justify-center py-8",
              "data-ocid": "dashboard.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {})
            }
          ) : recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10",
              "data-ocid": "dashboard.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-muted-foreground mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-display text-sm", children: "No orders yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Share your QR code to start receiving orders." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecentOrderRow, { order }, order.id.toString())) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { elevated: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-5 w-5 text-primary" }),
            " Restaurant ID"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QRDisplay, { value: restaurant.rid }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-muted rounded-lg px-3 py-2 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "code",
                {
                  className: "text-xs font-mono text-foreground truncate",
                  "data-ocid": "dashboard.rid_display",
                  children: restaurant.rid
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: copyRid,
                  className: "shrink-0 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Copy RID",
                  "data-ocid": "dashboard.copy_rid_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
                }
              )
            ] }),
            copied && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-secondary font-display",
                "data-ocid": "dashboard.success_state",
                children: "Copied to clipboard!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Customers enter this ID or scan the QR code to browse your menu." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/restaurant/menu",
              "data-ocid": "dashboard.quick_menu_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-5 w-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: "Menu Management" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Add, edit or remove items" })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/restaurant/orders",
              "data-ocid": "dashboard.quick_orders_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: "Order Management" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Track and update order status" })
                ] })
              ] })
            }
          )
        ] }) }) })
      ] })
    ] }) })
  ] });
}
export {
  DashboardPage as default
};
