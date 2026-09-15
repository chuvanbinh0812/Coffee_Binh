import express from 'express';
import {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient
} from '../../controllers/ingredientController.js';
import { verifyToken, isAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Toàn bộ thao tác nguyên liệu/tồn kho chỉ dành cho quản trị viên
router.get('/', verifyToken, isAdmin, getAllIngredients);
router.post('/', verifyToken, isAdmin, createIngredient);
router.put('/:id', verifyToken, isAdmin, updateIngredient);
router.delete('/:id', verifyToken, isAdmin, deleteIngredient);

export default router;
