import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import RestaurantLib "../lib/restaurant";
import MenuLib "../lib/menu";
import MenuTypes "../types/menu";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  restaurantState : RestaurantLib.State,
  menuState : MenuLib.State,
) {
  /// Create a menu item for caller's restaurant.
  public shared ({ caller }) func addMenuItem(
    args : MenuTypes.CreateMenuItemArgs
  ) : async MenuTypes.MenuItem {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    if (not RestaurantLib.isOwnerOf(restaurantState, caller, args.restaurantId)) {
      Runtime.trap("Unauthorized: caller is not the owner of this restaurant");
    };
    MenuLib.createMenuItem(menuState, args);
  };

  /// Update a menu item. Only the restaurant owner can update.
  public shared ({ caller }) func updateMenuItem(
    id : CommonTypes.MenuItemId,
    args : MenuTypes.UpdateMenuItemArgs,
  ) : async ?MenuTypes.MenuItem {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    // Verify caller owns the restaurant the item belongs to
    switch (MenuLib.getMenuItem(menuState, id)) {
      case null { null };
      case (?item) {
        if (not RestaurantLib.isOwnerOf(restaurantState, caller, item.restaurantId)) {
          Runtime.trap("Unauthorized: caller is not the owner of this restaurant");
        };
        MenuLib.updateMenuItem(menuState, id, args);
      };
    };
  };

  /// Delete a menu item. Only the restaurant owner can delete.
  public shared ({ caller }) func deleteMenuItem(
    id : CommonTypes.MenuItemId
  ) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated");
    };
    switch (MenuLib.getMenuItem(menuState, id)) {
      case null { false };
      case (?item) {
        if (not RestaurantLib.isOwnerOf(restaurantState, caller, item.restaurantId)) {
          Runtime.trap("Unauthorized: caller is not the owner of this restaurant");
        };
        MenuLib.deleteMenuItem(menuState, id);
      };
    };
  };

  /// List all menu items for a restaurant (publicly accessible).
  public query func listMenuItems(
    restaurantId : CommonTypes.RestaurantId
  ) : async [MenuTypes.MenuItem] {
    MenuLib.listMenuItemsByRestaurant(menuState, restaurantId);
  };
};
