import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import RestaurantLib "../lib/restaurant";
import RestaurantTypes "../types/restaurant";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  restaurantState : RestaurantLib.State,
) {
  /// Register a new restaurant. Associates the caller's principal as owner.
  public shared ({ caller }) func registerRestaurant(
    name : Text,
    phone : Text,
    address : Text,
    email : Text,
  ) : async RestaurantTypes.Restaurant {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to register a restaurant");
    };
    RestaurantLib.registerRestaurant(restaurantState, caller, name, phone, address, email);
  };

  /// Get a restaurant by its RID (publicly accessible).
  public query func getRestaurant(
    rid : CommonTypes.RestaurantId
  ) : async ?RestaurantTypes.Restaurant {
    RestaurantLib.getRestaurantByRid(restaurantState, rid);
  };

  /// Get the restaurant owned by the caller.
  public query ({ caller }) func getMyRestaurant() : async ?RestaurantTypes.Restaurant {
    RestaurantLib.getRestaurantByOwner(restaurantState, caller);
  };

  /// List all restaurants (publicly accessible).
  public query func listRestaurants() : async [RestaurantTypes.Restaurant] {
    RestaurantLib.listRestaurants(restaurantState);
  };
};
