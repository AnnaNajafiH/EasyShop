//The declare keyword is used in TypeScript to tell the compiler that the implementation for this code exists elsewhere.
declare namespace Express {
    export interface Request {
        user:{
            _id:string;
            name:string;
            email:string;
            isAdmin:boolean;
            token:string;
        }
    }}