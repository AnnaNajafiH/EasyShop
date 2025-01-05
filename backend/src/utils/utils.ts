import { User } from "../models/userModel";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const generateToken = (user: User) => {
    return jwt.sign(    //jwt.sign() is used to create the token.
        {             //The first argument is an object containing the payload (user information to be encoded in the token.
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret', //The second argument is the secret key used to sign the token.
        {
            expiresIn: '30d', //The third argument is an options object, specifying that the token will expire in 30 days.
        }
    )

}


//====================================================================

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // 1. Check if the Authorization header exists
    if (authorization) {
        // 2. Extract the token (after "Bearer ")
        const token = authorization.slice(7, authorization.length);

        // 3. Verify the token using JWT
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingscret'
        );

        // 4. Attach decoded user information to the request object
        req.user = decode as {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
            token: string;
        };

        // 5. Call next() to proceed to the next middleware or route handler
        next();
    } else {
        // 6. If no Authorization header is present, return a 401 Unauthorized error
        res.status(401).send({ message: 'Token is not supplied' });
    }
};

