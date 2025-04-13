import { Product, ProductVariant } from "@prisma/client";

export interface ProductData {
  name: string;
  images: UploadedImage[]; // URLs Cloudinary
  specs: { key: string; value: string }[];
  description: string;
  stock: number;
  categoryId: string;
  variants: { quantity: number; price: number }[]; // Ajout des variantes
  isNew?: boolean | null;
  isPromo?: boolean | null;
  promoPercentage?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
}

export interface ProductUpdateData {
  name?: string;
  images?: { url: string; public_id: string }[];
  specs?: { key: string; value: string }[];
  description?: string;
  stock?: number;
  categoryId?: string;
  variants?: { quantity: number; price: number }[];
  isNew?: boolean | null;
  isPromo?: boolean | null;
  promoPercentage?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
}

export interface ProductWithVariants extends Product {
  images: {
    url: string;
    public_id: string;
  }[];
  variants: ProductVariant[];
  category?: {
    id: string;
    name: string;
  };
  isNew: boolean | null;
  isPromo: boolean | null;
  promoPercentage: number | null;
  rating: number | null;
  reviewCount: number | null;
}

export type UploadedImage = {
  url: string;
  public_id: string;
};
  