import { ModelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { timestamps: true}})
export class User {
public _id?: string;

@prop({ required: true})
public name!: string;

@prop({ required: true , unique: true})
public email!: string;

@prop({ required: true})
public password!: string;

@prop({ required: true , default: false})
public isAdmin!: boolean;

}

export const UserModel = getModelForClass(User);
