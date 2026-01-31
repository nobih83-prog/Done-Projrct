
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'n1',
    name: 'Nashwa Oud Royal',
    category: 'Perfumes',
    price: 55000,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'A masterpiece of rare agarwood and deep floral notes.',
    isNew: true,
    colors: ['#3d2b1f', '#1a0f0a'],
    sizes: ['50ml', '100ml']
  },
  {
    id: 'n2',
    name: 'Patek Philippe Calatrava',
    category: 'Watches',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'The epitome of the round wristwatch.',
    isNew: true,
    colors: ['#e5e7eb', '#f59e0b'],
    sizes: ['38mm', '40mm']
  },
  {
    id: 'n3',
    name: 'Nashwa Silk Abaya - Emerald',
    category: 'Fashion',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Hand-woven silk with intricate gold embroidery.',
    colors: ['#065f46', '#1e3a8a', '#000000'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'n4',
    name: 'Devialet Phantom I',
    category: 'Electronics',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Implosive sound, iconic design.',
    isSale: true,
    colors: ['#ffffff', '#000000'],
    sizes: ['103dB', '108dB']
  },
  {
    id: 'n5',
    name: 'Hermès Birkin 30',
    category: 'Accessories',
    price: 2200000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'The ultimate symbol of luxury craftsmanship.',
    colors: ['#92400e', '#000000', '#dc2626'],
    sizes: ['30cm', '35cm']
  },
  {
    id: 'n6',
    name: 'Nashwa Velvet Noir',
    category: 'Perfumes',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Mystery captured in a bottle.',
    colors: ['#1e1b4b'],
    sizes: ['100ml']
  },
  {
    id: 'n7',
    name: 'Apple Vision Pro',
    category: 'Electronics',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1621330396173-e41b16297ea1?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Spatial computing like never before.',
    isNew: true,
    colors: ['#94a3b8'],
    sizes: ['256GB', '512GB', '1TB']
  },
  {
    id: 'n8',
    name: 'Cartier Love Bracelet',
    category: 'Accessories',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1589128504748-510d94511ca0?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'A symbol of free-spirited love.',
    colors: ['#f59e0b', '#e5e7eb', '#fbbf24'],
    sizes: ['16cm', '17cm', '18cm', '19cm']
  }
];
