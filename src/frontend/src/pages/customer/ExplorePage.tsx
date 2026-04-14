import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/DFButton";
import { Input } from "@/components/ui/DFInput";
import { Modal } from "@/components/ui/DFModal";
import { Spinner } from "@/components/ui/DFSpinner";
import {
  useCustomerProfile,
  useRegisterCustomer,
  useRestaurant,
} from "@/hooks/use-customer";
import { useNavigate } from "@tanstack/react-router";
import { Search, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [rid, setRid] = useState("");
  const [searchRid, setSearchRid] = useState<string>("");
  const [notFound, setNotFound] = useState(false);

  // Profile setup modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [pendingRid, setPendingRid] = useState<string>("");
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileNameError, setProfileNameError] = useState("");

  const { data: restaurant, isLoading } = useRestaurant(searchRid);
  const { data: profile, isLoading: profileLoading } = useCustomerProfile();
  const registerMutation = useRegisterCustomer();

  useEffect(() => {
    if (!searchRid || isLoading || profileLoading) return;
    if (restaurant) {
      setNotFound(false);
      if (!profile) {
        setPendingRid(searchRid);
        setShowProfileModal(true);
      } else {
        navigate({
          to: "/customer/restaurant/$restaurantId",
          params: { restaurantId: searchRid },
        });
      }
    } else if (restaurant === null) {
      setNotFound(true);
    }
  }, [restaurant, isLoading, searchRid, profile, profileLoading, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = rid.trim().toUpperCase();
    if (!trimmed) return;
    setNotFound(false);
    setSearchRid(trimmed);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      setProfileNameError("Name is required");
      return;
    }
    setProfileNameError("");
    try {
      await registerMutation.mutateAsync({
        name: profileName.trim(),
        phone: profilePhone.trim(),
      });
      setShowProfileModal(false);
      navigate({
        to: "/customer/restaurant/$restaurantId",
        params: { restaurantId: pendingRid },
      });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <Layout showCart>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-16">
        {/* Hero icon */}
        <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-card">
          <UtensilsCrossed className="h-10 w-10 text-primary" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center">
          Find Your Restaurant
        </h1>
        <p className="text-muted-foreground text-center mb-10 max-w-md text-sm sm:text-base">
          Enter the Restaurant ID (RID) shared by your restaurant or scan their
          QR code to browse the menu and place an order.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          data-ocid="explore.section"
        >
          <div className="flex-1">
            <input
              type="text"
              value={rid}
              onChange={(e) => {
                setRid(e.target.value);
                setNotFound(false);
              }}
              placeholder="Enter Restaurant ID e.g. REST001"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              data-ocid="explore.search_input"
            />
            {notFound && (
              <p
                className="mt-2 text-sm text-destructive"
                data-ocid="explore.error_state"
              >
                Restaurant not found. Please check the ID and try again.
              </p>
            )}
          </div>
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isLoading || !rid.trim()}
            className="shrink-0 gap-2 rounded-xl"
            data-ocid="explore.submit_button"
          >
            {isLoading ? <Spinner size="sm" /> : <Search className="h-4 w-4" />}
            Explore
          </Button>
        </form>

        {/* Step hint cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
          {[
            {
              emoji: "🔍",
              title: "Enter RID",
              desc: "Type the unique Restaurant ID",
            },
            {
              emoji: "📋",
              title: "Browse Menu",
              desc: "Explore dishes by category",
            },
            {
              emoji: "🛒",
              title: "Place Order",
              desc: "Add items and checkout easily",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-card border border-border rounded-xl p-4 text-center shadow-card"
            >
              <span className="text-2xl">{step.emoji}</span>
              <p className="font-display font-semibold text-foreground mt-2 text-sm">
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Profile setup modal */}
      <Modal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title="Set up your profile"
        description="Just a quick one-time setup before you order."
      >
        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
          <Input
            label="Your name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="e.g. Jane Smith"
            error={profileNameError}
            required
            data-ocid="profile.name_input"
          />
          <Input
            label="Phone number (optional)"
            value={profilePhone}
            onChange={(e) => setProfilePhone(e.target.value)}
            placeholder="e.g. +1 555 000 0000"
            type="tel"
            data-ocid="profile.phone_input"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowProfileModal(false)}
              data-ocid="profile.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={registerMutation.isPending}
              data-ocid="profile.submit_button"
            >
              {registerMutation.isPending ? "Saving…" : "Continue"}
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
