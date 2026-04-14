import type { Order } from "@/backend.d";
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
  useCustomerOrders,
} from "@/hooks/use-customer";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ClipboardList, ShoppingBag } from "lucide-react";

export default function CustomerOrdersPage() {
  const { data: orders = [], isLoading } = useCustomerOrders();

  // Sort newest first
  const sorted = [...orders].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );

  if (isLoading) {
    return (
      <Layout showCart>
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCart>
      <div
        className="container mx-auto px-4 py-8 max-w-2xl"
        data-ocid="orders.section"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Orders
          </h1>
        </div>

        {sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            data-ocid="orders.empty_state"
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="font-display text-lg font-semibold text-foreground">
              No orders yet
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              When you place an order it will appear here so you can track its
              status.
            </p>
            <Link to="/customer/explore">
              <Button variant="default" data-ocid="orders.explore_button">
                Find a Restaurant
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3" data-ocid="orders.list">
            {sorted.map((order: Order, idx) => (
              <Link
                key={order.id.toString()}
                to="/customer/orders/$orderId"
                params={{ orderId: order.id.toString() }}
                data-ocid={`orders.item.${idx + 1}`}
              >
                <Card className="hover:shadow-elevated transition-smooth cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-base">
                          {formatOrderId(order.id)}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <OrderStatusBadge status={order.status.toLowerCase()} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {order.items
                        .map((i) => `${i.name} ×${i.quantity}`)
                        .join(", ")}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-bold text-primary">
                        {formatPrice(
                          order.items.reduce(
                            (s, i) => s + i.price * i.quantity,
                            BigInt(0),
                          ),
                        )}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
