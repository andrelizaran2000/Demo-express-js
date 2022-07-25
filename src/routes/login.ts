// Modules
import { Request, Router } from 'express';
import { body, validationResult } from 'express-validator';

// Controllers
import { login, register, validateToken } from '../controllers/login';
import validateBody from '../middlewares/validateBody';

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg:'Hello world' });
}); 

router.post('/', 
  body('userName').isString(),
  body('password').isString().isLength({ min:8 }), 
  (req, res) => {
    try {
      const { userName, password } = req.body;
      login(userName, password, res);
    } catch (err) {
      res.status(500).json({ mssg:'Server error' });
    }
  }
);

router.post('/register', 
  body('userName').isString(),
  body('password').isString().isLength({ min:8 }), 
  body('privateKey').isString().isLength({ min:8 }),
  (req:Request, res) => {
    try {
      const { userName, password, privateKey } = req.body;
      register(userName, password, privateKey, res);
    } catch (err) {
      res.status(500).json({ mssg:'Server error' });
    }
  }
);

router.get('/validate-token', (req, res) => {
  try {
    const { authorization } = req.headers;
    validateToken(authorization as string, res);
  } catch (err:any) {
    res.status(500).json({ mssg:'Server error' });
  }
});

export default router;