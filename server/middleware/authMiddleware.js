// server/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import Shop from '../models/Shop.js'; // ✅ you need this!

export default async function (req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.sendStatus(401);

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Look up the shop in DB:
    const shop = await Shop.findById(decoded.id).select('-shop_password');
    if (!shop) return res.sendStatus(404); // not found

    req.shop = shop; // ✅ attach as `req.shop`!

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
}
