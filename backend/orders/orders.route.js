const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("./orders.controller");

router.get("/order", createOrder);
router.get("/orders", getOrders);

module.exports = router;
