
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[]; // Hex codes or names
  sizes?: string[]; // e.g., ['S', 'M', 'L'] or ['40', '41']
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Category {
  ALL = 'All',
  WATCHES = 'Watches',
  ELECTRONICS = 'Electronics',
  PERFUMES = 'Perfumes',
  FASHION = 'Fashion',
  ACCESSORIES = 'Accessories'
}
