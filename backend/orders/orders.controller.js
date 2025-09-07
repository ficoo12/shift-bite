const { faker } = require("@faker-js/faker");
const Order = require("./orders.model");
const Restaurant = require("../restaurants/restaurants.model");

//funkcija za generiranje narudžbe
async function generateOrder(ownerId) {
  const restaurants = await Restaurant.find({ owner: ownerId }).select("_id");

  if (!restaurants || restaurants.length === 0) {
    throw new Error("Vlasnik nema restorana.");
  }

  const randomRestaurant = faker.helpers.arrayElement(restaurants);
  const items = Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    () => {
      const qty = faker.number.int({ min: 1, max: 3 });
      const price = faker.number.float({ min: 2, max: 10, precision: 0.01 });
      return {
        item_id: faker.string.alphanumeric(6).toUpperCase(),
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement([
          "burgers",
          "drinks",
          "sides",
          "desserts",
        ]),
        quantity: qty,
        unit_price: price,
        total_price: Number((qty * price).toFixed(2)),
      };
    }
  );

  const subtotal = items.reduce((sum, i) => sum + i.total_price, 0);
  const tax = Number((subtotal * 0.15).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return {
    order_id: faker.string.alphanumeric(8).toUpperCase(),
    restaurantId: randomRestaurant,
    status: "completed",
    order_type: faker.helpers.arrayElement(["dine_in", "takeaway", "delivery"]),
    table_number: faker.number.int({ min: 1, max: 15 }),
    items,
    subtotal,
    tax,
    total,
    payment: {
      method: faker.helpers.arrayElement(["cash", "card", "mobile"]),
      transaction_id: faker.string.alphanumeric(10).toUpperCase(),
      amount: total,
    },
    notes: faker.lorem.sentence(),
  };
}

// endpoint za generiranje narudžbi

const createOrder = (ownerId) => {
  setInterval(async () => {
    try {
      const orderData = await generateOrder(ownerId);
      const order = new Order(orderData);
      await order.save();
      console.log(``);
    } catch (error) {
      console.error("Failed to generate order: " + error);
    }
  }, 60000);
};

// endpoint za dohvačanje narudžbi

const getOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Failed to get orders" });
  }
};

module.exports = { createOrder, getOrders };
