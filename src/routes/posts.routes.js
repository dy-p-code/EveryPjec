const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// 게시글 생성
router.post('/', postsController.createPost);
// 게시글 수정
router.put('/:postId', postsController.updatePost);
// 게시글 삭제
router.delete('/:postId', postsController.deletePost);
// 게시글 조회
router.get('/', postsController.getPosts);
// 게시글 상세조회
router.get('/:postId', postsController.getPostById);
module.exports = router;
