
import { Product, ProductCategory, Size, Color, Offer } from '../types';

export const sizes: Size[] = [
  { id: 'xs', name: 'XS', measurements: { chest: 34, length: 26 } },
  { id: 's', name: 'S', measurements: { chest: 36, length: 27 } },
  { id: 'm', name: 'M', measurements: { chest: 38, length: 28 } },
  { id: 'l', name: 'L', measurements: { chest: 40, length: 29 } },
  { id: 'xl', name: 'XL', measurements: { chest: 42, length: 30 } },
  { id: 'xxl', name: 'XXL', measurements: { chest: 44, length: 31 } },
];

export const colors: Color[] = [
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'red', name: 'Red', hex: '#DC2626' },
  { id: 'blue', name: 'Blue', hex: '#2563EB' },
  { id: 'green', name: 'Green', hex: '#16A34A' },
  { id: 'yellow', name: 'Yellow', hex: '#EAB308' },
  { id: 'purple', name: 'Purple', hex: '#9333EA' },
  { id: 'pink', name: 'Pink', hex: '#EC4899' },
  { id: 'gray', name: 'Gray', hex: '#6B7280' },
  { id: 'navy', name: 'Navy', hex: '#1E3A8A' },
];

export const categories: { id: ProductCategory; name: string; icon: string }[] = [
  { id: 'men', name: 'Men', icon: '👨' },
  { id: 'women', name: 'Women', icon: '👩' },
  { id: 'kids', name: 'Kids', icon: '👶' },
  { id: 'bulk', name: 'Bulk Orders', icon: '📦' },
  { id: 'corporate', name: 'Corporate', icon: '🏢' },
  { id: 'events', name: 'Events', icon: '🎉' },
  { id: 'custom', name: 'Custom Design', icon: '🎨' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium quality 100% cotton t-shirt perfect for daily wear',
    category: 'men',
    basePrice: 299,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    ],
    sizes,
    colors,
    fabric: '100% Cotton',
    gst: 18,
    isCustomizable: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    name: 'Premium Polo Shirt',
    description: 'Elegant polo shirt with collar, perfect for casual and semi-formal occasions',
    category: 'men',
    basePrice: 499,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400',
    ],
    sizes,
    colors,
    fabric: '65% Cotton, 35% Polyester',
    gst: 18,
    isCustomizable: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Women\'s Fitted Tee',
    description: 'Comfortable fitted t-shirt designed specifically for women',
    category: 'women',
    basePrice: 349,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    ],
    sizes,
    colors,
    fabric: '95% Cotton, 5% Elastane',
    gst: 18,
    isCustomizable: true,
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: '4',
    name: 'Kids Fun T-Shirt',
    description: 'Colorful and comfortable t-shirt perfect for active kids',
    category: 'kids',
    basePrice: 249,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    ],
    sizes: sizes.slice(0, 4), // Only XS to L for kids
    colors,
    fabric: '100% Cotton',
    gst: 12,
    isCustomizable: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: '5',
    name: 'Corporate Uniform Shirt',
    description: 'Professional quality shirt perfect for corporate branding',
    category: 'corporate',
    basePrice: 399,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    ],
    sizes,
    colors: colors.filter(c => ['white', 'black', 'navy', 'gray'].includes(c.id)),
    fabric: '60% Cotton, 40% Polyester',
    gst: 18,
    isCustomizable: true,
    rating: 4.4,
    reviewCount: 234,
  },
  {
    id: '6',
    name: 'Event Merchandise Tee',
    description: 'High-quality t-shirt perfect for events and promotional activities',
    category: 'events',
    basePrice: 329,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400',
    ],
    sizes,
    colors,
    fabric: '100% Cotton',
    gst: 18,
    isCustomizable: true,
    rating: 4.5,
    reviewCount: 92,
  },
];

export const featuredProducts = mockProducts.slice(0, 4);

export const trendingProducts = mockProducts.slice(2, 6);

export const offers: Offer[] = [
  {
    id: '1',
    title: 'First Order Discount',
    description: 'Get 20% off on your first order',
    discountPercent: 20,
    minAmount: 500,
    code: 'FIRST20',
    validUntil: new Date('2024-12-31'),
    isActive: true,
  },
  {
    id: '2',
    title: 'Bulk Order Special',
    description: 'Order 10+ items and get 30% off',
    discountPercent: 30,
    minAmount: 2000,
    code: 'BULK30',
    validUntil: new Date('2024-12-31'),
    isActive: true,
  },
  {
    id: '3',
    title: 'Festival Sale',
    description: 'Celebrate with 25% off on all items',
    discountPercent: 25,
    minAmount: 750,
    code: 'FESTIVAL25',
    validUntil: new Date('2024-12-31'),
    isActive: true,
  },
];

export const fonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Georgia',
  'Comic Sans MS',
  'Impact',
  'Trebuchet MS',
  'Palatino',
];
