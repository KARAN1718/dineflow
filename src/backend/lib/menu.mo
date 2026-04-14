import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import MenuTypes "../types/menu";
import CommonTypes "../types/common";

module {
  public type State = {
    menuItems : Map.Map<CommonTypes.MenuItemId, MenuTypes.MenuItem>;
    var nextId : Nat;
  };

  public func initState() : State {
    {
      menuItems = Map.empty<CommonTypes.MenuItemId, MenuTypes.MenuItem>();
      var nextId = 1;
    };
  };

  public func createMenuItem(
    state : State,
    args : MenuTypes.CreateMenuItemArgs,
  ) : MenuTypes.MenuItem {
    let id = state.nextId;
    state.nextId += 1;

    let item : MenuTypes.MenuItem = {
      id;
      restaurantId = args.restaurantId;
      name = args.name;
      description = args.description;
      price = args.price;
      category = args.category;
      imageUrl = args.imageUrl;
      available = args.available;
    };

    state.menuItems.add(id, item);
    item;
  };

  public func getMenuItem(
    state : State,
    id : CommonTypes.MenuItemId,
  ) : ?MenuTypes.MenuItem {
    state.menuItems.get(id);
  };

  public func updateMenuItem(
    state : State,
    id : CommonTypes.MenuItemId,
    args : MenuTypes.UpdateMenuItemArgs,
  ) : ?MenuTypes.MenuItem {
    switch (state.menuItems.get(id)) {
      case null { null };
      case (?existing) {
        let updated : MenuTypes.MenuItem = {
          existing with
          name = args.name;
          description = args.description;
          price = args.price;
          category = args.category;
          imageUrl = args.imageUrl;
          available = args.available;
        };
        state.menuItems.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteMenuItem(
    state : State,
    id : CommonTypes.MenuItemId,
  ) : Bool {
    switch (state.menuItems.get(id)) {
      case null { false };
      case (?_) {
        state.menuItems.remove(id);
        true;
      };
    };
  };

  public func listMenuItemsByRestaurant(
    state : State,
    restaurantId : CommonTypes.RestaurantId,
  ) : [MenuTypes.MenuItem] {
    state.menuItems.values()
      |> _.filter(func(item : MenuTypes.MenuItem) : Bool { item.restaurantId == restaurantId })
      |> _.toArray();
  };
};
