import { u as useQuery, a as useMutation, b as useActor, c as createActor } from "./backend-DKDm-Gkb.js";
import { d as useQueryClient } from "./index-Zu5YxTH1.js";
function useBackendActor() {
  return useActor(createActor);
}
function useMyRestaurant() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["myRestaurant"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyRestaurant();
    },
    enabled: !!actor && !isFetching
  });
}
function useRegisterRestaurant() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, phone, address, email }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerRestaurant(name, phone, address, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRestaurant"] });
    }
  });
}
function useMenuItems(restaurantId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["menuItems", restaurantId],
    queryFn: async () => {
      if (!actor || !restaurantId) return [];
      return actor.listMenuItems(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId
  });
}
function useAddMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Not connected");
      return actor.addMenuItem(args);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId]
      });
    }
  });
}
function useUpdateMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...args }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateMenuItem(id, args);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId]
      });
    }
  });
}
function useDeleteMenuItem() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteMenuItem(id);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["menuItems", vars.restaurantId]
      });
    }
  });
}
function useRestaurantOrders(restaurantId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["restaurantOrders", restaurantId],
    queryFn: async () => {
      if (!actor || !restaurantId) return [];
      return actor.listOrdersByRestaurant(restaurantId);
    },
    enabled: !!actor && !isFetching && !!restaurantId,
    refetchInterval: 3e3
  });
}
function useUpdateOrderStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantOrders", vars.restaurantId]
      });
    }
  });
}
export {
  useRestaurantOrders as a,
  useMenuItems as b,
  useAddMenuItem as c,
  useUpdateMenuItem as d,
  useDeleteMenuItem as e,
  useUpdateOrderStatus as f,
  useRegisterRestaurant as g,
  useMyRestaurant as u
};
