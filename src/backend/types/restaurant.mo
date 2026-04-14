import CommonTypes "common";

module {
  public type RestaurantId = CommonTypes.RestaurantId;

  public type Restaurant = {
    rid : RestaurantId;
    owner : Principal;
    name : Text;
    phone : Text;
    address : Text;
    email : Text;
    createdAt : CommonTypes.Timestamp;
  };
};
