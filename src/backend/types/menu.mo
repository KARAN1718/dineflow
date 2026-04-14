import CommonTypes "common";

module {
  public type MenuItemId = CommonTypes.MenuItemId;
  public type RestaurantId = CommonTypes.RestaurantId;

  public type MenuItem = {
    id : MenuItemId;
    restaurantId : RestaurantId;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : ?Text;
    available : Bool;
  };

  public type CreateMenuItemArgs = {
    restaurantId : RestaurantId;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : ?Text;
    available : Bool;
  };

  public type UpdateMenuItemArgs = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : ?Text;
    available : Bool;
  };
};
