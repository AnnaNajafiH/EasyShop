import Express, {Request,Response}  from "express";
import { User, UserModel } from "../models/userModel";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/utils";


export const userRouter= Express.Router();
//POST/ api/users/signin
userRouter.post(
    '/signin',
    asyncHandler (async (req: Request , res: Response)=>{
        const user= await UserModel.findOne({ email: req.body.email})
        if (user){
            if (bcrypt.compareSync(req.body.password, user.password)){
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
                return
            }
        }
        res.status(401).json({message: 'Invalid email or password'})    
})
);

//POST/ api/users/signup
userRouter.post(
            '/signup',
            asyncHandler (async (req: Request , res: Response)=>{
                const user= await UserModel.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password),
                } as User);
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
            })
        );


 

