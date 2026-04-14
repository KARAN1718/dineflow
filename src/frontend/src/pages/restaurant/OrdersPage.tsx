import { type Order, OrderStatus } from "@/backend";
import { Layout } from "@/components/Layout";
import { OrderStatusBadge } from "@/components/ui/DFBadge";
import { Button } from "@/components/ui/DFButton";
import { Card } from "@/components/ui/DFCard";
import { FullPageSpinner, Spinner } from "@/components/ui/DFSpinner";
import { useAuth } from "@/hooks/use-auth";
import {
  useMyRestaurant,
  useRestaurantOrders,
  useUpdateOrderStatus,
} from "@/hooks/use-restaurant";
import { useNavigate } from "@tanstack/react-router";
import { ClipboardList, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_FLOW: Record<string, { next: OrderStatus; label: string } | null> =
  {
    [OrderStatus.Pending]: {
      next: OrderStatus.Preparing,
      label: "Accept & Prepare",
    },
    [OrderStatus.Preparing]: { next: OrderStatus.Ready, label: "Mark Ready" },
    [OrderStatus.Ready]: {
      next: OrderStatus.Completed,
      label: "Mark Completed",
    },
    [OrderStatus.Completed]: null,
    [OrderStatus.Cancelled]: null,
  };

function formatTime(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({
  order,
  restaurantId,
}: { order: Order; restaurantId: string }) {
  const updateStatus = useUpdateOrderStatus();
  const transition = STATUS_FLOW[order.status];
  const total = order.items.reduce(
    (s, i) => s + Number(i.price) * Number(i.quantity),
    0,
  );

  function handleAdvance() {
    if (!transition) return;
    updateStatus.mutate({
      id: order.id,
      status: transition.next,
      restaurantId,
    });
  }

  const stripColor =
    order.status === OrderStatus.Pending
      ? "bg-accent"
      : order.status === OrderStatus.Preparing
        ? "bg-primary"
        : order.status === OrderStatus.Ready
          ? "bg-secondary"
          : "bg-border";

  return (
    <Card className="flex flex-col sm:flex-row overflow-hidden">
      <div className={`h-1 sm:h-auto sm:w-1 flex-shrink-0 ${stripColor}`} />
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-foreground text-sm">
                #{order.id.toString()}
              </span>
              <OrderStatusBadge status={order.status.toLowerCase()} />
            </div>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {order.customerName}
            </p>
            <p className="text-xs text-muted-foreground">{order.phone}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-foreground">
              ₹{(total / 100).toFixed(2)}
            </p>
            <span className="text-xs font-display text-muted-foreground">
              {order.paymentMethod}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="bg-muted/40 rounded-lg p-3 mb-3">
          <p className="text-xs font-display font-medium text-muted-foreground mb-1.5">
            Order Items
          </p>
          <div className="flex flex-col gap-1">
            {order.items.map((item) => (
              <div
                key={`${item.menuItemId.toString()}-${item.name}`}
                className="flex justify-between text-sm"
              >
                <span className="text-foreground">
                  {item.name}{" "}
                  <span className="text-muted-foreground">
                    ×{item.quantity.toString()}
                  </span>
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  ₹
                  {((Number(item.price) * Number(item.quantity)) / 100).toFixed(
                    2,
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {formatTime(order.createdAt)}
          </span>
          {transition ? (
            <Button
              size="sm"
              onClick={handleAdvance}
              disabled={updateStatus.isPending}
              className="gap-1.5"
              data-ocid="orders.advance_status_button"
            >
              {updateStatus.isPending ? (
                <Spinner size="sm" />
              ) : (
                transition.label
              )}
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              {order.status === OrderStatus.Completed
                ? "Order complete"
                : "Cancelled"}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

const STATUS_TABS: { label: string; value: OrderStatus | null }[] = [
  { label: "All", value: null },
  { label: "Pending", value: OrderStatus.Pending },
  { label: "Preparing", value: OrderStatus.Preparing },
  { label: "Ready", value: OrderStatus.Ready },
  { label: "Completed", value: OrderStatus.Completed },
];

export default function RestaurantOrdersPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
  } = useRestaurantOrders(restaurant?.rid);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<OrderStatus | null>(null);

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
          <Button onClick={login} data-ocid="orders.login_button">
            Sign in to view orders
          </Button>
        </div>
      </Layout>
    );
  }

  if (!restaurant) return <FullPageSpinner />;

  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
  const filtered = activeTab
    ? sorted.filter((o) => o.status === activeTab)
    : sorted;
  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.Pending,
  ).length;
  const preparingCount = orders.filter(
    (o) => o.status === OrderStatus.Preparing,
  ).length;

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Orders
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {restaurant.name} · Auto-refreshes every 3s
                {isFetching && (
                  <span className="ml-1 text-primary animate-pulse">●</span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-1.5"
              data-ocid="orders.refresh_button"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
          </div>

          {/* Alert counts */}
          {(pendingCount > 0 || preparingCount > 0) && (
            <div className="flex gap-3 flex-wrap">
              {pendingCount > 0 && (
                <div className="bg-accent/15 text-accent rounded-lg px-3 py-1.5 text-sm font-display font-medium">
                  {pendingCount} new order{pendingCount > 1 ? "s" : ""} waiting
                </div>
              )}
              {preparingCount > 0 && (
                <div className="bg-primary/15 text-primary rounded-lg px-3 py-1.5 text-sm font-display font-medium">
                  {preparingCount} being prepared
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div
          className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-6 flex-wrap"
          data-ocid="orders.filter.tab"
        >
          {STATUS_TABS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setActiveTab(t.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-display font-medium transition-smooth ${
                activeTab === t.value
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`orders.tab.${t.label.toLowerCase()}`}
            >
              {t.label}
              {t.value !== null &&
                orders.filter((o) => o.status === t.value).length > 0 && (
                  <span className="ml-1.5 bg-primary text-primary-foreground rounded-full text-[10px] px-1.5 py-0.5 inline-block">
                    {orders.filter((o) => o.status === t.value).length}
                  </span>
                )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="flex justify-center py-20"
            data-ocid="orders.loading_state"
          >
            <Spinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="orders.empty_state">
            <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-display font-medium text-foreground mb-1">
              No orders found
            </p>
            <p className="text-sm text-muted-foreground">
              {activeTab
                ? `No ${activeTab.toLowerCase()} orders right now.`
                : "Orders appear here when customers start ordering."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((order, idx) => (
              <div
                key={order.id.toString()}
                data-ocid={`orders.item.${idx + 1}`}
              >
                <OrderCard order={order} restaurantId={restaurant.rid} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
