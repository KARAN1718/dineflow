import { createActor } from "@/backend";
import type {
  CreateOrderArgs,
  CreateReviewArgs,
  CustomerProfile,
  MenuItem,
  Order,
  OrderId,
  Restaurant,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useRestaurant(rid: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Restaurant | null>({
    queryKey: ["restaurant", rid],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurant(rid);
    },
    enabled: !!actor && !isFetching && !!rid,
  });
}

export function useMenuItems(restaurantId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", restaurantId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId,
  });
}

export function useOrder(orderId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Order | null>({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId == null) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId != null,
    refetchInterval: 3000,
  });
}

export function useCustomerOrders() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Order[]>({
    queryKey: ["customerOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrdersByCustomer();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<Order, Error, CreateOrderArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerOrders"] });
    },
  });
}

export function useCustomerProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["customerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCustomerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterCustomer() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<CustomerProfile, Error, { name: string; phone: string }>({
    mutationFn: async ({ name, phone }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerCustomer(name, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerProfile"] });
    },
  });
}

export function useSubmitReview() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateReviewArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReview(args);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId.toString()],
      });
    },
  });
}

export function formatOrderId(id: OrderId): string {
  return `#${id.toString().padStart(4, "0")}`;
}

export function formatPrice(price: bigint): string {
  return `₹${(Number(price) / 100).toFixed(2)}`;
}

export function formatDate(ts: bigint): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(Number(ts) / 1_000_000));
}
