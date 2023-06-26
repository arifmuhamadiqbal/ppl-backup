import Menus from "../model/MenuModel.js";
import OrderMenus from "../model/OrderMenusModel.js";
import Orders from "../model/OrdersModel.js";
import { Op } from 'sequelize';

// get all order
export const getOrders = async (req, res) => {
  try {
    let response = await Orders.findAll({
      include: [
        {
          model: Menus,
          attributes: ["name_menu"],
        },
      ],
      order: [["date", "DESC"]],
    });

    if (!response || response.length === 0) {
      return res.status(400).json({ msg: "Data not found!" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


// get today order
export const getTodayOrders = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Mengatur waktu menjadi 00:00:00.000

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1); // Menetapkan tanggal berikutnya

    let response = await Orders.findAll({
      where: {
        date: {
          [Op.gte]: currentDate,
          [Op.lt]: nextDate,
        },
      },
      include: [
        {
          model: Menus,
          attributes: ['name_menu'],
        },
      ],
    });

    if (!response || response.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Kesalahan server internal' });
  }
};

  
