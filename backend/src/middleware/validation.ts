import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export const handleValidationErrors = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationErrors: ValidationError[] = errors.array().map(error => ({
      field: error.type === 'field' ? (error as any).path : 'unknown',
      message: error.msg,
      value: error.type === 'field' ? (error as any).value : undefined
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  }
  
  next();
};

export default handleValidationErrors;
