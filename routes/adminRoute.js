import express from 'express';
import { listUsers, deactivateUser, updateUserRole } from '../controllers/adminController.js';
import { isAdmin, isLogged } from '../middlewares/auth.js';
 
const router = express.Router();
 

router.get('/admin/users', isLogged, isAdmin, listUsers);
router.put('/admin/users/deactivate', isLogged, isAdmin, deactivateUser);
router.put('/admin/users/role', isLogged, isAdmin, updateUserRole);
 
export default router;
 