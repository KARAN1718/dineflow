import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import RestaurantLib "../lib/restaurant";
import MenuLib "../lib/menu";
import OrderLib "../lib/order";
import OrderTypes "../types/order";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  restaurantState : RestaurantLib.State,
  menuState : MenuLib.State,
  orderState : OrderLib.State,
) {
  /// Place a new order (caller is the customer).
  public shared ({ caller }) func placeOrder(
    args : OrderTypes.CreateOrderArgs
  ) : async OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to place an order");
    };
    // Verify the restaurant exists
    switch (RestaurantLib.getRestaurantByRid(restaurantState, args.restaurantId)) {
      case null { Runtime.trap("Restaurant not found") };
      case (?_) {};
    };
    OrderLib.createOrder(orderState, menuState, caller, args);
  };

  /// Get order by ID. Accessible by the customer who placed it or the restaurant owner.
  public query ({ caller }) func getOrder(
    id : CommonTypes.OrderId
  ) : async ?OrderTypes.Order {
    switch (OrderLib.getOrder(orderState, id)) {
      case null { null };
      case (?order) {
        let isCustomer = order.customer == caller;
        let isOwner = RestaurantLib.isOwnerOf(restaurantState, caller, order.restaurantId);
        if (isCustomer or isOwner) {
          ?order;
        } else {
          Runtime.trap("Unauthorized: not your order or restaurant");
        };
      };
    };
  };

  /// Update order status. Only the restaurant owner of the relevant restaurant may call this.
  public shared ({ caller }) func updateOrderStatus(
    id : CommonTypes.OrderId,
    status : OrderTypes.OrderStatus,
  ) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    switch (OrderLib.getOrder(orderState, id)) {
      case null { null };
      case (?order) {
        if (not RestaurantLib.isOwnerOf(restaurantState, caller, order.restaurantId)) {
          Runtime.trap("Unauthorized: only the restaurant owner can update order status");
        };
        OrderLib.updateOrderStatus(orderState, id, status);
      };
    };
  };

  /// List all orders for a restaurant (owner only).
  public query ({ caller }) func listOrdersByRestaurant(
    restaurantId : CommonTypes.RestaurantId
  ) : async [OrderTypes.Order] {
    if (not RestaurantLib.isOwnerOf(restaurantState, caller, restaurantId)) {
      Runtime.trap("Unauthorized: only the restaurant owner can view restaurant orders");
    };
    OrderLib.listOrdersByRestaurant(orderState, restaurantId);
  };

  /// List all orders placed by the caller (customer view).
  public query ({ caller }) func listOrdersByCustomer() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    OrderLib.listOrdersByCustomer(orderState, caller);
  };
};
