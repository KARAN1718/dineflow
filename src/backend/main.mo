import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import RestaurantLib "lib/restaurant";
import MenuLib "lib/menu";
import OrderLib "lib/order";
import CustomerLib "lib/customer";
import ReviewLib "lib/review";
import RestaurantApi "mixins/restaurant-api";
import MenuApi "mixins/menu-api";
import OrderApi "mixins/order-api";
import CustomerApi "mixins/customer-api";
import ReviewApi "mixins/review-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let restaurantState = RestaurantLib.initState();
  let menuState = MenuLib.initState();
  let orderState = OrderLib.initState();
  let customerState = CustomerLib.initState();
  let reviewState = ReviewLib.initState();

  include RestaurantApi(accessControlState, restaurantState);
  include MenuApi(accessControlState, restaurantState, menuState);
  include OrderApi(accessControlState, restaurantState, menuState, orderState);
  include CustomerApi(accessControlState, customerState);
  include ReviewApi(accessControlState, orderState, reviewState);
};
