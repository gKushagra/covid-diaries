const Post = require("./../models/post");

// Get all posts
exports.get_all_posts = (req, res, next) => {
  Post.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        posts: docs,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Get a Single post
exports.get_single_post = (req, res, next) => {
  const uname = req.params.username;
  Post.find({ username: uname })
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "Post not found.",
        });
      }
      res.status(200).json({
        posts: post,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Adding a new post
exports.post_post = (req, res, next) => {
  const post = new Post({
    username: req.body.username,
    text: req.body.text,
    date: req.body.date,
  });

  console.log(post);
  post
    .save()
    .then()
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );

  res.status(200).json({
    post: post,
  });
};
