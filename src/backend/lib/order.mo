import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import OrderTypes "../types/order";
import MenuTypes "../types/menu";
import CommonTypes "../types/common";

module {
  public type State = {
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>;
    var nextId : Nat;
  };

  public func initState() : State {
    {
      orders = Map.empty<CommonTypes.OrderId, OrderTypes.Order>();
      var nextId = 1;
    };
  };

  public func createOrder(
    state : State,
    menuState : { menuItems : Map.Map<CommonTypes.MenuItemId, MenuTypes.MenuItem>; var nextId : Nat },
    customer : Principal,
    args : OrderTypes.CreateOrderArgs,
  ) : OrderTypes.Order {
    if (args.items.size() == 0) {
      Runtime.trap("Order must have at least one item");
    };

    // Resolve menu items and build order items
    let orderItems = args.items.map(
      func(line) {
        let menuItem = switch (menuState.menuItems.get(line.menuItemId)) {
          case (?item) { item };
          case null { Runtime.trap("Menu item not found: " # line.menuItemId.toText()) };
        };
        if (not menuItem.available) {
          Runtime.trap("Menu item not available: " # menuItem.name);
        };
        {
          menuItemId = line.menuItemId;
          quantity = line.quantity;
          name = menuItem.name;
          price = menuItem.price;
        };
      }
    );

    let id = state.nextId;
    state.nextId += 1;

    let order : OrderTypes.Order = {
      id;
      restaurantId = args.restaurantId;
      customer;
      customerName = args.customerName;
      phone = args.phone;
      deliveryAddress = args.deliveryAddress;
      items = orderItems;
      paymentMethod = args.paymentMethod;
      status = #Pending;
      createdAt = Time.now();
    };

    state.orders.add(id, order);
    order;
  };

  public func getOrder(
    state : State,
    id : CommonTypes.OrderId,
  ) : ?OrderTypes.Order {
    state.orders.get(id);
  };

  public func updateOrderStatus(
    state : State,
    id : CommonTypes.OrderId,
    status : OrderTypes.OrderStatus,
  ) : ?OrderTypes.Order {
    switch (state.orders.get(id)) {
      case null { null };
      case (?existing) {
        let updated : OrderTypes.Order = { existing with status };
        state.orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func listOrdersByRestaurant(
    state : State,
    restaurantId : CommonTypes.RestaurantId,
  ) : [OrderTypes.Order] {
    state.orders.values()
      |> _.filter(func(o : OrderTypes.Order) : Bool { o.restaurantId == restaurantId })
      |> _.toArray();
  };

  public func listOrdersByCustomer(
    state : State,
    customer : Principal,
  ) : [OrderTypes.Order] {
    state.orders.values()
      |> _.filter(func(o : OrderTypes.Order) : Bool { o.customer == customer })
      |> _.toArray();
  };
};
