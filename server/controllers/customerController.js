// server/controllers/customerController.js
import Customer from '../models/Customer.js';

export const registerCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const ownerId = req.shop.id;

    let customer = await Customer.findOne({ phone, ownerId });

    if (customer) {
      customer.total_visits += 1;
    } else {
      customer = new Customer({
        name,
        phone,
        ownerId,
        total_visits: 1,
      });
    }

    await customer.save();
    res.status(201).json({ message: 'Customer registered', customer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register customer' });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const ownerId = req.shop.id; // ✅ filter by logged-in shop
    const customers = await Customer.find({ ownerId });
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get customers' });
  }
};
