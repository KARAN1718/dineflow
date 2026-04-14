import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/DFButton";
import { Card, CardContent } from "@/components/ui/DFCard";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  ChefHat,
  ClipboardList,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";

const ownerFeatures = [
  {
    icon: Utensils,
    title: "Menu Management",
    desc: "Add, edit and organize your dishes with ease",
  },
  {
    icon: ClipboardList,
    title: "Order Tracking",
    desc: "Real-time order updates and status management",
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    desc: "Revenue and order analytics at a glance",
  },
];

const customerFeatures = [
  {
    icon: Star,
    title: "Discover Restaurants",
    desc: "Browse and find great places near you",
  },
  {
    icon: Utensils,
    title: "Easy Ordering",
    desc: "Browse menus and place orders in seconds",
  },
  {
    icon: ClipboardList,
    title: "Live Order Status",
    desc: "Track your order from kitchen to table",
  },
];

export default function LandingPage() {
  const { isAuthenticated, login, isInitializing, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const handleOwnerClick = () => {
    if (!isAuthenticated) {
      login();
    } else {
      navigate({ to: "/restaurant/dashboard" });
    }
  };

  const handleCustomerClick = () => {
    navigate({ to: "/customer/explore" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm font-display font-medium text-primary">
                  Restaurant + Ordering Platform
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Manage your restaurant.
                <span className="text-primary block">Delight your guests.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                DineFlow connects restaurant owners with customers seamlessly —
                from menu to meal, all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="hero"
                  onClick={handleOwnerClick}
                  disabled={isInitializing || isLoggingIn}
                  data-ocid="landing.owner_cta"
                  className="gap-2"
                >
                  <ChefHat className="h-5 w-5" />
                  {isAuthenticated
                    ? "Go to Dashboard"
                    : "I'm a Restaurant Owner"}
                </Button>
                <Button
                  variant="heroAccent"
                  onClick={handleCustomerClick}
                  data-ocid="landing.customer_cta"
                  className="gap-2"
                >
                  <Users className="h-5 w-5" />
                  I'm a Customer
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:block"
            >
              <img
                src="/assets/generated/restaurant-hero.dim_1200x600.jpg"
                alt="Beautiful restaurant setting"
                className="rounded-2xl object-cover w-full h-72 shadow-elevated"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role selection cards */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Who are you?
            </h2>
            <p className="text-muted-foreground">
              Choose your role to get started with the right experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Owner Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card
                elevated
                className="overflow-hidden cursor-pointer hover:border-primary/40 transition-smooth group"
                data-ocid="landing.owner_card"
                onClick={handleOwnerClick}
              >
                <div className="h-3 bg-primary w-full" />
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Restaurant Owner
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your business
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {ownerFeatures.map(({ icon: Icon, title, desc }) => (
                      <li key={title} className="flex items-start gap-3">
                        <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-display font-semibold text-foreground">
                            {title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="default"
                    className="w-full gap-2 group-hover:shadow-card transition-smooth"
                    onClick={handleOwnerClick}
                    disabled={isInitializing || isLoggingIn}
                    data-ocid="landing.owner_enter_button"
                  >
                    {isAuthenticated
                      ? "Enter Dashboard"
                      : "Sign in to Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Customer Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card
                elevated
                className="overflow-hidden cursor-pointer hover:border-accent/40 transition-smooth group"
                data-ocid="landing.customer_card"
                onClick={handleCustomerClick}
              >
                <div className="h-3 bg-accent w-full" />
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Customer
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Order from restaurants
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {customerFeatures.map(({ icon: Icon, title, desc }) => (
                      <li key={title} className="flex items-start gap-3">
                        <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-display font-semibold text-foreground">
                            {title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="accent"
                    className="w-full gap-2 group-hover:shadow-card transition-smooth"
                    onClick={handleCustomerClick}
                    data-ocid="landing.customer_enter_button"
                  >
                    Explore Restaurants
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "500+", label: "Restaurants" },
              { value: "50K+", label: "Orders served" },
              { value: "4.9★", label: "Average rating" },
            ].map(({ value, label }) => (
              <div key={label} className="space-y-1">
                <p className="font-display text-2xl font-bold text-primary">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
