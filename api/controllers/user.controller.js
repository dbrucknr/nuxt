const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.search = async (req, res) => {
    console.log('in search')
    try {
        const { searchText } = req.body;

        if (searchText.length === 0) { return };
        const results = await User.findAll(
            { 
                where: { 
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${ searchText }%` } },
                        { email: { [Op.iLike]: `%${ searchText }%` } }
                    ] 
                },
                 attributes: { exclude: ['password'] }
            }
        );
        return res.json(results)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.update = async (req, res) => {
    console.log('update')
    try {
        const { id } = req.params;
        const { userID } = req;

        if (userID.toString() === id) {
            const update = await User.update(req.body, { where: { id: id } });
            return update[0] === 1 
                ? res.status(200).json({ message: 'User successfully updated' }) 
                : res.status(500).send({ error: 'Unable to update user' });
        } else {
            return res.status(401).send('Unauthorized')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req;
        if (userID.toString() === id) {
            const deleted = await User.delete({ where: { id: id } });
            return deleted[0] === 1 
                ? res.status(200).json({ message: 'User successfully deleted' }) 
                : res.status(500).send({ error: 'Unable to delete user' });
        } else {
            return res.status(401).send('Unauthorized')
        }
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
    console.log('findOne')
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
