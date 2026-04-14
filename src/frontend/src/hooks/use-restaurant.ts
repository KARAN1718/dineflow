import { type OrderStatus, createActor } from "@/backend";
import type { MenuItem, Order, Restaurant } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

// ── Restaurant ───────────────────────────────────────────────────────────────

export function useMyRestaurant() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Restaurant | null>({
    queryKey: ["myRestaurant"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyRestaurant();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterRestaurant() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    Restaurant,
    Error,
    { name: string; phone: string; address: string; email: string }
  >({
    mutationFn: async ({ name, phone, address, email }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerRestaurant(name, phone, address, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRestaurant"] });
    },
  });
}

// ── Menu Items ───────────────────────────────────────────────────────────────

export function useMenuItems(restaurantId: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", restaurantId],
    queryFn: async () => {
      if (!actor || !restaurantId) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId,
  });
}

export function useAddMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    MenuItem,
    Error,
    {
      restaurantId: string;
      name: string;
      description: string;
      price: bigint;
      category: string;
      available: boolean;
      imageUrl?: string;
    }
  >({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.addMenuItem(args);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId],
      });
    },
  });
}

export function useUpdateMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    MenuItem | null,
    Error,
    {
      id: bigint;
      restaurantId: string;
      name: string;
      description: string;
      price: bigint;
      category: string;
      available: boolean;
      imageUrl?: string;
    }
  >({
    mutationFn: async ({ id, ...args }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateMenuItem(id, args);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId],
      });
    },
  });
}

export function useDeleteMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: bigint; restaurantId: string }>({
    mutationFn: async ({ id }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMenuItem(id);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId],
      });
    },
  });
}

// ── Orders ───────────────────────────────────────────────────────────────────

export function useRestaurantOrders(restaurantId: string | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Order[]>({
    queryKey: ["restaurantOrders", restaurantId],
    queryFn: async () => {
      if (!actor || !restaurantId) return [];
      return actor.listOrdersByRestaurant(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId,
    refetchInterval: 3000,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    Order | null,
    Error,
    { id: bigint; status: OrderStatus; restaurantId: string }
  >({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantOrders", vars.restaurantId],
      });
    },
  });
}
