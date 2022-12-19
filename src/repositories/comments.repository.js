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
      order: [['updatedAt', 'desc']],
    });
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

  updateComment = async (commentId, comment) => {
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
