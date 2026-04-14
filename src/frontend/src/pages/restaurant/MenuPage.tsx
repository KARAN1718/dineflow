import type { MenuItem } from "@/backend";
import { ExternalBlob } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/DFBadge";
import { Button } from "@/components/ui/DFButton";
import { Card, CardContent } from "@/components/ui/DFCard";
import { Input } from "@/components/ui/DFInput";
import { Modal } from "@/components/ui/DFModal";
import { FullPageSpinner, Spinner } from "@/components/ui/DFSpinner";
import { useAuth } from "@/hooks/use-auth";
import {
  useAddMenuItem,
  useDeleteMenuItem,
  useMenuItems,
  useMyRestaurant,
  useUpdateMenuItem,
} from "@/hooks/use-restaurant";
import { useNavigate } from "@tanstack/react-router";
import { Edit2, ImageIcon, Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ItemFormState {
  name: string;
  description: string;
  price: string;
  category: string;
  available: boolean;
  imageUrl?: string;
}

const EMPTY_FORM: ItemFormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  available: true,
  imageUrl: undefined,
};

function MenuItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}) {
  const priceRupees = (Number(item.price) / 100).toFixed(2);
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={item.available ? "success" : "muted"}>
            {item.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col gap-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-sm truncate">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {item.category}
            </p>
          </div>
          <span className="font-display font-bold text-primary text-sm shrink-0">
            ₹{priceRupees}
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex gap-2 mt-auto pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onEdit(item)}
            data-ocid="menu.edit_button"
          >
            <Edit2 className="h-3 w-3" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(item)}
            data-ocid="menu.delete_button"
            aria-label="Delete item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ItemForm({
  form,
  setForm,
  onSubmit,
  isPending,
  submitLabel,
}: {
  form: ItemFormState;
  setForm: React.Dispatch<React.SetStateAction<ItemFormState>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Item Name"
        placeholder="e.g. Margherita Pizza"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        required
        data-ocid="menu.item_name_input"
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="item-description"
          className="text-sm font-display font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="item-description"
          placeholder="Brief description of the dish..."
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={2}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
          data-ocid="menu.item_description_input"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Price (₹)"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          required
          data-ocid="menu.item_price_input"
        />
        <Input
          label="Category"
          placeholder="e.g. Mains, Starters"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          required
          data-ocid="menu.item_category_input"
        />
      </div>

      {/* Image upload */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="image-upload-btn"
          className="text-sm font-display font-medium text-foreground"
        >
          Image
        </label>
        <div className="flex items-center gap-3">
          {form.imageUrl ? (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="h-16 w-16 rounded-lg object-cover border border-border"
            />
          ) : (
            <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center border border-border">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Button
              id="image-upload-btn"
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              data-ocid="menu.upload_button"
              className="gap-1.5"
            >
              {uploading ? (
                <Spinner size="sm" />
              ) : (
                <ImageIcon className="h-3.5 w-3.5" />
              )}
              {uploading
                ? "Processing…"
                : form.imageUrl
                  ? "Change Image"
                  : "Upload Image"}
            </Button>
            {uploadError && (
              <p className="text-xs text-destructive">{uploadError}</p>
            )}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      {/* Availability */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={form.available}
          onChange={(e) =>
            setForm((f) => ({ ...f, available: e.target.checked }))
          }
          className="h-4 w-4 rounded border-input accent-primary"
          data-ocid="menu.item_available_checkbox"
        />
        <span className="text-sm font-display text-foreground">
          Available for ordering
        </span>
      </label>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-2"
        data-ocid="menu.item_submit_button"
      >
        {isPending ? <Spinner size="sm" /> : submitLabel}
      </Button>
    </form>
  );
}

export default function MenuPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const { data: items = [], isLoading: itemsLoading } = useMenuItems(
    restaurant?.rid,
  );
  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<MenuItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [addForm, setAddForm] = useState<ItemFormState>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<ItemFormState>(EMPTY_FORM);

  useEffect(() => {
    if (!isInitializing && isAuthenticated && !restLoading && !restaurant) {
      navigate({ to: "/restaurant/setup" });
    }
  }, [isInitializing, isAuthenticated, restLoading, restaurant, navigate]);

  if (isInitializing || restLoading) return <FullPageSpinner />;

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Button onClick={login} data-ocid="menu.login_button">
            Sign in to manage menu
          </Button>
        </div>
      </Layout>
    );
  }

  if (!restaurant) return <FullPageSpinner />;

  function handleAdd(e: React.FormEvent) {
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
        imageUrl: addForm.imageUrl,
      },
      {
        onSuccess: () => {
          setShowAdd(false);
          setAddForm(EMPTY_FORM);
        },
      },
    );
  }

  function openEdit(item: MenuItem) {
    setEditTarget(item);
    setEditForm({
      name: item.name,
      description: item.description,
      price: (Number(item.price) / 100).toFixed(2),
      category: item.category,
      available: item.available,
      imageUrl: item.imageUrl,
    });
  }

  function handleEdit(e: React.FormEvent) {
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
        imageUrl: editForm.imageUrl,
      },
      { onSuccess: () => setEditTarget(null) },
    );
  }

  function handleDelete() {
    if (!deleteTarget || !restaurant) return;
    deleteItem.mutate(
      { id: deleteTarget.id, restaurantId: restaurant.rid },
      { onSuccess: () => setDeleteTarget(null) },
    );
  }

  const categories = [...new Set(items.map((i) => i.category))].filter(Boolean);
  const uncategorized = items.filter((i) => !i.category);

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Menu Management
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {restaurant.name} · {items.length} items
            </p>
          </div>
          <Button
            onClick={() => setShowAdd(true)}
            className="gap-2"
            data-ocid="menu.add_item_button"
          >
            <Plus className="h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {itemsLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="menu.loading_state"
          >
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20" data-ocid="menu.empty_state">
            <UtensilsCrossed className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">
              No menu items yet
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Add your first dish to get started.
            </p>
            <Button
              onClick={() => setShowAdd(true)}
              className="gap-2"
              data-ocid="menu.add_first_item_button"
            >
              <Plus className="h-4 w-4" /> Add First Item
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="h-1 w-6 rounded bg-primary inline-block" />
                  {cat}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items
                    .filter((i) => i.category === cat)
                    .map((item, idx) => (
                      <div
                        key={item.id.toString()}
                        data-ocid={`menu.item.${idx + 1}`}
                      >
                        <MenuItemCard
                          item={item}
                          onEdit={openEdit}
                          onDelete={setDeleteTarget}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
            {uncategorized.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Other
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uncategorized.map((item, idx) => (
                    <div
                      key={item.id.toString()}
                      data-ocid={`menu.item.${idx + 1}`}
                    >
                      <MenuItemCard
                        item={item}
                        onEdit={openEdit}
                        onDelete={setDeleteTarget}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        open={showAdd}
        onClose={() => {
          setShowAdd(false);
          setAddForm(EMPTY_FORM);
        }}
        title="Add Menu Item"
        size="md"
      >
        <ItemForm
          form={addForm}
          setForm={setAddForm}
          onSubmit={handleAdd}
          isPending={addItem.isPending}
          submitLabel="Add Item"
        />
        {addItem.error && (
          <p
            className="text-xs text-destructive mt-2"
            data-ocid="menu.add_error_state"
          >
            {addItem.error.message}
          </p>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Menu Item"
        size="md"
      >
        <ItemForm
          form={editForm}
          setForm={setEditForm}
          onSubmit={handleEdit}
          isPending={updateItem.isPending}
          submitLabel="Save Changes"
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Item"
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="menu.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteItem.isPending}
              data-ocid="menu.delete_confirm_button"
            >
              {deleteItem.isPending ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
          This cannot be undone.
        </p>
      </Modal>
    </Layout>
  );
}
