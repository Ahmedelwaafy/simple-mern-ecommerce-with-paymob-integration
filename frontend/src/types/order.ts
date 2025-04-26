export interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  finalTotal: number;
  paymentMethod: "card" | "cash" | string; // assuming "card" or maybe other values
  status: "pending" | "paid" | "delivered" | string; // status can vary, typed broadly
  paymentDetails: PaymentDetails;
  shippingAddress: ShippingAddress;
  user: string; // user ID
  cart: string; // cart ID
  paidAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  color: string;
  size: string;
  itemTotalPrice: number;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  priceAfterDiscount: number;
  image: string;
}

export interface PaymentDetails {
  sessionUrl: string;
  sessionId: string;
  finalTotal: number; // in cents probably, if using gateways like Paymob
  gateway: string;
  status: "pending" | "paid" | string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}
