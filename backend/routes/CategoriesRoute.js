import express from "express";
import { AddCategory, deleteCategory, getCategories } from "../controller/CategoriesController.js";

const categoriesRoute = express.Router()

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post("/menus/addCategory", AddCategory);
categoriesRoute.delete("/menus/addCategory/delete/:id_category", deleteCategory);

export default categoriesRoute;