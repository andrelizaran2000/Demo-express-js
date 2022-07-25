// Modules
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default function validateBody(req:Request, res:Response<any>) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}
