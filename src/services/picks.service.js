const PicksRepository = require('../repositories/picks.repository');
const { Op } = require('sequelize');

class PicksService {
  constructor() {
    this.picksRepository = new PicksRepository();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 찜하기 불러오기
  getAllPick = async ({}) => {
    try {
      const pick = await this.picksRepository.getAllPick({});
      return pick;
    } catch (error) {
      throw error;
    }
  };

  // 찜하기 등록
  createPick = async ({ postId, userId }) => {
    try {
      // const existPick = await this.picksRepository.getAllPick({
      //   postId,
      //   userId,
      // });
      // if (existPick) {
      //   throw new ValidationError('이미 찜 되어있습니다.');
      // }

      const pick = await this.picksRepository.createPick({
        postId,
        userId,
      });
      return pick;
    } catch (error) {
      throw error;
    }
  };

  // 찜하기 삭제
  deletePick = async ({ userId, postId }) => {
    try {
      const pick = await this.picksRepository.deletePick({
        postId,
        userId,
      });
      return pick;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PicksService;
