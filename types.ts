export type Language = 'en' | 'zh' | 'es' | 'ja';

export interface LocalizedString {
  en: string;
  zh: string;
  es: string;
  ja: string;
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
}

export interface BankDetails {
  beneficiary: string;
  address: string;
  city: string;
  province: string;
  country: string;
  accountNumber: string;
  swiftCode: string;
  bankName: string;
}

export interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  products: CategoryProduct[];
}
