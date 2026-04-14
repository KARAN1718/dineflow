import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChefHat,
  LogIn,
  LogOut,
  ShoppingCart,
  User,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/DFButton";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showCart?: boolean;
}

export function Layout({ children, className, showCart = false }: LayoutProps) {
  const { isAuthenticated, isInitializing, isLoggingIn, login, logout } =
    useAuth();
  const itemCount = useCartStore((s) => s.itemCount());
  const routerState = useRouterState();
  const path = routerState.location.pathname;

  const isOwnerRoute = path.startsWith("/restaurant");
  const isCustomerRoute = path.startsWith("/customer");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            data-ocid="nav.link"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:scale-105">
              <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              DineFlow
            </span>
          </Link>

          {/* Role indicator */}
          {isOwnerRoute && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <ChefHat className="h-4 w-4 text-primary" />
              <span className="font-display">Restaurant Owner</span>
            </div>
          )}
          {isCustomerRoute && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4 text-secondary" />
              <span className="font-display">Customer</span>
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {showCart && (
              <Link to="/customer/cart" data-ocid="nav.cart_button">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5"
                data-ocid="nav.logout_button"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={login}
                disabled={isInitializing || isLoggingIn}
                className="gap-1.5"
                data-ocid="nav.login_button"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>
                  {isInitializing
                    ? "Loading…"
                    : isLoggingIn
                      ? "Signing in…"
                      : "Sign in"}
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={cn("flex-1", className)}>{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
              <UtensilsCrossed className="h-3 w-3 text-primary" />
            </div>
            <span className="font-display font-medium text-foreground">
              DineFlow
            </span>
          </div>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

export function Section({ children, className, muted }: SectionProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-16",
        muted ? "bg-muted/30" : "bg-background",
        className,
      )}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
