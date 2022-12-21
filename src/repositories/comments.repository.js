const { Users, sequelize } = require('../models');
class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }
  findAllComment = async (postId) => {
    const Posts = await this.commentsModel.findAll({
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ['nickname', 'image'],
        },
      ],
      raw: true,
      order: [['updatedAt', 'desc']],
    });
    console.log(Posts);
    return Posts;
  };

  createComment = async (postId, userId, comment) => {
    const createPostData = await this.commentsModel.create({
      postId,
      userId,
      comment,
    });
    console.log(createPostData);

    return createPostData;
  };

  updateComment = async (userId, commentId, comment) => {
    const updatePostData = await this.commentsModel.update(
      { comment },
      { where: { commentId, userId } }
    );
    return updatePostData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await this.commentsModel.destroy({
      where: { commentId },
    });
    return deleteCommentData;
  };
  findCommentOne = async (commentId) => {
    const exist = await this.commentsModel.findOne({
      where: { commentId },
      raw: true,
    });
    return exist;
  };
}

module.exports = CommentRepository;