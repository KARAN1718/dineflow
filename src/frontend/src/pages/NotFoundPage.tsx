import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/DFButton";
import { useNavigate } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
        data-ocid="notfound.page"
      >
        <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
          <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-5xl font-bold text-foreground mb-3">
          404
        </h1>
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Page not found
        </h2>
        <p className="text-muted-foreground max-w-sm mb-8">
          Looks like this page wandered off the menu. Let's get you back on
          track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={() => navigate({ to: "/" })}
            data-ocid="notfound.home_button"
          >
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/customer/explore" })}
            data-ocid="notfound.explore_button"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    </Layout>
  );
}
