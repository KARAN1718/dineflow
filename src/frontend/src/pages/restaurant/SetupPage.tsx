import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/DFButton";
import { Card, CardContent, CardHeader } from "@/components/ui/DFCard";
import { Input } from "@/components/ui/DFInput";
import { FullPageSpinner } from "@/components/ui/DFSpinner";
import { useAuth } from "@/hooks/use-auth";
import { useMyRestaurant, useRegisterRestaurant } from "@/hooks/use-restaurant";
import { useNavigate } from "@tanstack/react-router";
import { ChefHat, MapPin, Phone, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

export default function SetupPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: restaurant, isLoading } = useMyRestaurant();
  const register = useRegisterRestaurant();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Auto-redirect if restaurant already exists
  useEffect(() => {
    if (restaurant) {
      navigate({ to: "/restaurant/dashboard" });
    }
  }, [restaurant, navigate]);

  if (isInitializing || isLoading) return <FullPageSpinner />;

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ChefHat className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Restaurant Owner Portal
            </h1>
            <p className="text-muted-foreground max-w-sm">
              Sign in with Internet Identity to register and manage your
              restaurant.
            </p>
          </div>
          <Button onClick={login} size="lg" data-ocid="setup.login_button">
            Sign in to Get Started
          </Button>
        </div>
      </Layout>
    );
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Restaurant name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    register.mutate(form, {
      onSuccess: () => navigate({ to: "/restaurant/dashboard" }),
    });
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] bg-muted/30 py-12 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Utensils className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Register Your Restaurant
            </h1>
            <p className="text-muted-foreground mt-2">
              Set up your restaurant profile to start receiving orders.
            </p>
          </div>

          <Card elevated>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Restaurant Details
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                  label="Restaurant Name"
                  placeholder="e.g. La Terraza"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  error={errors.name}
                  data-ocid="setup.name_input"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="owner@restaurant.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  error={errors.email}
                  data-ocid="setup.email_input"
                />
                <Input
                  label="Phone Number"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  error={errors.phone}
                  data-ocid="setup.phone_input"
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="address"
                    className="text-sm font-display font-medium text-foreground flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                    Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Full restaurant address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                    data-ocid="setup.address_input"
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive">{errors.address}</p>
                  )}
                </div>

                {register.error && (
                  <p
                    className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2"
                    data-ocid="setup.error_state"
                  >
                    {register.error.message}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={register.isPending}
                  className="w-full mt-2"
                  data-ocid="setup.submit_button"
                >
                  {register.isPending
                    ? "Creating Restaurant…"
                    : "Create Restaurant & Get Started"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
