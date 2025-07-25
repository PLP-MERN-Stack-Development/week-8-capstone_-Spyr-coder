// server/models/Shop.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const shopSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: true,
  },
  shop_email: {
    type: String,
    required: true,
    unique: true,
  },
  shop_password: {
    type: String,
    required: true,
  },
  location: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  subscriptionExpires: Date,
});

// ✅ Hash password automatically before save
shopSchema.pre('save', async function (next) {
  if (!this.isModified('shop_password')) return next();
  this.shop_password = await bcrypt.hash(this.shop_password, 10);
  next();
});

// ✅ Compare input password with hashed one
shopSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.shop_password);
};

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
