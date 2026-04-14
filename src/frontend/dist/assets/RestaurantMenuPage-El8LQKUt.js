import { c as createLucideIcon, f as useParams, g as useCartStore, j as jsxRuntimeExports, L as Layout, S as Spinner, b as Link, B as Button, h as ShoppingCart } from "./index-Zu5YxTH1.js";
import { B as Badge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent, d as CardFooter } from "./DFCard-Bk6ObHHP.js";
import { u as useRestaurant, c as useMenuItems, f as formatPrice } from "./use-customer-f37_WYK4.js";
import { M as MapPin } from "./map-pin-g_bRSMR7.js";
import { P as Plus } from "./plus-CoNVVAoo.js";
import { M as Minus } from "./minus-Dga2l-oK.js";
import "./backend-DKDm-Gkb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7", key: "ztvudi" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }],
  ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4", key: "2ebpfo" }],
  ["path", { d: "M2 7h20", key: "1fcdvo" }],
  [
    "path",
    {
      d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
      key: "6c3vgh"
    }
  ]
];
const Store = createLucideIcon("store", __iconNode);
function RestaurantMenuPage() {
  const { restaurantId } = useParams({
    from: "/customer/restaurant/$restaurantId"
  });
  const { data: restaurant, isLoading: loadingRestaurant } = useRestaurant(restaurantId);
  const { data: menuItems = [], isLoading: loadingMenu } = useMenuItems(restaurantId);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());
  const getQty = (id) => {
    var _a;
    return ((_a = cartItems.find((i) => i.menuItem.id === id.toString())) == null ? void 0 : _a.quantity) ?? 0;
  };
  const categories = Array.from(
    new Set(menuItems.filter((m) => m.available).map((m) => m.category))
  );
  const isLoading = loadingRestaurant || loadingMenu;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg" }) }) });
  }
  if (!restaurant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-64 gap-4",
        "data-ocid": "restaurant_menu.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-12 w-12 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-display", children: "Restaurant not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/explore", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Go back" }) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { showCart: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "restaurant_menu.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-8 w-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: restaurant.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1.5", children: [
              restaurant.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                restaurant.address
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
                "RID: ",
                restaurant.rid
              ] })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 pb-28", children: [
      categories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "restaurant_menu.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg", children: "No menu items available yet." })
        }
      ),
      categories.map((category, catIdx) => {
        const items = menuItems.filter(
          (m) => m.category === category && m.available
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2", children: [
            category,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
              "(",
              items.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((item, itemIdx) => {
            const qty = getQty(item.id);
            const globalIdx = catIdx * 100 + itemIdx + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "overflow-hidden flex flex-col",
                "data-ocid": `menu.item.${globalIdx}`,
                children: [
                  item.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.imageUrl,
                      alt: item.name,
                      className: "w-full h-40 object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: item.name }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 py-0", children: [
                    item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: item.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display font-semibold text-primary text-base", children: formatPrice(item.price) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "pt-3", children: qty === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "default",
                      size: "sm",
                      className: "w-full gap-1.5",
                      onClick: () => addItem({
                        id: item.id.toString(),
                        restaurantId: item.restaurantId,
                        name: item.name,
                        description: item.description,
                        price: Number(item.price) / 100,
                        category: item.category,
                        imageUrl: item.imageUrl,
                        available: item.available
                      }),
                      "data-ocid": `menu.add_button.${globalIdx}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                        " Add to Cart"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "icon",
                        onClick: () => updateQuantity(item.id.toString(), qty - 1),
                        "aria-label": "Decrease quantity",
                        "data-ocid": `menu.decrease_button.${globalIdx}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground min-w-[2rem] text-center", children: qty }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "icon",
                        onClick: () => updateQuantity(item.id.toString(), qty + 1),
                        "aria-label": "Increase quantity",
                        "data-ocid": `menu.increase_button.${globalIdx}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              item.id.toString()
            );
          }) })
        ] }, category);
      })
    ] }),
    itemCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-30 p-4 bg-card border-t border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground text-sm", children: [
            itemCount,
            " ",
            itemCount === 1 ? "item" : "items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Total: ₹",
            total.toFixed(2)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "default",
          size: "lg",
          "data-ocid": "menu.view_cart_button",
          children: "View Cart →"
        }
      ) })
    ] }) })
  ] });
}
export {
  RestaurantMenuPage as default
};
