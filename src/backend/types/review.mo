import CommonTypes "common";

module {
  public type ReviewId = CommonTypes.ReviewId;
  public type RestaurantId = CommonTypes.RestaurantId;
  public type OrderId = CommonTypes.OrderId;

  public type Review = {
    id : ReviewId;
    restaurantId : RestaurantId;
    orderId : OrderId;
    customer : Principal;
    rating : Nat; // 1–5
    comment : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateReviewArgs = {
    restaurantId : RestaurantId;
    orderId : OrderId;
    rating : Nat;
    comment : Text;
  };
};
