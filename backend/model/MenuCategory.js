import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize

const MenuCategory = db.define(
    "menucategory", {
        id_menu_category: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
        timestamps: false
    }
)

export default MenuCategory;

(async() => {
    await db.sync();
});