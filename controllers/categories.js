const {Model} = require('../models/categories');

const getCategories = async (req, res) => {
    try {
        const categories = await Model.find();
        if(categories == null){
            return res.status(404).json({message : 'Categories not found'})
        }

        return res.json(categories);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const getCategoryById = async(req, res) => {
    const {id} = req.params;
    let category;

    try {
        category = await Model.findById(id);
        if(category == null) {
            return res.status(404).json({message : 'Category not found'})
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const addCategory = async (req, res) => {
    const {name} = req.body;
    const category = new Model({
        name
    })
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await Model.findById(id);
        await category.remove();

        res.json({message : "Note deleted succesfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const category = await Model.findById(id);
        category.name = name;
        const newCategory = await category.save();
        res.json(newCategory);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {
    getCategories,
    addCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
}