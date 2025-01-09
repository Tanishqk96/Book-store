import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
router.post("/",createProduct);
router.put('/:id',updateProduct);
router.get('/',getProducts);
router.delete("/:id",deleteProduct);
export default router;
 //console.log(process.env.MONGO_URL);