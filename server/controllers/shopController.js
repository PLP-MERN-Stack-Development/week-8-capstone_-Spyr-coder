// controllers/shopController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Shop from '../models/Shop.js';

dotenv.config();

export async function registerShop(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Shop already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newShop = new Shop({ name, email, password: hashedPassword });
    await newShop.save();

    const token = jwt.sign({ id: newShop._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'Shop registered successfully',
      token,
      shop: {
        id: newShop._id,
        name: newShop.name,
        email: newShop.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getShopProfile(req, res) {
  try {
    const shopId = req.user?.id;
    if (!shopId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const shop = await Shop.findById(shopId).select('-password');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
