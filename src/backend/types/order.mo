import CommonTypes "common";

module {
  public type OrderId = CommonTypes.OrderId;
  public type RestaurantId = CommonTypes.RestaurantId;
  public type MenuItemId = CommonTypes.MenuItemId;

  public type PaymentMethod = {
    #Cash;
    #Card;
    #UPI;
  };

  public type OrderStatus = {
    #Pending;
    #Preparing;
    #Ready;
    #Completed;
    #Cancelled;
  };

  public type OrderItem = {
    menuItemId : MenuItemId;
    quantity : Nat;
    name : Text;
    price : Nat;
  };

  public type Order = {
    id : OrderId;
    restaurantId : RestaurantId;
    customer : Principal;
    customerName : Text;
    phone : Text;
    deliveryAddress : Text;
    items : [OrderItem];
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateOrderArgs = {
    restaurantId : RestaurantId;
    customerName : Text;
    phone : Text;
    deliveryAddress : Text;
    items : [{ menuItemId : MenuItemId; quantity : Nat }];
    paymentMethod : PaymentMethod;
  };
};
