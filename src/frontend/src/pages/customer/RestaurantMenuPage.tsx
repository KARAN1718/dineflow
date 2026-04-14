import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/DFBadge";
import { Button } from "@/components/ui/DFButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/DFCard";
import { Spinner } from "@/components/ui/DFSpinner";
import { formatPrice, useMenuItems, useRestaurant } from "@/hooks/use-customer";
import { useCartStore } from "@/store/cart";
import { Link, useParams } from "@tanstack/react-router";
import { MapPin, Minus, Plus, ShoppingCart, Store } from "lucide-react";

export default function RestaurantMenuPage() {
  const { restaurantId } = useParams({
    from: "/customer/restaurant/$restaurantId",
  });
  const { data: restaurant, isLoading: loadingRestaurant } =
    useRestaurant(restaurantId);
  const { data: menuItems = [], isLoading: loadingMenu } =
    useMenuItems(restaurantId);

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItems = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());
  const total = useCartStore((s) => s.total());

  const getQty = (id: bigint) =>
    cartItems.find((i) => i.menuItem.id === id.toString())?.quantity ?? 0;

  // Group by category
  const categories = Array.from(
    new Set(menuItems.filter((m) => m.available).map((m) => m.category)),
  );

  const isLoading = loadingRestaurant || loadingMenu;

  if (isLoading) {
    return (
      <Layout showCart>
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!restaurant) {
    return (
      <Layout showCart>
        <div
          className="flex flex-col items-center justify-center h-64 gap-4"
          data-ocid="restaurant_menu.error_state"
        >
          <Store className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground font-display">
            Restaurant not found.
          </p>
          <Link to="/customer/explore">
            <Button variant="outline">Go back</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCart>
      {/* Restaurant hero */}
      <div
        className="bg-card border-b border-border"
        data-ocid="restaurant_menu.section"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                {restaurant.address && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {restaurant.address}
                  </span>
                )}
                <Badge variant="secondary">RID: {restaurant.rid}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8 pb-28">
        {categories.length === 0 && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="restaurant_menu.empty_state"
          >
            <p className="font-display text-lg">No menu items available yet.</p>
          </div>
        )}

        {categories.map((category, catIdx) => {
          const items = menuItems.filter(
            (m) => m.category === category && m.available,
          );
          return (
            <section key={category} className="mb-10">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                {category}
                <span className="text-sm font-normal text-muted-foreground">
                  ({items.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, itemIdx) => {
                  const qty = getQty(item.id);
                  const globalIdx = catIdx * 100 + itemIdx + 1;
                  return (
                    <Card
                      key={item.id.toString()}
                      className="overflow-hidden flex flex-col"
                      data-ocid={`menu.item.${globalIdx}`}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <CardHeader className="pb-1">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 py-0">
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="mt-2 font-display font-semibold text-primary text-base">
                          {formatPrice(item.price)}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-3">
                        {qty === 0 ? (
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full gap-1.5"
                            onClick={() =>
                              addItem({
                                id: item.id.toString(),
                                restaurantId: item.restaurantId,
                                name: item.name,
                                description: item.description,
                                price: Number(item.price) / 100,
                                category: item.category,
                                imageUrl: item.imageUrl,
                                available: item.available,
                              })
                            }
                            data-ocid={`menu.add_button.${globalIdx}`}
                          >
                            <Plus className="h-4 w-4" /> Add to Cart
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 w-full justify-between">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id.toString(), qty - 1)
                              }
                              aria-label="Decrease quantity"
                              data-ocid={`menu.decrease_button.${globalIdx}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="font-display font-semibold text-foreground min-w-[2rem] text-center">
                              {qty}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.id.toString(), qty + 1)
                              }
                              aria-label="Increase quantity"
                              data-ocid={`menu.increase_button.${globalIdx}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Sticky cart bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-card border-t border-border shadow-elevated">
          <div className="container mx-auto max-w-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-sm">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total: ₹{total.toFixed(2)}
                </p>
              </div>
            </div>
            <Link to="/customer/cart">
              <Button
                variant="default"
                size="lg"
                data-ocid="menu.view_cart_button"
              >
                View Cart →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
