import { u as useQuery, a as useMutation, b as useActor, c as createActor } from "./backend-DKDm-Gkb.js";
import { d as useQueryClient } from "./index-Zu5YxTH1.js";
function useBackendActor() {
  return useActor(createActor);
}
function useRestaurant(rid) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["restaurant", rid],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurant(rid);
    },
    enabled: !!actor && !isFetching && !!rid
  });
}
function useMenuItems(restaurantId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["menuItems", restaurantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId
  });
}
function useOrder(orderId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["order", orderId == null ? void 0 : orderId.toString()],
    queryFn: async () => {
      if (!actor || orderId == null) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId != null,
    refetchInterval: 3e3
  });
}
function useCustomerOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["customerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrdersByCustomer();
    },
    enabled: !!actor && !isFetching
  });
}
function usePlaceOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerOrders"] });
    }
  });
}
function useCustomerProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["customerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCustomerProfile();
    },
    enabled: !!actor && !isFetching
  });
}
function useRegisterCustomer() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, phone }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerCustomer(name, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerProfile"] });
    }
  });
}
function useSubmitReview() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReview(args);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId.toString()]
      });
    }
  });
}
function formatOrderId(id) {
  return `#${id.toString().padStart(4, "0")}`;
}
function formatPrice(price) {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}
function formatDate(ts) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(Number(ts) / 1e6));
}
export {
  useCustomerProfile as a,
  useRegisterCustomer as b,
  useMenuItems as c,
  usePlaceOrder as d,
  useCustomerOrders as e,
  formatPrice as f,
  formatOrderId as g,
  formatDate as h,
  useOrder as i,
  useSubmitReview as j,
  useRestaurant as u
};
