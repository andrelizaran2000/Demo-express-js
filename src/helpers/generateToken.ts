// Modules
import jwt from 'jsonwebtoken';

// Private keys
import { PRIVATE_KEY_DB } from '../utils/env';

export default function generateToken(id:string) {
  return jwt.sign({ id }, PRIVATE_KEY_DB);
}
