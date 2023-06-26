import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Orders from "./OrdersModel.js";
import OrderMenus from "./OrderMenusModel.js";

const { DataTypes } = Sequelize;

const Menus = db.define(
    "menus", {
        id_menu: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name_menu: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.TEXT,
        }
    }, {
        timestamps: false,
    }
);


Menus.belongsToMany(Orders, {through: OrderMenus})
Orders.belongsToMany(Menus, {through: OrderMenus})

export default Menus;

(async() => {
    await db.sync();
});