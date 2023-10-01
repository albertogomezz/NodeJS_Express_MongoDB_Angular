import { Product } from "./product.model";

export interface Category {
    slug: string;
    id_cat: string;
    category_name: string;
    image: string;
    products: string[];
}