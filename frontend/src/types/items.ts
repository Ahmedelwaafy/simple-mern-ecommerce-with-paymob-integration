export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  maxQuantityPerOrder?: number;
  sold?: number;
  imageCover: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  active: boolean;
  category: string; // or Category if you populate
  createdAt?: string;
  updatedAt?: string;
}
