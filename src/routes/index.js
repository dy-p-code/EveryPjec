const express = require('express');
const router = express.Router();
const UserRouter = require('./user.js');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const picksRouter = require('./picks');

router.use('/user', UserRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/picks', picksRouter);

module.exports = router;
