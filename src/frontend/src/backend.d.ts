import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CreateOrderArgs {
    customerName: string;
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
    restaurantId: RestaurantId;
    phone: string;
    items: Array<{
        quantity: bigint;
        menuItemId: MenuItemId;
    }>;
}
export interface CreateMenuItemArgs {
    name: string;
    description: string;
    available: boolean;
    restaurantId: RestaurantId;
    imageUrl?: string;
    category: string;
    price: bigint;
}
export type Timestamp = bigint;
export interface OrderItem {
    name: string;
    quantity: bigint;
    price: bigint;
    menuItemId: MenuItemId;
}
export interface CustomerProfile {
    principal: Principal;
    name: string;
    phone: string;
}
export type RestaurantId = string;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    deliveryAddress: string;
    paymentMethod: PaymentMethod;
    customer: Principal;
    createdAt: Timestamp;
    restaurantId: RestaurantId;
    phone: string;
    items: Array<OrderItem>;
}
export interface Restaurant {
    rid: RestaurantId;
    owner: Principal;
    name: string;
    createdAt: Timestamp;
    email: string;
    address: string;
    phone: string;
}
export interface MenuItem {
    id: MenuItemId;
    name: string;
    description: string;
    available: boolean;
    restaurantId: RestaurantId;
    imageUrl?: string;
    category: string;
    price: bigint;
}
export interface UpdateMenuItemArgs {
    name: string;
    description: string;
    available: boolean;
    imageUrl?: string;
    category: string;
    price: bigint;
}
export type MenuItemId = bigint;
export type ReviewId = bigint;
export interface CreateReviewArgs {
    orderId: OrderId;
    restaurantId: RestaurantId;
    comment: string;
    rating: bigint;
}
export interface Review {
    id: ReviewId;
    customer: Principal;
    createdAt: Timestamp;
    orderId: OrderId;
    restaurantId: RestaurantId;
    comment: string;
    rating: bigint;
}
export type OrderId = bigint;
export enum OrderStatus {
    Ready = "Ready",
    Preparing = "Preparing",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Pending = "Pending"
}
export enum PaymentMethod {
    UPI = "UPI",
    Card = "Card",
    Cash = "Cash"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuItem(args: CreateMenuItemArgs): Promise<MenuItem>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMenuItem(id: MenuItemId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerProfile(): Promise<CustomerProfile | null>;
    getMyRestaurant(): Promise<Restaurant | null>;
    getOrder(id: OrderId): Promise<Order | null>;
    getRestaurant(rid: RestaurantId): Promise<Restaurant | null>;
    isCallerAdmin(): Promise<boolean>;
    listMenuItems(restaurantId: RestaurantId): Promise<Array<MenuItem>>;
    listOrdersByCustomer(): Promise<Array<Order>>;
    listOrdersByRestaurant(restaurantId: RestaurantId): Promise<Array<Order>>;
    listRestaurants(): Promise<Array<Restaurant>>;
    listReviewsByRestaurant(restaurantId: RestaurantId): Promise<Array<Review>>;
    placeOrder(args: CreateOrderArgs): Promise<Order>;
    registerCustomer(name: string, phone: string): Promise<CustomerProfile>;
    registerRestaurant(name: string, phone: string, address: string, email: string): Promise<Restaurant>;
    submitReview(args: CreateReviewArgs): Promise<Review>;
    updateMenuItem(id: MenuItemId, args: UpdateMenuItemArgs): Promise<MenuItem | null>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
}
