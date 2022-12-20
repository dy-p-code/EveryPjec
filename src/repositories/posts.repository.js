const { Users, sequelize } = require('../models');

class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }
  findAllPost = async () => {
    const posts = await this.postsModel.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname', 'image'],
        },
      ],
      raw: true,
      order: [['updatedAt', 'desc']],
    });
    console.log('@@@@@@@', posts);
    return posts;
  };
  //posts와 user를 조인
  findPostOne = async (postId) => {
    const Post = await this.postsModel.findOne({
      where: { postId },
      raw: true,
      include: [
        {
          model: Users,
          attributes: ['nickname', 'image'],
        },
      ],
    });
    console.log(Post);

    return Post;
  };
  findPostById = async (postId) => {
    const Post = await this.postsModel.findByPk(postId);

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
