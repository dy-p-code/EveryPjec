const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');

router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
module.exports = router;
