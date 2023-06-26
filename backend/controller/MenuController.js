import Menus from "../model/MenuModel.js";
import Categories from "../model/CategoriesModel.js";
import MenuCategory from "../model/MenuCategory.js";

// get all menu
export const getAllMenu = async (_, res) => {
  try {
    const response = await Menus.findAll({
      include: {
        model: Categories,
        attributes: ["name_category"],
      },
    });
    if (!response) return res.status(404).json({ msg: "Data not found !" });
    res.status(200).json(response);
  } catch (error) {
    console.log(`Error because : ${error}`);
  }
};

// get menu by id
export const getMenuById = async (req, res) => {
  const id = req.params.id_menu;
  try {
    let response = await Menus.findOne({
      where: {
        id_menu: id,
      },
      include: {
        model: Categories,
        attributes: ["id_category"],
      },
    });
    if (!response) return res.status(404).json({ msg: "Data not found !" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const addMenu = async (req, res) => {
  let currentDate = new Date();
  let formatName = currentDate.toISOString().slice(0, 10);
  let inputName = req.body.menuName;
  let inputDescription = req.body.menuDescription;
  let inputPrice = req.body.menuPrice;
  let inputImage = formatName + "-" + req.body.fileName;

  try {
    const response = await Menus.create({
      name_menu: inputName,
      description: inputDescription,
      price: inputPrice,
      image: inputImage,
    });
    if (!response) return res.status(404).json({ msg: "No input data" });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// delete menu by id
export const deleteMenuById = async (req, res) => {
  const id = req.params.id_menu;
  try {
    await Menus.destroy({
      where: {
        id_menu: id,
      },
    });
    if (!id) return res.status(404).json({ msg: "No menu selected" });
    res.status(200).json({ msg: "Delete successful" });
  } catch (error) {
    console.log(error.message);
  }
  try {
    await MenuCategory.destroy({
      where: {
        menuIdMenu: id,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

// update menu by id
// export const updateMenu = async (req, res) => {
//   const { id_menu } = req.params;
//   const {
//     menuName = "test",
//     menuDescription = "test",
//     menuPrice = 1000,
//   } = req.body;

//   try {
//     let menu = await Menus.findByPk(id_menu);

//     if (!menu) {
//       return res.status(404).json({ msg: "Menu not found" });
//     }

//     const updatedMenu = await menu.update({
//       name_menu: menuName,
//       description: menuDescription,
//       price: menuPrice,
//     });

//     if (req.file) {
//       const path = req.file.path;
//       const cleanedPath = path.replace(/images[\/\\]/i, "");
//       updatedMenu.image = cleanedPath;
//       await updatedMenu.save();
//     }

//     res.status(200).json(updatedMenu);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

export const updateMenu = async (req, res) => {
  let id = req.params.id_menu;
  const { newName, newDescription, newPrice, newImage, newCategory } = req.body;

  let currentDate = new Date();
  let formatName = currentDate.toISOString().slice(0, 10);
  let inputName = newName;
  let inputDescription = newDescription;
  let inputPrice = newPrice;
  let inputCategory = newCategory;
  let inputImage = newImage ? formatName + "-" + newImage : newImage;

  try {
    const menu = await Menus.findByPk(id);
    if (!menu) {
      return res.status(404).json({ msg: "Menu not found" });
    }

    let updateData = {
      name_menu: inputName,
      description: inputDescription,
      price: inputPrice,
    };

    if (newImage) {
      updateData.image = inputImage;
    }

    await Menus.update(updateData, {
      where: {
        id_menu: menu.id_menu,
      },
    });

    if (inputCategory) {
      const category = await MenuCategory.findOne({
        where: {
          menuIdMenu: menu.id_menu,
        },
      });

      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }

      await MenuCategory.update(
        {
          categoryIdCategory: inputCategory,
        },
        {
          where: {
            menuIdMenu: menu.id_menu,
          },
        }
      );
    }

    res.status(200).json({ msg: "Update menu successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};