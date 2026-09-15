import express from 'express';
import authRouter from './api/auth.js';
import productsRouter from './api/products.js';
import ordersRouter from './api/orders.js';
import statsRouter from './api/stats.js';
import reviewsRouter from './api/reviews.js';
import wishlistRouter from './api/wishlist.js';
import contactRouter from './api/contact.js';
import usersRouter from './api/users.js';
<<<<<<< HEAD
import ingredientsRouter from './api/ingredients.js';
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

const router = express.Router();

router.use('/auth', authRouter);
router.use('/products/:productId/reviews', reviewsRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/stats', statsRouter);
router.use('/wishlist', wishlistRouter);
router.use('/contact', contactRouter);
router.use('/users', usersRouter);
<<<<<<< HEAD
router.use('/ingredients', ingredientsRouter);
=======
>>>>>>> 6644a9b3829b34f1e619ed6d01c457846ddf0d75

export default router;