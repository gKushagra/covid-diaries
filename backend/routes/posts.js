const express = require("express");
const router = express.Router();
const checkAuth = require("./../middlewares/checkAuth");

const postsController = require("./../controllers/posts");

router.get("/", postsController.get_all_posts);

router.get("/:username", checkAuth, postsController.get_single_post);

router.post("/", checkAuth, postsController.post_post);

module.exports = router;
