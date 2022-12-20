const PostRepository = require('../repositories/posts.repository');
const { Posts, Users } = require('../models');
class PostService {
  postRepository = new PostRepository(Posts);

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost({});

    return allPost.map((e) => {
      return {
        postId: e.postId,
        userId: e.userId,
        nickname: e['User.nickname'],
        image: e['User.image'],
        title: e.title,
        content: e.content,
        division: e.division,
        onoff: e.onoff,
        period: e.period,
        stack: e.stack,
        startDate: e.startDate,
        contact: e.contact,
        createdAt: e.createdAt,
        updateAt: e.updateAt,
      };
    });
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostOne(postId);
    return {
      postId: findPost.postId,
      userId: findPost.userId,
      nickname: findPost['User.nickname'],
      image: findPost['User.image'],
      title: findPost.title,
      content: findPost.content,
      division: findPost.division,
      onoff: findPost.onoff,
      period: findPost.period,
      stack: findPost.stack,
      startDate: findPost.startDate,
      contact: findPost.contact,
      createdAt: findPost.createdAt,
      updateAt: findPost.updateAt,
    };
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
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content,
      division,
      onoff,
      period,
      stack,
      startDate,
      contact
    );
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
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");
    const upPost = await this.postRepository.updatePost(
      postId,
      title,
      content,
      division,
      onoff,
      period,
      stack,
      startDate,
      contact
    );

    return upPost;
  };

  deletePost = async (postId) => {
    // const findPost = await this.postRepository.findPostById(postId);
    // if (!findPost) throw new Error("Post doesn't exist");
    const del = await this.postRepository.deletePost(postId);

    return del;
  };
}

module.exports = PostService;
