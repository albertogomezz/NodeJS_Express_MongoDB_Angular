import { Product } from "./product.model";

export interface Category {
    slug: string;
    category_name: string;
    image: string;
    products: string[];
}