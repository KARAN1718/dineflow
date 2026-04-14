import { PaymentMethod } from "@/backend";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/DFButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/DFCard";
import { Input } from "@/components/ui/DFInput";
import { Spinner } from "@/components/ui/DFSpinner";
import { useCustomerProfile, usePlaceOrder } from "@/hooks/use-customer";
import { useCartStore } from "@/store/cart";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: PaymentMethod.Cash,
    label: "Cash on Delivery",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    value: PaymentMethod.Card,
    label: "Card",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    value: PaymentMethod.UPI,
    label: "UPI",
    icon: <span className="text-xs font-bold">UPI</span>,
  },
];

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const restaurantId = useCartStore((s) => s.restaurantId);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.total());

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash,
  );
  const [notes, setNotes] = useState("");

  const placeOrder = usePlaceOrder();
  const { data: profile } = useCustomerProfile();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setAddressError("Delivery address is required");
      return;
    }
    setAddressError("");

    if (!restaurantId || items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const order = await placeOrder.mutateAsync({
        restaurantId,
        deliveryAddress: address.trim(),
        paymentMethod,
        customerName: profile?.name ?? "Customer",
        phone: "",
        items: items.map((i) => ({
          menuItemId: BigInt(i.menuItem.id),
          quantity: BigInt(i.quantity),
        })),
      });
      clearCart();
      toast.success("Order placed successfully!");
      navigate({
        to: "/customer/orders/$orderId",
        params: { orderId: order.id.toString() },
      });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <Layout showCart>
        <div
          className="flex flex-col items-center justify-center h-64 gap-4 py-24"
          data-ocid="cart.empty_state"
        >
          <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
          <p className="font-display text-lg font-semibold text-foreground">
            Your cart is empty
          </p>
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            Browse a restaurant's menu and add items to get started.
          </p>
          <Link to="/customer/explore">
            <Button variant="default" data-ocid="cart.explore_button">
              Explore Restaurants
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCart>
      <div
        className="container mx-auto px-4 py-8 max-w-2xl"
        data-ocid="cart.section"
      >
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Your Cart
        </h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {items.map((cartItem, idx) => (
                <div
                  key={cartItem.menuItem.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-medium text-foreground text-sm truncate">
                      {cartItem.menuItem.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ₹{cartItem.menuItem.price.toFixed(2)} each
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.quantity - 1,
                        )
                      }
                      aria-label="Decrease"
                      data-ocid={`cart.decrease_button.${idx + 1}`}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center font-display font-semibold text-sm">
                      {cartItem.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.quantity + 1,
                        )
                      }
                      aria-label="Increase"
                      data-ocid={`cart.increase_button.${idx + 1}`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Line total */}
                  <p className="font-display font-semibold text-foreground text-sm w-14 text-right shrink-0">
                    ₹{(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                  </p>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
                    onClick={() => removeItem(cartItem.menuItem.id)}
                    aria-label="Remove item"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </CardContent>

            {/* Subtotal */}
            <div className="flex justify-between items-center px-5 py-4 border-t border-border bg-muted/20 rounded-b-xl">
              <span className="font-display font-semibold text-foreground">
                Total
              </span>
              <span className="font-display font-bold text-primary text-lg">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </Card>

          {/* Delivery address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Input
                label="Delivery address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (e.target.value.trim()) setAddressError("");
                }}
                placeholder="123 Main St, Apt 4B, City"
                error={addressError}
                data-ocid="cart.address_input"
              />
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="cart-notes"
                  className="text-sm font-display font-medium text-foreground"
                >
                  Order notes (optional)
                </label>
                <textarea
                  id="cart-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests?"
                  rows={2}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                  data-ocid="cart.notes_textarea"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${
                    paymentMethod === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                  data-ocid={`cart.payment_${opt.value.toLowerCase()}_radio`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === opt.value
                        ? "border-primary"
                        : "border-muted-foreground/40"
                    }`}
                  >
                    {paymentMethod === opt.value && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-muted-foreground">{opt.icon}</span>
                  <span className="font-display font-medium text-foreground text-sm">
                    {opt.label}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Place order */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="default"
              size="xl"
              disabled={placeOrder.isPending}
              className="w-full"
              data-ocid="cart.place_order_button"
            >
              {placeOrder.isPending ? (
                <>
                  <Spinner size="sm" /> Placing Order…
                </>
              ) : (
                `Place Order · ₹${total.toFixed(2)}`
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Payment will be collected{" "}
              {paymentMethod === "Cash" ? "on delivery" : "upon confirmation"}.
            </p>
          </div>
        </form>
      </div>
    </Layout>
  );
}
