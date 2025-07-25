import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  total_visits: { type: Number, default: 1 },
  total_rewards: { type: Number, default: 0 },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
