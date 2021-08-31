const db = require("../models");
const User = db.users;
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ where : { email: email.toLowerCase() } });
        if (user) {
            return res.status(401).send({ error: 'Email address already in use' })
        }
        const created = await User.create({
            name: name,
            email: email,
            password: password
        });
        const payload = { userID: created.id };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn : "2d" },
            (err, token) => {
                if (err) { throw err; }
                res.status(200).json(token);
            }
        );
        return res.status(200).send({ message: 'User successfully created' })
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ where: { email: email, password: password } });
        if (!user) {
            return res.status(401).send({ error: "Invalid Credentials" })
        }
        const payload = { userID: user.id };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn : "2d" },
            (err, token) => {
                if (err) { throw err; }
                res.status(200).json({ token: token, user: user });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error'); 
    }
}