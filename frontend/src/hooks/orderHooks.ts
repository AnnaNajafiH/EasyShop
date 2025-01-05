import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem, ShippingAddress } from "../types/Cart";
import apiClient from "../apiClient";
import { Order } from "../types/Order";

export const useGetOrderDetailsQuery = (id: string) => 
useQuery({
    queryKey: ['order', id],
    queryFn: async ()=>
        (await apiClient.get<Order>(`/api/orders/${id}`)).data,
})

//this function fetches the PayPal Client ID from the backend API using React Query. Let’s break it down step by step:
export const useGetPaypalClientIdQuery = ()=> 
    useQuery({
        queryKey: ['paypal-clientId'],
        queryFn: async ()=>
            (await apiClient.get<{clientId: string}>('/api/key/paypal')).data,
    })

    // a mutation is an action that changes data on the server (e.g., updating an order status).
    //useMutation is a React Query hook for performing actions that modify data (like POST, PUT, DELETE requests).
    export const usePayOrderMutation = () => 
        useMutation ({
        mutationFn: async (details : {orderId: string}) =>
        (await apiClient.put<{message:string; order:Order}>(`/api/orders/${details.orderId}/pay`, details))
        .data,
    })

export const useCreateOrderMutation = () => useMutation({
    mutationFn: async (order:{
        orderItems: CartItem[];
        shippingAddress: ShippingAddress;
        paymentMethod: string;
        itemsPrice: number;
        shippingPrice: number;
        taxPrice: number;
        totalPrice: number;
    }) => (await apiClient.post<{message:string, order:Order}>(
        "/api/orders", 
        order)
    ).data,
});
 
export const useGetOrderHistoryQuery = () => 
    useQuery ({
        queryKey: ['order-history'],
        queryFn: async ()=>
            (await apiClient.get<Order[]>('/api/orders/history')).data,
    })


