import { c as createLucideIcon, f as useParams, j as jsxRuntimeExports, L as Layout, S as Spinner, b as Link, B as Button, r as reactExports } from "./index-Zu5YxTH1.js";
import { O as OrderStatus } from "./backend-DKDm-Gkb.js";
import { O as OrderStatusBadge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./DFCard-Bk6ObHHP.js";
import { i as useOrder, g as formatOrderId, h as formatDate, f as formatPrice, j as useSubmitReview } from "./use-customer-f37_WYK4.js";
import { u as ue } from "./index-HR__IllL.js";
import { R as RefreshCw } from "./refresh-cw-C_axj-bx.js";
import { M as MapPin } from "./map-pin-g_bRSMR7.js";
import { C as CircleCheck } from "./circle-check-BFDbYaP0.js";
import { S as Star } from "./star-B9xuXsgB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const STATUS_STEPS = [
  OrderStatus.Pending,
  OrderStatus.Preparing,
  OrderStatus.Ready,
  OrderStatus.Completed
];
function StatusStepper({ current }) {
  const idx = STATUS_STEPS.indexOf(current);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-4", "aria-label": "Order progress", children: STATUS_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-bold shrink-0 border-2 transition-smooth ${i < idx ? "bg-primary border-primary text-primary-foreground" : i === idx ? "border-primary text-primary bg-primary/10" : "border-muted-foreground/30 text-muted-foreground/50 bg-transparent"}`,
        children: i < idx ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) : i + 1
      }
    ),
    i < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex-1 h-0.5 rounded transition-smooth ${i < idx ? "bg-primary" : "bg-border"}`
      }
    )
  ] }, step)) });
}
function ReviewForm({
  orderId,
  restaurantId
}) {
  const [rating, setRating] = reactExports.useState(0);
  const [hovered, setHovered] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const submitReview = useSubmitReview();
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 py-3 text-sm text-secondary font-display",
        "data-ocid": "review.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          "Thanks for your review!"
        ]
      }
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a star rating.");
      return;
    }
    try {
      await submitReview.mutateAsync({
        orderId,
        restaurantId,
        rating: BigInt(rating),
        comment: comment.trim()
      });
      setSubmitted(true);
      ue.success("Review submitted!");
    } catch {
      ue.error("Failed to submit review. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6", "data-ocid": "review.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Leave a Review" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm font-display font-medium text-foreground mb-2", children: "Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "review.star_rating", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setRating(star),
            onMouseEnter: () => setHovered(star),
            onMouseLeave: () => setHovered(0),
            "aria-label": `${star} star`,
            className: "transition-smooth",
            "data-ocid": `review.star_button.${star}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `h-7 w-7 transition-smooth ${star <= (hovered || rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`
              }
            )
          },
          star
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "review-comment",
            className: "text-sm font-display font-medium text-foreground",
            children: "Comment (optional)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "review-comment",
            value: comment,
            onChange: (e) => setComment(e.target.value),
            placeholder: "How was your experience?",
            rows: 3,
            className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none",
            "data-ocid": "review.comment_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: submitReview.isPending || rating === 0,
          "data-ocid": "review.submit_button",
          children: submitReview.isPending ? "Submitting…" : "Submit Review"
        }
      )
    ] }) })
  ] });
}
function OrderDetailPage() {
  const { orderId } = useParams({ from: "/customer/orders/$orderId" });
  const orderIdBigInt = BigInt(orderId);
  const {
    data: order,
    isLoading,
    refetch,
    isFetching
  } = useOrder(orderIdBigInt);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg" }) }) });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-64 gap-4",
        "data-ocid": "order_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-display", children: "Order not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Back to Orders" }) })
        ]
      }
    ) });
  }
  const orderTotal = order.items.reduce(
    (s, i) => s + i.price * i.quantity,
    BigInt(0)
  );
  const isCancelled = order.status === OrderStatus.Cancelled;
  const isCompleted = order.status === OrderStatus.Completed;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { showCart: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-8 max-w-2xl",
      "data-ocid": "order_detail.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 mb-4 -ml-2",
            "data-ocid": "order_detail.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              " All Orders"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: formatOrderId(order.id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: formatDate(order.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status.toLowerCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => refetch(),
                disabled: isFetching,
                "aria-label": "Refresh status",
                "data-ocid": "order_detail.refresh_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RefreshCw,
                  {
                    className: `h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`
                  }
                )
              }
            )
          ] })
        ] }),
        !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display text-muted-foreground uppercase tracking-wide mb-1", children: "Order Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusStepper, { current: order.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-2", children: STATUS_STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] text-muted-foreground flex-1 text-center",
              children: s
            },
            s
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground text-center", children: "Auto-updating every 3 seconds" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Order Summary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "divide-y divide-border", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center py-3 first:pt-0 last:pb-0",
              "data-ocid": `order_detail.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    formatPrice(item.price),
                    " × ",
                    item.quantity.toString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm shrink-0", children: formatPrice(item.price * item.quantity) })
              ]
            },
            `${item.menuItemId.toString()}-${idx}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-5 py-4 border-t border-border bg-muted/20 rounded-b-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-lg", children: formatPrice(orderTotal) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-display", children: "Delivery Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: order.deliveryAddress })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display", children: "Payment:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-display font-medium", children: order.paymentMethod })
          ] })
        ] }) }),
        isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewForm, { orderId: order.id, restaurantId: order.restaurantId })
      ]
    }
  ) });
}
export {
  OrderDetailPage as default
};
