// Modules
import bcryptjs from 'bcryptjs';

export default function comparePasswords (hash:string, password:string) {
  return bcryptjs.compareSync(password, hash);
}
