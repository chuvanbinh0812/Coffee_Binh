import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
} from '../../controllers/userController.js';
import { verifyToken, isAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Tất cả route đều yêu cầu quyền admin
router.get('/', verifyToken, isAdmin, getAllUsers);
router.get('/:id', verifyToken, isAdmin, getUserById);
router.put('/:id/role', verifyToken, isAdmin, updateUserRole);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;
