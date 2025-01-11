import React from "react";
import { Cart, CartItem, ShippingAddress } from "./types/Cart";
import { User } from "./types/User";
type AppState = {
     mode: string;
     cart: Cart;
     userInfo?: User | null;
}

const initialState: AppState = {
    userInfo: localStorage.getItem('userInfo')   //for the sign-in user information.
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

    mode: localStorage.getItem('mode')     // for the dark mode and light mode.
    ? (localStorage.getItem('mode') as 'dark' | 'light') 
    : window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',


    cart: {   //for the cart items.
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')!)
        : [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress')!)
        : {},
        paymentMethod: localStorage.getItem('paymentMethod')
        ? localStorage.getItem('paymentMethod')!
        : 'paypal',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0
    }
}


type Action = 
|{ type: 'SWITCH_MODE' } 
|{type: 'CART_ADD_ITEM'; payload:CartItem}
|{type: 'CART_REMOVE_ITEM'; payload:CartItem}
|{type: 'CART_CLEAR'}
|{type: 'USER_SIGNIN'; payload:User}
|{type: 'USER_SIGNOUT'}
|{type: 'SAVE_SHIPPING_ADDRESS'; payload:ShippingAddress}
|{type: 'SAVE_PAYMENT_METHOD'; payload:string}

function reducer (state:AppState , action:Action) : AppState{
    switch (action.type) {
        case 'SWITCH_MODE':
            localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark');  // Save the new mode in localStorage.
            return {...state, mode: state.mode === 'dark' ? 'light' : 'dark' } // Return the updated state with toggled mode 

        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item:CartItem) => item._id === newItem._id);
            const cartItems = existItem
            ? state.cart.cartItems.map((item:CartItem) =>
            item._id === existItem._id ? newItem : item)
            : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems}}

        case 'CART_REMOVE_ITEM':{
            const cartItems = state.cart.cartItems.filter(
                (item:CartItem) => item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems}}
        }

        case 'CART_CLEAR':
            return {...state, cart: {...state.cart, cartItems: []}}

        case 'USER_SIGNIN':
            return {...state, userInfo: action.payload}

        case 'USER_SIGNOUT':
            return {
                mode:
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light',
                cart:{
                    cartItems: [],
                    paymentMethod: 'paypal',
                    shippingAddress: {
                        fullName: '',
                        address: '',
                        city: '',
                        postalCode: '',
                        country: ''
                    },
                    itemsPrice: 0,
                    shippingPrice: 0,
                    taxPrice: 0,
                    totalPrice: 0
                },
                }
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state, 
                cart: {
                    ...state.cart, 
                    shippingAddress: action.payload}}

        case 'SAVE_PAYMENT_METHOD':
            return{
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload}}

       default:
            return state
    }

}


const defaultDispatch : React.Dispatch<Action> =() => initialState;

const Store =React.createContext({
    state: initialState,
    dispatch: defaultDispatch  // Placeholder dispatch function
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer <React.Reducer<AppState, Action>>(
        reducer, 
        initialState)
        return (
            <Store.Provider value={{state, dispatch}} {...props} />
        )
    }

    export { Store, StoreProvider }






 

