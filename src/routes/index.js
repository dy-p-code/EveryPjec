const express = require('express');
const router = express.Router();
const UserRouter = require('./user.js');
const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');

router.use('/user', UserRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);






module.exports = router;
