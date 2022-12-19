const express = require('express');
const router = express.Router();

const UserRouter = require('./user.js');
//const postsRouter = require('./posts');
//const likesRouter = require('./likes');
//const commentsRouter = require('./comments');

router.use('/user', UserRouter);
//router.use('/posts', postsRouter);
//router.use('/likes', likesRouter);
//router.use('/comments', commentsRouter);

module.exports = router;
