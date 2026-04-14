import { c as createLucideIcon, a as useNavigate, g as useCartStore, r as reactExports, j as jsxRuntimeExports, L as Layout, h as ShoppingCart, b as Link, B as Button, S as Spinner } from "./index-Zu5YxTH1.js";
import { P as PaymentMethod } from "./backend-DKDm-Gkb.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./DFCard-Bk6ObHHP.js";
import { I as Input } from "./DFInput-ByZhbk2s.js";
import { d as usePlaceOrder, a as useCustomerProfile } from "./use-customer-f37_WYK4.js";
import { u as ue } from "./index-HR__IllL.js";
import { M as Minus } from "./minus-Dga2l-oK.js";
import { P as Plus } from "./plus-CoNVVAoo.js";
import { T as Trash2 } from "./trash-2-B5b1EwQk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const PAYMENT_OPTIONS = [
  {
    value: PaymentMethod.Cash,
    label: "Cash on Delivery",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" })
  },
  {
    value: PaymentMethod.Card,
    label: "Card",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" })
  },
  {
    value: PaymentMethod.UPI,
    label: "UPI",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "UPI" })
  }
];
function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const restaurantId = useCartStore((s) => s.restaurantId);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total());
  const [address, setAddress] = reactExports.useState("");
  const [addressError, setAddressError] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState(
    PaymentMethod.Cash
  );
  const [notes, setNotes] = reactExports.useState("");
  const placeOrder = usePlaceOrder();
  const { data: profile } = useCustomerProfile();
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setAddressError("Delivery address is required");
      return;
    }
    setAddressError("");
    if (!restaurantId || items.length === 0) {
      ue.error("Your cart is empty.");
      return;
    }
    try {
      const order = await placeOrder.mutateAsync({
        restaurantId,
        deliveryAddress: address.trim(),
        paymentMethod,
        customerName: (profile == null ? void 0 : profile.name) ?? "Customer",
        phone: "",
        items: items.map((i) => ({
          menuItemId: BigInt(i.menuItem.id),
          quantity: BigInt(i.quantity)
        }))
      });
      clearCart();
      ue.success("Order placed successfully!");
      navigate({
        to: "/customer/orders/$orderId",
        params: { orderId: order.id.toString() }
      });
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-64 gap-4 py-24",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-16 w-16 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Browse a restaurant's menu and add items to get started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/explore", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", "data-ocid": "cart.explore_button", children: "Explore Restaurants" }) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "cart.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-6", children: "Your Cart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceOrder, className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Order Items" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "divide-y divide-border", children: items.map((cartItem, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 py-3 first:pt-0 last:pb-0",
                "data-ocid": `cart.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-foreground text-sm truncate", children: cartItem.menuItem.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "₹",
                      cartItem.menuItem.price.toFixed(2),
                      " each"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "icon",
                        className: "h-7 w-7",
                        onClick: () => updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.quantity - 1
                        ),
                        "aria-label": "Decrease",
                        "data-ocid": `cart.decrease_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-display font-semibold text-sm", children: cartItem.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "icon",
                        className: "h-7 w-7",
                        onClick: () => updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.quantity + 1
                        ),
                        "aria-label": "Increase",
                        "data-ocid": `cart.increase_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-foreground text-sm w-14 text-right shrink-0", children: [
                    "₹",
                    (cartItem.menuItem.price * cartItem.quantity).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "h-7 w-7 text-destructive hover:text-destructive shrink-0",
                      onClick: () => removeItem(cartItem.menuItem.id),
                      "aria-label": "Remove item",
                      "data-ocid": `cart.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ]
              },
              cartItem.menuItem.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-5 py-4 border-t border-border bg-muted/20 rounded-b-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-lg", children: [
                "₹",
                total.toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Delivery Details" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  label: "Delivery address",
                  value: address,
                  onChange: (e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim()) setAddressError("");
                  },
                  placeholder: "123 Main St, Apt 4B, City",
                  error: addressError,
                  "data-ocid": "cart.address_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "cart-notes",
                    className: "text-sm font-display font-medium text-foreground",
                    children: "Order notes (optional)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "cart-notes",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    placeholder: "Any special requests?",
                    rows: 2,
                    className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none",
                    "data-ocid": "cart.notes_textarea"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Payment Method" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col gap-2", children: PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${paymentMethod === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`,
                "data-ocid": `cart.payment_${opt.value.toLowerCase()}_radio`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "paymentMethod",
                      value: opt.value,
                      checked: paymentMethod === opt.value,
                      onChange: () => setPaymentMethod(opt.value),
                      className: "sr-only"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === opt.value ? "border-primary" : "border-muted-foreground/40"}`,
                      children: paymentMethod === opt.value && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: opt.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-medium text-foreground text-sm", children: opt.label })
                ]
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                variant: "default",
                size: "xl",
                disabled: placeOrder.isPending,
                className: "w-full",
                "data-ocid": "cart.place_order_button",
                children: placeOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }),
                  " Placing Order…"
                ] }) : `Place Order · ₹${total.toFixed(2)}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground", children: [
              "Payment will be collected",
              " ",
              paymentMethod === "Cash" ? "on delivery" : "upon confirmation",
              "."
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  CartPage as default
};
