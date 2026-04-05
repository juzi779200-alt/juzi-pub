export type Language = 'en' | 'es';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface ProductVariant {
  id: string;
  name: LocalizedString;
  price: number;
}

export interface Product {
  id: string;
  title: LocalizedString;
  price: number;
  originalPrice?: number;
  description: LocalizedString;
  images: string[];
  tags: LocalizedString[];
  reviews: number;
  rating: number;
  inventory: number;
  variants?: ProductVariant[];
}

export interface CategoryProduct {
  id: string;
  name: LocalizedString;
  price: number;
  description: LocalizedString;
  image: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  products: CategoryProduct[];
}
