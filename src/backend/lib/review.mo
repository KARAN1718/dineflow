import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import ReviewTypes "../types/review";
import OrderTypes "../types/order";
import CommonTypes "../types/common";

module {
  public type State = {
    reviews : Map.Map<CommonTypes.ReviewId, ReviewTypes.Review>;
    var nextId : Nat;
  };

  public func initState() : State {
    {
      reviews = Map.empty<CommonTypes.ReviewId, ReviewTypes.Review>();
      var nextId = 1;
    };
  };

  public func createReview(
    state : State,
    customer : Principal,
    args : ReviewTypes.CreateReviewArgs,
  ) : ReviewTypes.Review {
    if (args.rating < 1 or args.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let id = state.nextId;
    state.nextId += 1;

    let review : ReviewTypes.Review = {
      id;
      restaurantId = args.restaurantId;
      orderId = args.orderId;
      customer;
      rating = args.rating;
      comment = args.comment;
      createdAt = Time.now();
    };

    state.reviews.add(id, review);
    review;
  };

  public func listReviewsByRestaurant(
    state : State,
    restaurantId : CommonTypes.RestaurantId,
  ) : [ReviewTypes.Review] {
    state.reviews.values()
      |> _.filter(func(r : ReviewTypes.Review) : Bool { r.restaurantId == restaurantId })
      |> _.toArray();
  };

  public func hasReviewedOrder(
    state : State,
    customer : Principal,
    orderId : CommonTypes.OrderId,
  ) : Bool {
    switch (state.reviews.values().find(func(r : ReviewTypes.Review) : Bool {
      r.customer == customer and r.orderId == orderId
    })) {
      case (?_) { true };
      case null { false };
    };
  };
};
