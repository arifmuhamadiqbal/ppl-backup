import express from "express";
import { getOrders, getTodayOrders } from "../controller/OrdersController.js";

const orderRoute = express.Router();

orderRoute.get("/orders", getOrders);
orderRoute.get("/todayOrders", getTodayOrders);

export default orderRoute;