module.exports = app => {
    const authMiddleware = require('../middleware/auth.middleware');
    const users = require("../controllers/user.controller");
    const router = require("express").Router();

    // See specific user
    router.get("/:id", authMiddleware, users.findOne);

    // Search all users
    router.post("/search", authMiddleware, users.search)

    // See all users
    router.get("/", authMiddleware, users.findAll);
    
    // Update specifc user
    router.put("/:id", authMiddleware, users.update);
    // Delete specific user
    router.delete("/:id", authMiddleware, users.delete);
    // Delete all users
    router.delete("/", authMiddleware, users.deleteAll);

    app.use('/users', router);
}