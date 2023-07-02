import { Sequelize } from "sequelize";

const db = new Sequelize (
    "sql12628549",
    "sql12628549",
    "8g9ycMYZSs",
    {
        host: "sql12.freesqldatabase.com",
        port: "3306",
        dialect: "mysql"
    }
);


// const db = new Sequelize(
//     "cafe",
//     "root",
//     "",
//     {
//         host: "localhost",
//         dialect: "mysql",
//         port: "3306"
//     }
// );


export default db;