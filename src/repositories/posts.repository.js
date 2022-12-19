const { Posts, Users } = require('../models');
class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }
  findAllPost = async () => {
    const Posts = await this.postsModel.findAll({
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
  //posts와 user를 조인
  findPostById = async (postId) => {
    const Post = await this.postsModel.findOne({
      include: [
        {
          model: Users, // join할 모델
          attributes: ['nickname', 'image'], // select해서 표시할 필드 지정
          where: { postId },
        },
      ],
    });

    return Post;
  };

  createPost = async (
    userId,
    title,
    content,
    division,
    onoff,
    period,
    stack,
    startDate,
    contact
  ) => {
    const createPostData = await this.postsModel.create({
      userId,
      title,
      content,
      division,
      onoff,
      period,
      stack,
      startDate,
      contact,
    });

    return createPostData;
  };

  updatePost = async (
    postId,
    title,
    content,
    division,
    onoff,
    period,
    stack,
    startDate,
    contact
  ) => {
    const updatePostData = await this.postsModel.update(
      { title, content, division, onoff, period, stack, startDate, contact },
      { where: { postId } }
    );

    return updatePostData;
  };

  deletePost = async (postId) => {
    const deletePostData = await this.postsModel.destroy({ where: { postId } });

    return deletePostData;
  };
}

module.exports = PostRepository;
