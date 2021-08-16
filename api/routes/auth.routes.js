module.exports = app => {
    const auth = require("../controllers/auth.controller");
    const router = require("express").Router();

    // Create user / Signup
    router.post("/signup", auth.signup);
    // Login
    router.post("/login", auth.login);

    app.use('/auth', router);
}
