const PicksService = require('../services/picks.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class PicksController {
  constructor() {
    this.picksService = new PicksService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 찜하기 불러오기
  getAllPick = async (req, res, next) => {
    try {
      const picks = await this.picksService.getAllPick({});

      res.status(200).json({ data: picks });
    } catch (error) {
      next(error);
    }
  };

  // 찜하기 등록
  createPick = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals;

      if (!userId) {
        throw new InvalidParamsError('찜하기 실패!');
      }

      await this.picksService.createPick({
        postId,
        userId,
      });

      res.status(200).json({ message: '찜하기 성공!' });
    } catch (error) {
      next(error);
    }
  };

  // 찜하기 삭제
  deletePick = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals;

      if (!userId) {
        throw new InvalidParamsError('찜하기 삭제 실패!');
      }

      await this.picksService.deletePick({
        postId,
        userId,
      });

      res.status(200).json({ message: '찜하기 삭제!' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PicksController;
