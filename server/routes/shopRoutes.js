// shopRoutes.js
import express from 'express';
import { registerShop, getShopProfile } from '../controllers/shopController.js';

const router = express.Router();

router.post('/register', registerShop);
router.get('/profile', getShopProfile); // must match export

export default router;
