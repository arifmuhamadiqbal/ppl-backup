import express from "express"
import { addMenuCategory, getMenuCategoryById } from "../controller/MenuCategoryController.js";

const menuCategoryRoute = express.Router();

menuCategoryRoute.post("/addMenuCategory", addMenuCategory);
menuCategoryRoute.get("/menus/update/menuCategory/:id_menu", getMenuCategoryById);

export default menuCategoryRoute;