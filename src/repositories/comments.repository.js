const { Users, sequelize, Alerts, Posts } = require('../models');
class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }
  findAllComment = async () => {
    const Posts = await this.commentsModel.findAll({
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
    const valid = await this.Posts.findOne({
      where: {postId},
      raw: true,
      attributes: ['userId']
    });
    // 자신이 쓴 글의 자신의 댓글은 알람이 가지 않음
    if(valid !== userId) {
      const createAlert = await this.Alerts.create({
        postId,
        userId,
      })
      console.log(createAlert);
    }
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

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await this.commentsModel.destroy({
      where: {
        commentId,
        userId,
      },
    });

    return deleteCommentData;
  };
}

module.exports = CommentRepository;
