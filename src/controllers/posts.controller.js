const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  //게시글 생성
  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const {
        title,
        content,
        division,
        onoff,
        period,
        stack,
        startDate,
        contact,
      } = req.body;

      await this.postService.createPost(
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
      res.status(200).send({ message: '게시글 작성 완료' });
    } catch (error) {
      res.status(400).send({ message: '게시글 작성 실패' });
      next(error);
    }
  };

  //게시글 조회
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();

      res.status(200).json({ postList: posts });
    } catch (error) {
      res.status(400).send({ message: '게시글 조회 실패' });
      next(error);
    }
  };

  //게시글 상세조회
  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);

      res.status(200).json({ postOne: post });
    } catch (error) {
      res.status(400).send({ message: '게시글 상세 조회 실패' });
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const {
        title,
        content,
        division,
        onoff,
        period,
        stack,
        startDate,
        contact,
      } = req.body;

      await this.postService.updatePost(
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
      res.status(200).json({ message: '게시글 수정 완료' });
    } catch (error) {
      res.status(400).send({ message: '게시글 수정 실패' });
      next(error);
    }
  };
  //게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      await this.postService.deletePost(postId);

      res.status(200).json({ message: '게시글 삭제 완료' });
    } catch (error) {
      res.status(400).send({ message: '게시글 삭제 실패' });
      next(error);
    }
  };
}

module.exports = PostsController;