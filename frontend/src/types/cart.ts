export interface Cart {
  _id: string;
  totalCartItems: number;
  totalPrice: number;
  shippingCost: number;
  tax: number;
  user: string;
  expiresAt: string;
  cartItems: CartItem[];
  coupons: any[];
  createdAt: string;
  updatedAt: string;
  finalTotal: number;
  totalPriceAfterDiscount: number | null;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  color: string;
  size: string;
  itemTotalPrice: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  maxQuantityPerOrder: number;
  price: number;
  priceAfterDiscount: number;
  image: string;
}
