import express from 'express';
const router = express.Router();
import { registerCustomer, getCustomers } from '../controllers/customerController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/register', authMiddleware, registerCustomer); // ✅ protect!
router.get('/', authMiddleware, getCustomers); // ✅ protect!

export default router;
