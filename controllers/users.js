const Model = require('../models/users');

const getUsers = async (req, res) =>{
    try {
        const users = await Model.find();
        if(users == null){
            return res.status(404).json({message : 'Users not found'});
        }

        return res.json(users);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await Model.findById(id);
        if(user == null) return res.status(404).json({message : 'User not found'});

        return res.json(user);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const addUser = async (req, res) => {
    const {name, email, password} = req.body;
    const user = new Model({
        name,
        email,
        password,
        courses : []
    })

    try {
        const newUser = await user.save();
        return res.json(newUser);
    } catch (error) {
        return res.status(400).json({message : error.message});
    }
}

const updateUser = async (req, res) => {
    const {name, email, password} = req.body;
    const {id} = req.params;
    try {
        const user = await Model.findById(id);
        if(name != null) user.name = name;
        if(email != null) user.email = email;
        if(password != null) user.password = password;

        const updatedUser = await user.save();
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await Model.findById(id);
        await user.remove();

        return res.json({message : 'User deleted successfully'});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}