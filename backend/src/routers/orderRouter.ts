import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isAuth } from "../utils/utils";
import { OrderModel } from "../models/orderModel";
import { Product } from "../models/productModel";

export const orderRouter = express.Router();

// /api/orders/mine
orderRouter.get(
    '/history',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find({user: req.user._id});
        res.json(orders);
    })
)


orderRouter.get (     //api/orders/:id
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).send({message: 'Order Not Found'});
        }
    })
)

orderRouter.post(
    '/',
    isAuth,
    asyncHandler (async (req: Request, res: Response) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({message: 'Cart is empty'});
        } else {  
            const createOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x:Product)=>({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemPrice: req.body.itemPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            res.status(201).send({message: 'New Order Created', order: createOrder});
        }

    })
)

orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id).populate('user');
        if (order) {
            order.isPaid = true;
            order.paidAt = new Date(Date.now());
            order.paymentResult = {
                paymentId: req.body.id,   //this are coming from PayPal
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            res.send({order: updatedOrder, message: 'Order Paid Successfully'});
        } else {
            res.status(404).send({message: 'Order Not Found'});
        }
    })
)