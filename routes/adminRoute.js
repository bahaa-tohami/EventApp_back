import express from 'express';
import { listUsers, activateUser } from '../controllers/adminController.js';
import { isAdmin, isLogged } from '../middlewares/auth.js';
 
const router = express.Router();
 

router.get('/admin/users', isLogged, isAdmin, listUsers);
router.put('/admin/users/activate', isLogged, isAdmin, activateUser);
 
export default router;
 