import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, L as Layout, B as Button, S as Spinner } from "./index-Zu5YxTH1.js";
import { O as OrderStatus } from "./backend-DKDm-Gkb.js";
import { O as OrderStatusBadge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card } from "./DFCard-Bk6ObHHP.js";
import { u as useMyRestaurant, a as useRestaurantOrders, f as useUpdateOrderStatus } from "./use-restaurant-5nL47CXJ.js";
import { R as RefreshCw } from "./refresh-cw-C_axj-bx.js";
import { C as ClipboardList } from "./clipboard-list-ZBPI_0_D.js";
const STATUS_FLOW = {
  [OrderStatus.Pending]: {
    next: OrderStatus.Preparing,
    label: "Accept & Prepare"
  },
  [OrderStatus.Preparing]: { next: OrderStatus.Ready, label: "Mark Ready" },
  [OrderStatus.Ready]: {
    next: OrderStatus.Completed,
    label: "Mark Completed"
  },
  [OrderStatus.Completed]: null,
  [OrderStatus.Cancelled]: null
};
function formatTime(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function OrderCard({
  order,
  restaurantId
}) {
  const updateStatus = useUpdateOrderStatus();
  const transition = STATUS_FLOW[order.status];
  const total = order.items.reduce(
    (s, i) => s + Number(i.price) * Number(i.quantity),
    0
  );
  function handleAdvance() {
    if (!transition) return;
    updateStatus.mutate({
      id: order.id,
      status: transition.next,
      restaurantId
    });
  }
  const stripColor = order.status === OrderStatus.Pending ? "bg-accent" : order.status === OrderStatus.Preparing ? "bg-primary" : order.status === OrderStatus.Ready ? "bg-secondary" : "bg-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col sm:flex-row overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 sm:h-auto sm:w-1 flex-shrink-0 ${stripColor}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground text-sm", children: [
              "#",
              order.id.toString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status.toLowerCase() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5", children: order.customerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground", children: [
            "₹",
            (total / 100).toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display text-muted-foreground", children: order.paymentMethod })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-medium text-muted-foreground mb-1.5", children: "Order Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                item.name,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "×",
                  item.quantity.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-mono text-xs", children: [
                "₹",
                (Number(item.price) * Number(item.quantity) / 100).toFixed(
                  2
                )
              ] })
            ]
          },
          `${item.menuItemId.toString()}-${item.name}`
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTime(order.createdAt) }),
        transition ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: handleAdvance,
            disabled: updateStatus.isPending,
            className: "gap-1.5",
            "data-ocid": "orders.advance_status_button",
            children: updateStatus.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }) : transition.label
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: order.status === OrderStatus.Completed ? "Order complete" : "Cancelled" })
      ] })
    ] })
  ] });
}
const STATUS_TABS = [
  { label: "All", value: null },
  { label: "Pending", value: OrderStatus.Pending },
  { label: "Preparing", value: OrderStatus.Preparing },
  { label: "Ready", value: OrderStatus.Ready },
  { label: "Completed", value: OrderStatus.Completed }
];
function RestaurantOrdersPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch
  } = useRestaurantOrders(restaurant == null ? void 0 : restaurant.rid);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!isInitializing && isAuthenticated && !restLoading && !restaurant) {
      navigate({ to: "/restaurant/setup" });
    }
  }, [isInitializing, isAuthenticated, restLoading, restaurant, navigate]);
  if (isInitializing || restLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "orders.login_button", children: "Sign in to view orders" }) }) });
  }
  if (!restaurant) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  const filtered = activeTab ? sorted.filter((o) => o.status === activeTab) : sorted;
  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.Pending
  ).length;
  const preparingCount = orders.filter(
    (o) => o.status === OrderStatus.Preparing
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            restaurant.name,
            " · Auto-refreshes every 3s",
            isFetching && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-primary animate-pulse", children: "●" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            className: "gap-1.5",
            "data-ocid": "orders.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
              " Refresh"
            ]
          }
        )
      ] }),
      (pendingCount > 0 || preparingCount > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/15 text-accent rounded-lg px-3 py-1.5 text-sm font-display font-medium", children: [
          pendingCount,
          " new order",
          pendingCount > 1 ? "s" : "",
          " waiting"
        ] }),
        preparingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/15 text-primary rounded-lg px-3 py-1.5 text-sm font-display font-medium", children: [
          preparingCount,
          " being prepared"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 bg-muted rounded-lg p-1 w-fit mb-6 flex-wrap",
          "data-ocid": "orders.filter.tab",
          children: STATUS_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(t.value),
              className: `px-3 py-1.5 rounded-md text-sm font-display font-medium transition-smooth ${activeTab === t.value ? "bg-card shadow-card text-foreground" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `orders.tab.${t.label.toLowerCase()}`,
              children: [
                t.label,
                t.value !== null && orders.filter((o) => o.status === t.value).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0.5 inline-block", children: orders.filter((o) => o.status === t.value).length })
              ]
            },
            t.label
          ))
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex justify-center py-20",
          "data-ocid": "orders.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg" })
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "orders.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-foreground mb-1", children: "No orders found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: activeTab ? `No ${activeTab.toLowerCase()} orders right now.` : "Orders appear here when customers start ordering." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": `orders.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, restaurantId: restaurant.rid })
        },
        order.id.toString()
      )) })
    ] })
  ] });
}
export {
  RestaurantOrdersPage as default
};
