module.exports = app => {
    const users = require("../controllers/user.controller");
    const router = require("express").Router();

    // See specific user
    router.get("/:id", users.findOne);
    // See all users
    router.get("/", users.findAll);
    // Search all users
    router.get("/:searchText", users.search)
    // Update specifc user
    router.put("/:id", users.update);
    // Delete specific user
    router.delete("/:id", users.delete);
    // Delete all users
    router.delete("/", users.deleteAll);

    app.use('/users', router);
}