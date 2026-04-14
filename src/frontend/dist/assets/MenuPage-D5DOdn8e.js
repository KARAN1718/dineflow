import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, F as FullPageSpinner, L as Layout, B as Button, S as Spinner, U as UtensilsCrossed } from "./index-Zu5YxTH1.js";
import { E as ExternalBlob } from "./backend-DKDm-Gkb.js";
import { B as Badge } from "./DFBadge-D7Zu8Ctr.js";
import { C as Card, a as CardContent } from "./DFCard-Bk6ObHHP.js";
import { I as Input } from "./DFInput-ByZhbk2s.js";
import { M as Modal } from "./DFModal-o8XAmWR3.js";
import { u as useMyRestaurant, b as useMenuItems, c as useAddMenuItem, d as useUpdateMenuItem, e as useDeleteMenuItem } from "./use-restaurant-5nL47CXJ.js";
import { P as Plus } from "./plus-CoNVVAoo.js";
import { T as Trash2 } from "./trash-2-B5b1EwQk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  available: true,
  imageUrl: void 0
};
function MenuItemCard({
  item,
  onEdit,
  onDelete
}) {
  const priceRupees = (Number(item.price) / 100).toFixed(2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted relative overflow-hidden", children: [
      item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: item.imageUrl,
          alt: item.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-8 w-8 text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: item.available ? "success" : "muted", children: item.available ? "Available" : "Unavailable" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 flex flex-col gap-2 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm truncate", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-primary text-sm shrink-0", children: [
          "₹",
          priceRupees
        ] })
      ] }),
      item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: item.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "flex-1 gap-1",
            onClick: () => onEdit(item),
            "data-ocid": "menu.edit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }),
              " Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => onDelete(item),
            "data-ocid": "menu.delete_button",
            "aria-label": "Delete item",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    ] })
  ] });
}
function ItemForm({
  form,
  setForm,
  onSubmit,
  isPending,
  submitLabel
}) {
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadError, setUploadError] = reactExports.useState(null);
  async function handleImageSelect(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const url = blob.getDirectURL();
      setForm((f) => ({ ...f, imageUrl: url }));
    } catch {
      setUploadError("Failed to process image. Please try again.");
    } finally {
      setUploading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        label: "Item Name",
        placeholder: "e.g. Margherita Pizza",
        value: form.name,
        onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
        required: true,
        "data-ocid": "menu.item_name_input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "item-description",
          className: "text-sm font-display font-medium text-foreground",
          children: "Description"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "item-description",
          placeholder: "Brief description of the dish...",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
          rows: 2,
          className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none",
          "data-ocid": "menu.item_description_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          label: "Price (₹)",
          type: "number",
          min: "0",
          step: "0.01",
          placeholder: "0.00",
          value: form.price,
          onChange: (e) => setForm((f) => ({ ...f, price: e.target.value })),
          required: true,
          "data-ocid": "menu.item_price_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          label: "Category",
          placeholder: "e.g. Mains, Starters",
          value: form.category,
          onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
          required: true,
          "data-ocid": "menu.item_category_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "image-upload-btn",
          className: "text-sm font-display font-medium text-foreground",
          children: "Image"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        form.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: form.imageUrl,
            alt: "Preview",
            className: "h-16 w-16 rounded-lg object-cover border border-border"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-lg bg-muted flex items-center justify-center border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-6 w-6 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              id: "image-upload-btn",
              type: "button",
              variant: "outline",
              size: "sm",
              disabled: uploading,
              onClick: () => {
                var _a;
                return (_a = fileRef.current) == null ? void 0 : _a.click();
              },
              "data-ocid": "menu.upload_button",
              className: "gap-1.5",
              children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3.5 w-3.5" }),
                uploading ? "Processing…" : form.imageUrl ? "Change Image" : "Upload Image"
              ]
            }
          ),
          uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: uploadError })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleImageSelect
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: form.available,
          onChange: (e) => setForm((f) => ({ ...f, available: e.target.checked })),
          className: "h-4 w-4 rounded border-input accent-primary",
          "data-ocid": "menu.item_available_checkbox"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display text-foreground", children: "Available for ordering" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        disabled: isPending,
        className: "mt-2",
        "data-ocid": "menu.item_submit_button",
        children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }) : submitLabel
      }
    )
  ] });
}
function MenuPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const { data: items = [], isLoading: itemsLoading } = useMenuItems(
    restaurant == null ? void 0 : restaurant.rid
  );
  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [addForm, setAddForm] = reactExports.useState(EMPTY_FORM);
  const [editForm, setEditForm] = reactExports.useState(EMPTY_FORM);
  reactExports.useEffect(() => {
    if (!isInitializing && isAuthenticated && !restLoading && !restaurant) {
      navigate({ to: "/restaurant/setup" });
    }
  }, [isInitializing, isAuthenticated, restLoading, restaurant, navigate]);
  if (isInitializing || restLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "menu.login_button", children: "Sign in to manage menu" }) }) });
  }
  if (!restaurant) return /* @__PURE__ */ jsxRuntimeExports.jsx(FullPageSpinner, {});
  function handleAdd(e) {
    e.preventDefault();
    if (!restaurant) return;
    addItem.mutate(
      {
        restaurantId: restaurant.rid,
        name: addForm.name,
        description: addForm.description,
        price: BigInt(Math.round(Number(addForm.price) * 100)),
        category: addForm.category,
        available: addForm.available,
        imageUrl: addForm.imageUrl
      },
      {
        onSuccess: () => {
          setShowAdd(false);
          setAddForm(EMPTY_FORM);
        }
      }
    );
  }
  function openEdit(item) {
    setEditTarget(item);
    setEditForm({
      name: item.name,
      description: item.description,
      price: (Number(item.price) / 100).toFixed(2),
      category: item.category,
      available: item.available,
      imageUrl: item.imageUrl
    });
  }
  function handleEdit(e) {
    e.preventDefault();
    if (!editTarget || !restaurant) return;
    updateItem.mutate(
      {
        id: editTarget.id,
        restaurantId: restaurant.rid,
        name: editForm.name,
        description: editForm.description,
        price: BigInt(Math.round(Number(editForm.price) * 100)),
        category: editForm.category,
        available: editForm.available,
        imageUrl: editForm.imageUrl
      },
      { onSuccess: () => setEditTarget(null) }
    );
  }
  function handleDelete() {
    if (!deleteTarget || !restaurant) return;
    deleteItem.mutate(
      { id: deleteTarget.id, restaurantId: restaurant.rid },
      { onSuccess: () => setDeleteTarget(null) }
    );
  }
  const categories = [...new Set(items.map((i) => i.category))].filter(Boolean);
  const uncategorized = items.filter((i) => !i.category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Menu Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          restaurant.name,
          " · ",
          items.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "gap-2",
          "data-ocid": "menu.add_item_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add Item"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: itemsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center py-20",
        "data-ocid": "menu.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "lg" })
      }
    ) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "menu.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "h-12 w-12 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "No menu items yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Add your first dish to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowAdd(true),
          className: "gap-2",
          "data-ocid": "menu.add_first_item_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add First Item"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
      categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-6 rounded bg-primary inline-block" }),
          cat
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: items.filter((i) => i.category === cat).map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `menu.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItemCard,
              {
                item,
                onEdit: openEdit,
                onDelete: setDeleteTarget
              }
            )
          },
          item.id.toString()
        )) })
      ] }, cat)),
      uncategorized.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Other" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: uncategorized.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": `menu.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItemCard,
              {
                item,
                onEdit: openEdit,
                onDelete: setDeleteTarget
              }
            )
          },
          item.id.toString()
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        open: showAdd,
        onClose: () => {
          setShowAdd(false);
          setAddForm(EMPTY_FORM);
        },
        title: "Add Menu Item",
        size: "md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ItemForm,
            {
              form: addForm,
              setForm: setAddForm,
              onSubmit: handleAdd,
              isPending: addItem.isPending,
              submitLabel: "Add Item"
            }
          ),
          addItem.error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive mt-2",
              "data-ocid": "menu.add_error_state",
              children: addItem.error.message
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!editTarget,
        onClose: () => setEditTarget(null),
        title: "Edit Menu Item",
        size: "md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ItemForm,
          {
            form: editForm,
            setForm: setEditForm,
            onSubmit: handleEdit,
            isPending: updateItem.isPending,
            submitLabel: "Save Changes"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!deleteTarget,
        onClose: () => setDeleteTarget(null),
        title: "Delete Item",
        size: "sm",
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setDeleteTarget(null),
              "data-ocid": "menu.delete_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: handleDelete,
              disabled: deleteItem.isPending,
              "data-ocid": "menu.delete_confirm_button",
              children: deleteItem.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { size: "sm" }) : "Delete"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
          "Are you sure you want to delete ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget == null ? void 0 : deleteTarget.name }),
          "? This cannot be undone."
        ] })
      }
    )
  ] });
}
export {
  MenuPage as default
};
