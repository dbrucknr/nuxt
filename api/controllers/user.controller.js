const db = require("../models");
const User = db.users;

exports.search = async (req, res) => {
    try {
        const { searchText } = req.params;

        if (searchText.length === 0) { return };
        const results = await User.findAll({ name: { $regex: searchText, $options: "i" } });
        return res.json(results)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const update = await User.update(req.body, { where: { id: id } });
        update[0] === 1 
            ? res.json({ message: 'User successfully updated' }) 
            : res.status(500).send({ error: 'Unable to update user' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.delete({ where: { id: id } });
        deleted[0] === 1 
            ? res.json({ message: 'User successfully deleted' }) 
            : res.status(500).send({ error: 'Unable to delete user' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.deleteAll = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: {}, truncate: false });
        deleted.length 
            ? res.send({ message: `${ deleted.length } Users were deleted successfully` })
            : res.status(500).send({ error: "Unable to delete all users" });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        return res.send(user)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
}

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        return res.json(users)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}
