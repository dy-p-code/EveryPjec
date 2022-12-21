const { ValidationError } = require('../exceptions/index.exception');
const CommentRepository = require('../repositories/comments.repository');
const { Comments } = require('../models');

class CommentService {
  commentRepository = new CommentRepository(Comments);

  findAllComment = async (postId) => {
    const All = await this.commentRepository.findAllComment(postId);
    return All.map((e) => {
      return {
        commentId: e.commentId,
        postId: e.postId,
        userId: e.userId,
        nickname: e['User.nickname'],
        image: e['User.image'],
        comment: e.comment,
        createdAt: e.createdAt,
        updateAt: e.updateAt,
      };
    });
  };

  createComment = async (postId, userId, comment) => {
    const created = await this.commentRepository.createComment(
      postId,
      userId,
      comment
    );
    return created;
  };

  updateComment = async (userId, commentId, comment) => {
    const exist = await this.commentRepository.findCommentOne(commentId);
    if (!exist) {
      throw new ValidationError('댓글을 찾을 수 없습니다.', 404);
    } else if (exist.userId !== userId) {
      throw new ValidationError('권한이 없습니다.', 401);
    }

    const update = await this.commentRepository.updateComment(
      userId,
      commentId,
      comment
    );
    return update;
  };

  deleteComment = async (commentId, userId) => {
    const exist = await this.commentRepository.findCommentOne(commentId);
    if (!exist) {
      throw new ValidationError('댓글을 찾을 수 없습니다.', 404);
    } else if (exist.userId !== userId) {
      throw new ValidationError('권한이 없습니다.', 401);
    }

    const del = await this.commentRepository.deleteComment(commentId);

    return del;
  };
}
module.exports = CommentService;