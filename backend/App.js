import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import menusRoute from "./routes/MenuRoute.js";
import categoriesRoute from "./routes/CategoriesRoute.js";
import menuCategoryRoute from "./routes/MenuCategoryRoute.js";
import orderRoute from "./routes/OrderRoute.js";

const port = 5000;
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(menusRoute)
app.use(categoriesRoute)
app.use(menuCategoryRoute)
app.use(orderRoute)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

db.authenticate().then(() => {
    console.log("Database connected !");
}).catch(err => {
    console.log(`Unable to connect : ${err}`);
})