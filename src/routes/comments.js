const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/:postId', authMiddleware, commentsController.createComment);

router.get('/:postId', commentsController.getComment);

router.put('/:commentId', authMiddleware, commentsController.updateComment);
router.delete('/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;
