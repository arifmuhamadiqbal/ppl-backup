import Categories from "../model/CategoriesModel.js";

// get all categories
export const getCategories = async (req, res) => {
    try {
        const response = await Categories.findAll()
        if (!response) return res.status(404).json({msg: "Data not found"})
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

// add category
export const AddCategory = async (req, res) => {
    const inputCategory = req.body.newCategory
    try {
        const response = await Categories.create({
            name_category: inputCategory
        })
        if(!response) return res.status(404).json({msg: "Failed add category"})
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

// delete category by id
export const deleteCategory = async (req, res) => {
    const id = req.params.id_category;
    try {
        const response = await Categories.destroy({
            where: {
                id_category: id
            }
        });
        if (!response) return res.status(404).json({msg: "Failed delete category"});
        res.status(200).json({msg: "Facilities deleted !"});
    } catch (error) {
        console.log(error.message);
    }
};