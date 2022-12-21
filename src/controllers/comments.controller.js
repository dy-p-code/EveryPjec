const { post } = require('superagent');
const CommentService = require('../services/comments.service');

class CommentController {
  CommentService = new CommentService();

  //댓글 생성
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals;
      const { comment } = req.body;
      await this.CommentService.createComment(postId, userId, comment);
      res.status(200).json({ message: '댓글을 작성 완료' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ errorMessage: '댓글 작성 실패' });
      next(error);
    }
  };

  //댓글 조회
  getComment = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const commentList = await this.CommentService.findAllComment(postId);

      if (commentList.length) {
        res.status(200).json({ commentList });
      } else {
        return res
          .status(400)
          .json({ errorMessage: '댓글이 존재하지 않습니다.' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: '댓글 목록 조회 실패' });
      next(error);
    }
  };

  //게시글 수정
  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
      const { userId } = res.locals;

      await this.CommentService.updateComment(userId, commentId, comment);

      res.status(201).json({ message: '댓글을 수정 완료' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: '댓글 수정 실패' });
      next(error);
    }
  };

  //게시글 삭제
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals;
    try {
      await this.CommentService.deleteComment(commentId, userId);

      res.json({ message: '댓글을 삭제 완료' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: '댓글 삭제 실패' });
      next(error);
    }
  };
}

module.exports = CommentController;
