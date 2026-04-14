import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import CustomerLib "../lib/customer";
import CustomerTypes "../types/customer";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customerState : CustomerLib.State,
) {
  /// Save or update the caller's customer profile.
  public shared ({ caller }) func registerCustomer(
    name : Text,
    phone : Text,
  ) : async CustomerTypes.CustomerProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to register a profile");
    };
    CustomerLib.saveProfile(customerState, caller, name, phone);
  };

  /// Get the caller's customer profile.
  public query ({ caller }) func getCustomerProfile() : async ?CustomerTypes.CustomerProfile {
    CustomerLib.getProfile(customerState, caller);
  };
};
