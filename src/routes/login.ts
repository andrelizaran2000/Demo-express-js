// Modules
import { body } from 'express-validator';
import { Request, Response, Router } from 'express';

// Controllers
import { login, register, validateToken } from '../controllers/login';

// Middlewares
import validateBody from '../middlewares/validateBody';
import validateNewToken from '../middlewares/validateNewToken';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg:'Hello world' });
}); 

router.post('/', 
  [
    body('userName').isString(),
    body('password').isString().isLength({ min:8 }), 
    validateBody
  ],
  (req:Request, res:Response) => {
    try {
      const { userName, password } = req.body;
      login(userName, password, res);
    } catch (err) {
      res.status(500).json({ mssg:'Server error' });
    }
  }
);

router.post('/register', 
  [
    body('userName').isString(),
    body('password').isString().isLength({ min:8 }), 
    body('privateKey').isString().isLength({ min:8 }),
    validateBody
  ],
  (req:Request, res:Response) => {
    try {
      const { userName, password, privateKey } = req.body;
      register(userName, password, privateKey, res);
    } catch (err) {
      res.status(500).json({ mssg:'Server error' });
    }
  }
);

router.get('/validate-token', 
  [ 
    validateNewToken 
  ],
  (req:Request, res:Response) => {
    try {
      const { savedUser } = req.body;
      validateToken(savedUser, res);
    } catch (err:any) {
      res.status(500).json({ mssg:'Server error' });
    }
  }
  
);

export default router;