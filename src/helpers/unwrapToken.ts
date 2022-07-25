// Modules
import jwt from 'jsonwebtoken';

export default function unwrapToken (token: string):any {
  const cutToken = token.slice(7);
  return jwt.decode(cutToken);
}
