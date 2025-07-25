// server/controllers/authController.js
import Shop from '../models/Shop.js';
import jwt from 'jsonwebtoken';

export const registerShop = async (req, res) => {
  const { shop_name, shop_email, shop_password } = req.body;

  try {
    // Check if shop already exists
    const existingShop = await Shop.findOne({ shop_email });
    if (existingShop) {
      return res.status(409).json({ error: 'Shop already exists' });
    }

    // Save directly — pre-save hook hashes password
    const shop = new Shop({ shop_name, shop_email, shop_password });
    await shop.save();

    res.status(201).json({ message: 'Shop registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginShop = async (req, res) => {
  const { shop_email, shop_password } = req.body;

  try {
    const shop = await Shop.findOne({ shop_email });
    if (!shop) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await shop.comparePassword(shop_password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: shop._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};
