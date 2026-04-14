import Map "mo:core/Map";
import CustomerTypes "../types/customer";

module {
  public type State = {
    profiles : Map.Map<Principal, CustomerTypes.CustomerProfile>;
  };

  public func initState() : State {
    {
      profiles = Map.empty<Principal, CustomerTypes.CustomerProfile>();
    };
  };

  public func saveProfile(
    state : State,
    principal : Principal,
    name : Text,
    phone : Text,
  ) : CustomerTypes.CustomerProfile {
    let profile : CustomerTypes.CustomerProfile = {
      principal;
      name;
      phone;
    };
    state.profiles.add(principal, profile);
    profile;
  };

  public func getProfile(
    state : State,
    principal : Principal,
  ) : ?CustomerTypes.CustomerProfile {
    state.profiles.get(principal);
  };
};
