import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, L as Layout, C as ChefHat, B as Button } from "./index-Zu5YxTH1.js";
import { C as Card, b as CardHeader, a as CardContent } from "./DFCard-Bk6ObHHP.js";
import { I as Input } from "./DFInput-ByZhbk2s.js";
import { u as useMyRestaurant, g as useRegisterRestaurant } from "./use-restaurant-5nL47CXJ.js";
import { U as Utensils } from "./utensils-CwzZXbHl.js";
import { M as MapPin } from "./map-pin-g_bRSMR7.js";
import "./backend-DKDm-Gkb.js";
function SetupPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading } = useMyRestaurant();
  const register = useRegisterRestaurant();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    address: "",
    email: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (restaurant) {
      navigate({ to: "/restaurant/dashboard" });
    }
  }, [restaurant, navigate]);
  if (isInitializing || isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-8 w-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Restaurant Owner Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Sign in with Internet Identity to register and manage your restaurant." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, size: "lg", "data-ocid": "setup.login_button", children: "Sign in to Get Started" })
    ] }) });
  }
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Restaurant name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    register.mutate(form, {
      onSuccess: () => navigate({ to: "/restaurant/dashboard" })
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-8rem)] bg-muted/30 py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Register Your Restaurant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Set up your restaurant profile to start receiving orders." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { elevated: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Restaurant Details" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            label: "Restaurant Name",
            placeholder: "e.g. La Terraza",
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            error: errors.name,
            "data-ocid": "setup.name_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            label: "Email",
            type: "email",
            placeholder: "owner@restaurant.com",
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
            error: errors.email,
            "data-ocid": "setup.email_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            label: "Phone Number",
            placeholder: "+91 98765 43210",
            value: form.phone,
            onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
            error: errors.phone,
            "data-ocid": "setup.phone_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "address",
              className: "text-sm font-display font-medium text-foreground flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                " ",
                "Address"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "address",
              placeholder: "Full restaurant address",
              value: form.address,
              onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
              rows: 3,
              className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none",
              "data-ocid": "setup.address_input"
            }
          ),
          errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.address })
        ] }),
        register.error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2",
            "data-ocid": "setup.error_state",
            children: register.error.message
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: register.isPending,
            className: "w-full mt-2",
            "data-ocid": "setup.submit_button",
            children: register.isPending ? "Creating Restaurant…" : "Create Restaurant & Get Started"
          }
        )
      ] }) })
    ] })
  ] }) }) });
}
export {
  SetupPage as default
};
