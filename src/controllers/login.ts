// Modules
import { Response } from 'express';

// Helpers
import unwrapToken from '../helpers/unwrapToken';
import generateHash from '../helpers/generateHash';
import generateToken from '../helpers/generateToken';
import comparePasswords from '../helpers/comparePasswords';

// Models
import User from '../models/User';

// Env
import { APP_KEY } from '../utils/env';

export async function login (userName:string, password:string, res:Response) {
  const savedUser = await User.findOne({ userName });
  if (savedUser === null) return res.status(400).json({ mssg:'User or password wrong' });
  if (!comparePasswords(savedUser.password as string, password)) return res.status(400).json({ mssg:'User or password wrong' });
  const token = generateToken(savedUser.id);
  res.json({ token });
}

export async function register (userName:string, password:string, privateKey:string, res:Response) {
  if (privateKey !== APP_KEY) return res.status(400).json({ mssg:'Error creating user' });
  const possibleUser = await User.findOne({ userName });
  if (possibleUser !== null) return res.status(400).json({ mssg:'User in use' });
  const hash = generateHash(password);
  const user = new User({ userName, password:hash });
  const savedUser = await user.save();
  const token = generateToken(savedUser.id);
  res.status(201).json({ token });
}

export async function validateToken (savedUser:any, res:Response) {
  const token = generateToken(savedUser.id);
  res.status(200).json({ token });
}