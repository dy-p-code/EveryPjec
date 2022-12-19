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
        nickname: e.nickname,
        image: e.image,
        comment: e.comment,
        createdAt: e.createdAt,
        updateAt: e.updateAt,
      };
    });
  };

  createComment = async (postId, userId, comment) => {
    console.log(postId, userId, comment);
    const created = await this.commentRepository.createComment(
      postId,
      userId,
      comment
    );
    return created;
  };

  updateComment = async (userId, commentId, comment) => {
    const update = await this.commentRepository.updateComment(
      userId,
      commentId,
      comment
    );
    return update;
  };

  deleteComment = async (commentId, userId) => {
    const del = await this.commentRepository.deleteComment(commentId, userId);

    return del;
  };
}
module.exports = CommentService;
