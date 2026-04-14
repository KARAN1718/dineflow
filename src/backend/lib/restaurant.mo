import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import RestaurantTypes "../types/restaurant";
import CommonTypes "../types/common";

module {
  public type State = {
    restaurants : Map.Map<CommonTypes.RestaurantId, RestaurantTypes.Restaurant>;
    ownerIndex : Map.Map<Principal, CommonTypes.RestaurantId>;
    var nextRidSeed : Nat;
  };

  public func initState() : State {
    {
      restaurants = Map.empty<CommonTypes.RestaurantId, RestaurantTypes.Restaurant>();
      ownerIndex = Map.empty<Principal, CommonTypes.RestaurantId>();
      var nextRidSeed = 1;
    };
  };

  // Generate a short alphanumeric RID from a seed
  func generateRid(seed : Nat) : Text {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let charsArr = chars.toArray();
    let base = charsArr.size();
    var n = seed;
    var result = "";
    var count = 0;
    while (count < 6) {
      let idx = n % base;
      result := Text.fromChar(charsArr[idx]) # result;
      n := n / base;
      count += 1;
    };
    result;
  };

  public func registerRestaurant(
    state : State,
    owner : Principal,
    name : Text,
    phone : Text,
    address : Text,
    email : Text,
  ) : RestaurantTypes.Restaurant {
    // If owner already has a restaurant, trap
    switch (state.ownerIndex.get(owner)) {
      case (?_) { Runtime.trap("Owner already has a registered restaurant") };
      case null {};
    };

    let seed = state.nextRidSeed;
    state.nextRidSeed += 1;
    let rid = generateRid(seed);

    let restaurant : RestaurantTypes.Restaurant = {
      rid;
      owner;
      name;
      phone;
      address;
      email;
      createdAt = Time.now();
    };

    state.restaurants.add(rid, restaurant);
    state.ownerIndex.add(owner, rid);
    restaurant;
  };

  public func getRestaurantByRid(
    state : State,
    rid : CommonTypes.RestaurantId,
  ) : ?RestaurantTypes.Restaurant {
    state.restaurants.get(rid);
  };

  public func getRestaurantByOwner(
    state : State,
    owner : Principal,
  ) : ?RestaurantTypes.Restaurant {
    switch (state.ownerIndex.get(owner)) {
      case (?rid) { state.restaurants.get(rid) };
      case null { null };
    };
  };

  public func isOwnerOf(
    state : State,
    owner : Principal,
    rid : CommonTypes.RestaurantId,
  ) : Bool {
    switch (state.ownerIndex.get(owner)) {
      case (?ownerRid) { ownerRid == rid };
      case null { false };
    };
  };

  public func listRestaurants(state : State) : [RestaurantTypes.Restaurant] {
    state.restaurants.values() |> _.toArray();
  };
};
