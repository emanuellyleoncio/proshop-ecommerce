import express, { Request, Response } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  createProductReview,
  getTopProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';
import checkObjectId from '../middleware/checkObjectId';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;