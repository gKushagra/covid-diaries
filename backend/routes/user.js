const express = require("express");
const router = express.Router();
const checkAuth = require("./../middlewares/checkAuth");

const userController = require("./../controllers/user");

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.delete("/:username", checkAuth, userController.delete);

module.exports = router;
