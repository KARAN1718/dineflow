import type { Order } from "@/backend";
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
import { FullPageSpinner, Spinner } from "@/components/ui/DFSpinner";
import { useAuth } from "@/hooks/use-auth";
import { useMyRestaurant, useRestaurantOrders } from "@/hooks/use-restaurant";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChefHat,
  ClipboardList,
  Clock,
  Copy,
  ExternalLink,
  Package,
  QrCode,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Simple inline QR code display using a data URL approach
// We generate QR via a public API since no jsQR needed for display
function QRDisplay({ value }: { value: string }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=160x160&margin=8&color=8B4513&bgcolor=FFF8F0`;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl border border-border bg-card p-2 shadow-card">
        <img
          src={qrUrl}
          alt="Restaurant QR Code"
          className="h-40 w-40 rounded-lg"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[180px]">
        Customers scan this to access your menu
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground font-display">
              {label}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentOrderRow({ order }: { order: Order }) {
  const total = order.items.reduce(
    (s, i) => s + Number(i.price) * Number(i.quantity),
    0,
  );
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-display font-medium text-foreground text-sm truncate">
          #{order.id.toString()} — {order.customerName}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <span className="text-sm font-display font-semibold text-foreground">
          ₹{(total / 100).toFixed(2)}
        </span>
        <OrderStatusBadge status={order.status.toLowerCase()} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading: restLoading } = useMyRestaurant();
  const { data: orders = [], isLoading: ordersLoading } = useRestaurantOrders(
    restaurant?.rid,
  );
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isInitializing && isAuthenticated && !restLoading && !restaurant) {
      navigate({ to: "/restaurant/setup" });
    }
  }, [isInitializing, isAuthenticated, restLoading, restaurant, navigate]);

  if (isInitializing || restLoading) return <FullPageSpinner />;

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center">
          <ChefHat className="h-12 w-12 text-primary" />
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Owner Dashboard
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your restaurant.
            </p>
          </div>
          <Button onClick={login} size="lg" data-ocid="dashboard.login_button">
            Sign in
          </Button>
        </div>
      </Layout>
    );
  }

  if (!restaurant) return <FullPageSpinner />;

  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.Pending,
  ).length;
  const preparingCount = orders.filter(
    (o) => o.status === OrderStatus.Preparing,
  ).length;
  const readyCount = orders.filter(
    (o) => o.status === OrderStatus.Ready,
  ).length;
  const completedCount = orders.filter(
    (o) => o.status === OrderStatus.Completed,
  ).length;
  const recentOrders = [...orders]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);

  function copyRid() {
    navigator.clipboard.writeText(restaurant!.rid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout>
      {/* Hero bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <UtensilsCrossed className="h-5 w-5 opacity-80" />
                <span className="text-sm font-display opacity-80">
                  Restaurant Owner
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold">
                {restaurant.name}
              </h1>
              <p className="text-sm opacity-75 mt-1">{restaurant.address}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/restaurant/menu">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  data-ocid="dashboard.menu_link"
                >
                  Manage Menu
                </Button>
              </Link>
              <Link to="/restaurant/orders">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  data-ocid="dashboard.orders_link"
                >
                  All Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: stats + recent orders */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Stats */}
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                Order Overview
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  icon={Clock}
                  label="Pending"
                  value={pendingCount}
                  color="bg-accent/15 text-accent"
                />
                <StatCard
                  icon={Package}
                  label="Preparing"
                  value={preparingCount}
                  color="bg-primary/15 text-primary"
                />
                <StatCard
                  icon={CheckCircle2}
                  label="Ready"
                  value={readyCount}
                  color="bg-secondary/15 text-secondary"
                />
                <StatCard
                  icon={ClipboardList}
                  label="Completed"
                  value={completedCount}
                  color="bg-muted text-muted-foreground"
                />
              </div>
            </div>

            {/* Recent orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recent Orders</CardTitle>
                <Link to="/restaurant/orders">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary gap-1"
                    data-ocid="dashboard.view_all_orders_link"
                  >
                    View all <ExternalLink className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div
                    className="flex justify-center py-8"
                    data-ocid="dashboard.loading_state"
                  >
                    <Spinner />
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div
                    className="text-center py-10"
                    data-ocid="dashboard.empty_state"
                  >
                    <ClipboardList className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground font-display text-sm">
                      No orders yet.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Share your QR code to start receiving orders.
                    </p>
                  </div>
                ) : (
                  <div>
                    {recentOrders.map((order) => (
                      <RecentOrderRow key={order.id.toString()} order={order} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column: RID + QR */}
          <div className="flex flex-col gap-4">
            <Card elevated>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" /> Restaurant ID
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <QRDisplay value={restaurant.rid} />
                <div className="w-full bg-muted rounded-lg px-3 py-2 flex items-center justify-between gap-2">
                  <code
                    className="text-xs font-mono text-foreground truncate"
                    data-ocid="dashboard.rid_display"
                  >
                    {restaurant.rid}
                  </code>
                  <button
                    type="button"
                    onClick={copyRid}
                    className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy RID"
                    data-ocid="dashboard.copy_rid_button"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                {copied && (
                  <p
                    className="text-xs text-secondary font-display"
                    data-ocid="dashboard.success_state"
                  >
                    Copied to clipboard!
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Customers enter this ID or scan the QR code to browse your
                  menu.
                </p>
              </CardContent>
            </Card>

            {/* Quick nav */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/restaurant/menu"
                    data-ocid="dashboard.quick_menu_link"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-display font-medium text-foreground">
                          Menu Management
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Add, edit or remove items
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/restaurant/orders"
                    data-ocid="dashboard.quick_orders_link"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-display font-medium text-foreground">
                          Order Management
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Track and update order status
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
