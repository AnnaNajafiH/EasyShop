import Express, { Request, Response } from "express";
import { User, UserModel } from "../models/userModel";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/utils";
import { CustomError } from "../middleware/errorHandler";

export const userRouter = Express.Router();

// User registration validation
const validateUserRegistration = (req: Request): string[] => {
  const errors: string[] = [];
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

// User login validation
const validateUserLogin = (req: Request): string[] => {
  const errors: string[] = [];
  const { email, password } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  }

  return errors;
};

// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validateUserLogin(req);
    
    if (errors.length > 0) {
      throw new CustomError(errors.join(', '), 400);
    }

    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      throw new CustomError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new CustomError('Invalid email or password', 401);
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });
  })
);

// POST /api/users/signup
userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validateUserRegistration(req);
    
    if (errors.length > 0) {
      throw new CustomError(errors.join(', '), 400);
    }

    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      throw new CustomError('User with this email already exists', 409);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      isAdmin: false
    } as User);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });
  })
);

// GET /api/users/profile (protected route)
userRouter.get(
  '/profile',
  asyncHandler(async (req: Request, res: Response) => {
    // This would need authentication middleware
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new CustomError('Authentication required', 401);
    }

    const user = await UserModel.findById(userId).select('-password');
    
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  })
);

// PUT /api/users/profile (protected route)
userRouter.put(
  '/profile',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      throw new CustomError('Authentication required', 401);
    }

    const { name, email } = req.body;
    
    const user = await UserModel.findById(userId);
    
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Update user fields
    if (name) user.name = name.trim();
    if (email) {
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new CustomError('Please provide a valid email address', 400);
      }
      user.email = email.toLowerCase();
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      }
    });
  })
);

export default userRouter;
