import { FullPageSpinner } from "@/components/ui/DFSpinner";
import NotFoundPage from "@/pages/NotFoundPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("@/pages/LandingPage"));

// ── Root ────────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

// ── Landing ──────────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<FullPageSpinner />}>
      <LandingPage />
    </Suspense>
  ),
});

// ── Restaurant (owner) routes ─────────────────────────────────────────────
const restaurantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurant",
  component: () => <Outlet />,
});

const restaurantDashboardRoute = createRoute({
  getParentRoute: () => restaurantRoute,
  path: "/dashboard",
  component: lazy(() => import("@/pages/restaurant/DashboardPage")),
});

const restaurantMenuRoute = createRoute({
  getParentRoute: () => restaurantRoute,
  path: "/menu",
  component: lazy(() => import("@/pages/restaurant/MenuPage")),
});

const restaurantOrdersRoute = createRoute({
  getParentRoute: () => restaurantRoute,
  path: "/orders",
  component: lazy(() => import("@/pages/restaurant/OrdersPage")),
});

const restaurantSetupRoute = createRoute({
  getParentRoute: () => restaurantRoute,
  path: "/setup",
  component: lazy(() => import("@/pages/restaurant/SetupPage")),
});

// ── Customer routes ──────────────────────────────────────────────────────
const customerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customer",
  component: () => <Outlet />,
});

const customerExploreRoute = createRoute({
  getParentRoute: () => customerRoute,
  path: "/explore",
  component: lazy(() => import("@/pages/customer/ExplorePage")),
});

const customerRestaurantRoute = createRoute({
  getParentRoute: () => customerRoute,
  path: "/restaurant/$restaurantId",
  component: lazy(() => import("@/pages/customer/RestaurantMenuPage")),
});

const customerCartRoute = createRoute({
  getParentRoute: () => customerRoute,
  path: "/cart",
  component: lazy(() => import("@/pages/customer/CartPage")),
});

const customerOrdersRoute = createRoute({
  getParentRoute: () => customerRoute,
  path: "/orders",
  component: lazy(() => import("@/pages/customer/OrdersPage")),
});

const customerOrderDetailRoute = createRoute({
  getParentRoute: () => customerRoute,
  path: "/orders/$orderId",
  component: lazy(() => import("@/pages/customer/OrderDetailPage")),
});

// ── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  restaurantRoute.addChildren([
    restaurantDashboardRoute,
    restaurantMenuRoute,
    restaurantOrdersRoute,
    restaurantSetupRoute,
  ]),
  customerRoute.addChildren([
    customerExploreRoute,
    customerRestaurantRoute,
    customerCartRoute,
    customerOrdersRoute,
    customerOrderDetailRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
