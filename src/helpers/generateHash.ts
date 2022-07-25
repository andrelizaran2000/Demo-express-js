// Modules
import bcryptjs from 'bcryptjs';

export default function generateHash (password:string) {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
}