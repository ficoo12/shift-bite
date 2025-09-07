const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item_id: String,
  name: String,
  category: String,
  quantity: Number,
  unit_price: Number,
  total_price: Number,
});

const PaymentSchema = new mongoose.Schema({
  method: String,
  transaction_id: String,
  amount: Number,
  currency: { type: String, default: "EUR" },
});

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["completed", "pending", "cancelled"] },
  order_type: { type: String, enum: ["dine_in", "takeaway", "delivery"] },
  table_number: Number,
  items: [ItemSchema],
  subtotal: Number,
  tax: Number,
  discounts: [
    {
      type: String,
      code: String,
      amount: Number,
    },
  ],
  total: Number,
  payment: PaymentSchema,
  notes: String,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Orders = mongoose.model("orders", OrderSchema);
module.exports = Orders;
