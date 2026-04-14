import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/order";
import ReviewLib "../lib/review";
import ReviewTypes "../types/review";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orderState : OrderLib.State,
  reviewState : ReviewLib.State,
) {
  /// Submit a review for a completed order. Caller must be the order's customer.
  public shared ({ caller }) func submitReview(
    args : ReviewTypes.CreateReviewArgs
  ) : async ReviewTypes.Review {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be authenticated to submit a review");
    };
    // Verify the order exists, belongs to caller, and is completed
    switch (OrderLib.getOrder(orderState, args.orderId)) {
      case null { Runtime.trap("Order not found") };
      case (?order) {
        if (order.customer != caller) {
          Runtime.trap("Unauthorized: not your order");
        };
        switch (order.status) {
          case (#Completed) {};
          case (_) { Runtime.trap("Can only review completed orders") };
        };
        if (ReviewLib.hasReviewedOrder(reviewState, caller, args.orderId)) {
          Runtime.trap("Already reviewed this order");
        };
      };
    };
    ReviewLib.createReview(reviewState, caller, args);
  };

  /// List all reviews for a restaurant (publicly accessible).
  public query func listReviewsByRestaurant(
    restaurantId : CommonTypes.RestaurantId
  ) : async [ReviewTypes.Review] {
    ReviewLib.listReviewsByRestaurant(reviewState, restaurantId);
  };
};
