import { ApiError } from "../types/ApiError";
import { CartItem } from "../types/Cart";
import { Product } from "../types/Product";

export const getError=(error:ApiError)=>{
    return error.response && error.response.data.message 
    ? error.response.data.message 
    : error.message;
}

export const convertProductToCartItem = (product: Product): CartItem => {
    const cartItem: CartItem = {
        _id: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        slug: product.slug,
        countInStock: product.countInStock,
        quantity: 1,
    };
    return cartItem;
}