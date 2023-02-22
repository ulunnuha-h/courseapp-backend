const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const admins = await Admin.find();
        if(admins.some(admin => admin.name === name)){
            return res.status(400).json({message : 'Name has been used'})
        }

        if(admins.some(admin => admin.email === email)){
            return res.status(400).json({message : 'Email has been used'})
        }

        const encryptedPassword = await bcrypt.hash(password,10);
        const admin = new Admin({
            name,
            email,
            password : encryptedPassword
        })
        await admin.save();

        res.status(201).json({message : 'Admin created succesfully'});
    } catch (error) {
        return res.status(500).json({message :error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admins = await Admin.find();
        if(!admins.some(admin => admin.email === email)){
            return res.status(400).json({message : 'Email has not been registered'})
        }

        const admin = await Admin.findOne({email});
        if(await bcrypt.compare(password, admin.password) === false){
            return res.status(400).json({message : 'Password is incorrect'})
        }


        const payload = {
            name : admin.name,
            email : admin.email
        }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '30m'});

        return res.json({
            message : 'Login successfully',
            token
        })

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

module.exports = {
    register,
    login
}