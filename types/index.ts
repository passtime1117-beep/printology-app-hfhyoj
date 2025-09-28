
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
  loyaltyPoints: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  basePrice: number;
  images: string[];
  sizes: Size[];
  colors: Color[];
  fabric: string;
  gst: number;
  isCustomizable: boolean;
  rating: number;
  reviewCount: number;
}

export interface Size {
  id: string;
  name: string;
  measurements: {
    chest: number;
    length: number;
  };
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  customization?: Customization;
  price: number;
}

export interface Customization {
  id: string;
  frontDesign?: Design;
  backDesign?: Design;
  totalPrice: number;
}

export interface Design {
  text?: TextElement[];
  images?: ImageElement[];
  backgroundColor?: string;
}

export interface TextElement {
  id: string;
  text: string;
  font: string;
  size: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

export interface ImageElement {
  id: string;
  uri: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  gstAmount: number;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery: Date;
  trackingId?: string;
}

export type ProductCategory = 'men' | 'women' | 'kids' | 'bulk' | 'corporate' | 'events' | 'custom';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'printing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod' | 'paytm' | 'phonepe';

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  minAmount: number;
  code: string;
  validUntil: Date;
  isActive: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}
