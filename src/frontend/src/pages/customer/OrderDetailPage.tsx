import { OrderStatus } from "@/backend";
import { Layout } from "@/components/Layout";
import { OrderStatusBadge } from "@/components/ui/DFBadge";
import { Button } from "@/components/ui/DFButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/DFCard";
import { Spinner } from "@/components/ui/DFSpinner";
import {
  formatDate,
  formatOrderId,
  formatPrice,
  useOrder,
  useSubmitReview,
} from "@/hooks/use-customer";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MapPin, RefreshCw, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const STATUS_STEPS: OrderStatus[] = [
  OrderStatus.Pending,
  OrderStatus.Preparing,
  OrderStatus.Ready,
  OrderStatus.Completed,
];

function StatusStepper({ current }: { current: string }) {
  const idx = STATUS_STEPS.indexOf(current as OrderStatus);
  return (
    <div className="flex items-center gap-1.5 mt-4" aria-label="Order progress">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1.5 flex-1">
          <div
            className={`flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-bold shrink-0 border-2 transition-smooth ${
              i < idx
                ? "bg-primary border-primary text-primary-foreground"
                : i === idx
                  ? "border-primary text-primary bg-primary/10"
                  : "border-muted-foreground/30 text-muted-foreground/50 bg-transparent"
            }`}
          >
            {i < idx ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 rounded transition-smooth ${
                i < idx ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ReviewForm({
  orderId,
  restaurantId,
}: {
  orderId: bigint;
  restaurantId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitReview = useSubmitReview();

  if (submitted) {
    return (
      <div
        className="flex items-center gap-2 py-3 text-sm text-secondary font-display"
        data-ocid="review.success_state"
      >
        <CheckCircle2 className="h-4 w-4" />
        Thanks for your review!
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    try {
      await submitReview.mutateAsync({
        orderId,
        restaurantId,
        rating: BigInt(rating),
        comment: comment.trim(),
      });
      setSubmitted(true);
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <Card className="mt-6" data-ocid="review.section">
      <CardHeader>
        <CardTitle className="text-base">Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Star rating */}
          <fieldset>
            <legend className="text-sm font-display font-medium text-foreground mb-2">
              Rating
            </legend>
            <div className="flex gap-1" data-ocid="review.star_rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  aria-label={`${star} star`}
                  className="transition-smooth"
                  data-ocid={`review.star_button.${star}`}
                >
                  <Star
                    className={`h-7 w-7 transition-smooth ${
                      star <= (hovered || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="review-comment"
              className="text-sm font-display font-medium text-foreground"
            >
              Comment (optional)
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your experience?"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
              data-ocid="review.comment_textarea"
            />
          </div>
          <Button
            type="submit"
            disabled={submitReview.isPending || rating === 0}
            data-ocid="review.submit_button"
          >
            {submitReview.isPending ? "Submitting…" : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function OrderDetailPage() {
  const { orderId } = useParams({ from: "/customer/orders/$orderId" });
  const orderIdBigInt = BigInt(orderId);

  const {
    data: order,
    isLoading,
    refetch,
    isFetching,
  } = useOrder(orderIdBigInt);

  if (isLoading) {
    return (
      <Layout showCart>
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout showCart>
        <div
          className="flex flex-col items-center justify-center h-64 gap-4"
          data-ocid="order_detail.error_state"
        >
          <p className="text-muted-foreground font-display">Order not found.</p>
          <Link to="/customer/orders">
            <Button variant="outline">Back to Orders</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const orderTotal = order.items.reduce(
    (s, i) => s + i.price * i.quantity,
    BigInt(0),
  );
  const isCancelled = order.status === OrderStatus.Cancelled;
  const isCompleted = order.status === OrderStatus.Completed;

  return (
    <Layout showCart>
      <div
        className="container mx-auto px-4 py-8 max-w-2xl"
        data-ocid="order_detail.section"
      >
        {/* Back */}
        <Link to="/customer/orders">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 mb-4 -ml-2"
            data-ocid="order_detail.back_button"
          >
            <ArrowLeft className="h-4 w-4" /> All Orders
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {formatOrderId(order.id)}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <OrderStatusBadge status={order.status.toLowerCase()} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label="Refresh status"
              data-ocid="order_detail.refresh_button"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {/* Progress stepper (only for non-cancelled) */}
        {!isCancelled && (
          <Card className="mb-6">
            <CardContent className="pt-5 pb-5">
              <p className="text-xs font-display text-muted-foreground uppercase tracking-wide mb-1">
                Order Progress
              </p>
              <StatusStepper current={order.status} />
              <div className="flex justify-between mt-2">
                {STATUS_STEPS.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] text-muted-foreground flex-1 text-center"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Auto-updating every 3 seconds
              </p>
            </CardContent>
          </Card>
        )}

        {/* Order items */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {order.items.map((item, idx) => (
              <div
                key={`${item.menuItemId.toString()}-${idx}`}
                className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
                data-ocid={`order_detail.item.${idx + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-display font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price)} × {item.quantity.toString()}
                  </p>
                </div>
                <span className="font-display font-semibold text-foreground text-sm shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </CardContent>
          <div className="flex justify-between items-center px-5 py-4 border-t border-border bg-muted/20 rounded-b-xl">
            <span className="font-display font-semibold text-foreground">
              Total
            </span>
            <span className="font-display font-bold text-primary text-lg">
              {formatPrice(orderTotal)}
            </span>
          </div>
        </Card>

        {/* Delivery & payment info */}
        <Card className="mb-4">
          <CardContent className="pt-5 pb-5 flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-display">
                  Delivery Address
                </p>
                <p className="text-sm text-foreground">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-display">
                Payment:
              </span>
              <span className="text-sm text-foreground font-display font-medium">
                {order.paymentMethod}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Review section if completed */}
        {isCompleted && (
          <ReviewForm orderId={order.id} restaurantId={order.restaurantId} />
        )}
      </div>
    </Layout>
  );
}
