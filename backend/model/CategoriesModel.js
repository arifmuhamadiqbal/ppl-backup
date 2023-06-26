import db from "../config/Database.js";
import { Sequelize } from "sequelize";
import Menus from "./MenuModel.js";
import MenuCategory from "./MenuCategory.js";

const { DataTypes } = Sequelize

const Categories = db.define(
    "categories", {
        id_category: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_category: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false
    }
)

Categories.belongsToMany(Menus, {through: MenuCategory});
Menus.belongsToMany(Categories, {through: MenuCategory});

export default Categories;

(async() => {
    await db.sync();
});
