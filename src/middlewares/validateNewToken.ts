// Modules
import { NextFunction, Request, Response } from 'express';

// Helpers
import unwrapToken from '../helpers/unwrapToken';

// Models
import User from '../models/User';

export default async function validateToken (req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(403).json({ mssg:'No token' });
  const tokenPayload = unwrapToken(authorization);
  if (tokenPayload === null) return res.status(403).json({ mssg:'Bad token' });
  const savedUser = await User.findById(tokenPayload.id);
  if (savedUser === null) return res.status(403).json({ mssg:'Bad token' });
  req.body.savedUser = savedUser;
  next();
}
