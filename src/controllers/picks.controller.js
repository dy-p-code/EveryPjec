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

  //
  getAllPick = async (req, res, next) => {
    try {
      const picks = await this.picksService.getAllPick({});

      res.status(200).json({ data: picks });
    } catch (error) {
      next(error);
    }
  };

  //
  createPick = async (req, res, next) => {
    try {
      const { userId, postId } = req.params;

      if (!postId || userId) {
        throw new InvalidParamsError('찜하기 실패!');
      }

      const pick = await this.picksService.createPick({
        postId,
        userId,
      });

      res.status(200).json({ message: '찜하기 성공!' });
    } catch (error) {
      next(error);
    }
  };

  //
  deletePick = async (req, res, next) => {
    try {
      const { userId, postId } = req.params;

      if (!postId || userId) {
        throw new InvalidParamsError('찜하기 실패!');
      }

      const pick = await this.picksService.deletePick({
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
