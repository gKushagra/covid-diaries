const express = require("express");
const router = express.Router();

const postsController = require("./../controllers/posts");

router.get("/", postsController.get_all_posts);

router.get("/:username", postsController.get_single_post);

router.post("/", postsController.post_post);

module.exports = router;
