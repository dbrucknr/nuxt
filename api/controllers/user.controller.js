const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ where : { email: email.toLowerCase() } });
        if (user) {
            return res.status(401).send({ error: 'Email address already in use' })
        }
        await User.create({
            name: name,
            email: email,
            password: password
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}

exports.deleteAll = async (req, res) => {

}

exports.findAll = async (req, res) => {

}

exports.findOne = async (req, res) => {

}