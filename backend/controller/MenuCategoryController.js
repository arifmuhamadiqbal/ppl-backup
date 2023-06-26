import MenuCategory from "../model/MenuCategory.js";

// add menu category
export const addMenuCategory = async (req, res) => {
    const {FKid_menu, FKid_category} = req.body;
    try {
        let response = await MenuCategory.create({
            categoryIdCategory: FKid_category,
            menuIdMenu: FKid_menu
        })
        if (!response) return res.status(404).json({msg: "Failed add menu category"})
        res.status(200).json({msg: "Success add menu category"})
    } catch (error) {
        console.log(error.message);
    }
}

// get menu category by id
export const getMenuCategoryById = async (req, res) => {
    const id = req.params.id_menu
    try {
        let response = await MenuCategory.findOne({
            where: {
                menuIdMenu: id
            }
        });
        if (!response) return res.status(404).json({msg: "Data not found !"})
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}