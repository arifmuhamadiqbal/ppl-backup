import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const OrderMenus = db.define(
    "ordermenus", {
        id_order_menus: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false
    }
)

export default OrderMenus;

(async() => {
    await db.sync();
});