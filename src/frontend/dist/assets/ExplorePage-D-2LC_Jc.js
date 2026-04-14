import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Layout, U as UtensilsCrossed, B as Button, S as Spinner } from "./index-Zu5YxTH1.js";
import { I as Input } from "./DFInput-ByZhbk2s.js";
import { M as Modal } from "./DFModal-o8XAmWR3.js";
import { u as useRestaurant, a as useCustomerProfile, b as useRegisterCustomer } from "./use-customer-f37_WYK4.js";
import { u as ue } from "./index-HR__IllL.js";
import "./backend-DKDm-Gkb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function ExplorePage() {
  const navigate = useNavigate();
  const [rid, setRid] = reactExports.useState("");
  const [searchRid, setSearchRid] = reactExports.useState("");
  const [notFound, setNotFound] = reactExports.useState(false);
  const [showProfileModal, setShowProfileModal] = reactExports.useState(false);
  const [pendingRid, setPendingRid] = reactExports.useState("");
  const [profileName, setProfileName] = reactExports.useState("");
  const [profilePhone, setProfilePhone] = reactExports.useState("");
  const [profileNameError, setProfileNameError] = reactExports.useState("");
  const { data: restaurant, isLoading } = useRestaurant(searchRid);
  const { data: profile, isLoading: profileLoading } = useCustomerProfile();
  const registerMutation = useRegisterCustomer();
  reactExports.useEffect(() => {
    if (!searchRid || isLoading || profileLoading) return;
    if (restaurant) {
      setNotFound(false);
      if (!profile) {
        setPendingRid(searchRid);
        setShowProfileModal(true);
      } else {
        navigate({
          to: "/customer/restaurant/$restaurantId",
          params: { restaurantId: searchRid }
        });
      }
    } else if (restaurant === null) {
      setNotFound(true);
    }
  }, [restaurant, isLoading, searchRid, profile, profileLoading, navigate]);
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = rid.trim().toUpperCase();
    if (!trimmed) return;
    setNotFound(false);
    setSearchRid(trimmed);
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      setProfileNameError("Name is required");
      return;
    }
    setProfileNameError("");
    try {
      await registerMutation.mutateAsync({
        name: profileName.trim(),
        phone: profilePhone.trim()
      });
      setShowProfileModal(false);
      navigate({
        to: "/customer/restaurant/$restaurantId",
        params: { restaurantId: pendingRid }
      });
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { showCart: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-10 w-10 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center", children: "Find Your Restaurant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center mb-10 max-w-md text-sm sm:text-base", children: "Enter the Restaurant ID (RID) shared by your restaurant or scan their QR code to browse the menu and place an order." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSearch,
          className: "w-full max-w-md flex flex-col sm:flex-row gap-3",
          "data-ocid": "explore.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: rid,
                  onChange: (e) => {
                    setRid(e.target.value);
                    setNotFound(false);
                  },
                  placeholder: "Enter Restaurant ID e.g. REST001",
                  className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                  "data-ocid": "explore.search_input"
                }
              ),
              notFound && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "mt-2 text-sm text-destructive",
                  "data-ocid": "explore.error_state",
                  children: "Restaurant not found. Please check the ID and try again."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                variant: "default",
                size: "lg",
                disabled: isLoading || !rid.trim(),
                className: "shrink-0 gap-2 rounded-xl",
                "data-ocid": "explore.submit_button",
                children: [
                  isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
                  "Explore"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl", children: [
        {
          emoji: "🔍",
          title: "Enter RID",
          desc: "Type the unique Restaurant ID"
        },
        {
          emoji: "📋",
          title: "Browse Menu",
          desc: "Explore dishes by category"
        },
        {
          emoji: "🛒",
          title: "Place Order",
          desc: "Add items and checkout easily"
        }
      ].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 text-center shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: step.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mt-2 text-sm", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: step.desc })
          ]
        },
        step.title
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: showProfileModal,
        onClose: () => setShowProfileModal(false),
        title: "Set up your profile",
        description: "Just a quick one-time setup before you order.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleProfileSubmit, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Your name",
              value: profileName,
              onChange: (e) => setProfileName(e.target.value),
              placeholder: "e.g. Jane Smith",
              error: profileNameError,
              required: true,
              "data-ocid": "profile.name_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Phone number (optional)",
              value: profilePhone,
              onChange: (e) => setProfilePhone(e.target.value),
              placeholder: "e.g. +1 555 000 0000",
              type: "tel",
              "data-ocid": "profile.phone_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setShowProfileModal(false),
                "data-ocid": "profile.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: registerMutation.isPending,
                "data-ocid": "profile.submit_button",
                children: registerMutation.isPending ? "Saving…" : "Continue"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ExplorePage as default
};
