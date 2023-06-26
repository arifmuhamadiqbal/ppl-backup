import express from "express";
import multer from "multer";
import { addMenu, deleteMenuById, getAllMenu, getMenuById, updateMenu } from "../controller/MenuController.js";

// multer configuration
let formatName = new Date().toISOString().slice(0, 10);
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, callback) {
    callback(null, formatName + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");
// end multer configuratio

const menusRoute = express.Router();

menusRoute.get("/menus", getAllMenu);
menusRoute.get("/menus/update/:id_menu", getMenuById);
menusRoute.put("/menus/update/:id_menu", upload, updateMenu);
menusRoute.delete("/menus/delete/:id_menu", deleteMenuById);
menusRoute.post("/menus/addMenu", upload, addMenu);

export default menusRoute;