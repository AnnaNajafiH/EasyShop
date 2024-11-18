import { modelOptions, Prop as prop, getModelForClass , Ref } from "@typegoose/typegoose";
import { User } from "./userModel";
import { Product } from "./productModel";


class ShippingAddress {     //This class defines the structure for a shipping address.
    @prop()
    public fullName?: string;
    @prop()
    public address?: string;
    @prop()
    public city?: string;
    @prop()
    public postalCode?: string;
    @prop()
    public country?: string;
    @prop()
    public lat?: number;
    @prop()
    public lng?: number;
}

class Item{            //This class defines the structure for an item in an order.
    @prop({required:true})
    public name!: string;
    @prop({required:true})
    public quantity!: string;
    @prop({required:true})
    public image!: number;
    @prop({required:true})
    public price!: number;
    @prop({ref:Product})
    public product?: Ref<Product>;   //creates a reference to the Product model, allowing you to store a product ID instead of duplicating the product data.
}


class PaymentResult {
    @prop()
    public paymentId!: string;  
    @prop()
    public status!: string;
    @prop()
    public update_time!: string;
    @prop()
    public email_address!: string;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Order{
    public _id!: string;
    @prop()
    public orderItems!: Item[];
    @prop()
    public shippingAddress?: ShippingAddress;

    @prop({ref:User})
    public user?: Ref<User>;

    @prop({required:true})
    public paymentMethod!: string;

    @prop()
    public paymentResult?: PaymentResult;

    @prop({required:true, default:0})
    public itemPrice!: number;
    
    @prop({required:true, default:0})
    public shippingPrice!: number;

    @prop({required:true, default:0})
    public taxPrice!: number;

    @prop({required:true, default:0})
    public totalPrice!: number;

    @prop({required:true, default:false})
    public isPaid!: boolean;

    @prop()
    public paidAt!: Date;

    @prop({required:true, default:false})
    public isDelivered!: boolean;

    @prop()
    public deliveredAt!: Date;
}

export const OrderModel = getModelForClass(Order);



