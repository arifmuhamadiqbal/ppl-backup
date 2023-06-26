import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize

const Orders = db.define(
    "orders", {
        id_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: false
    }
)

export default Orders;

(async() => {
    await db.sync();
});