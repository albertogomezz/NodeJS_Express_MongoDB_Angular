import { Profile } from "./profile.model";

export interface Product {
    slug: string;
    name: string;
    description: string;
    price: number;
    images: [],
    img: string,
    id_cat: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}
