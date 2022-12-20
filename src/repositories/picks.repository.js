const { Picks, Posts, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

const { Op } = require('sequelize');
const { cloneElement } = require('react');

class PicksRepository extends Picks {
  constructor() {
    super();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  // 찜하기 불러오기
  getAllPick = async ({}) => {
    try {
      const pick = await Picks.findAll({
        attributes: ['userId'],
        where: { postId: 'postId' },
        order: [['createdAt']],
      });
      return pick;
    } catch (error) {
      throw error;
    }
  };

  // 찜하기 찾기
  findPick = async ({ userId, postId }) => {
    try {
      const pick = await Picks.findOne({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
      });
      return pick;
    } catch (error) {
      throw error;
    }
  };

  // 찜하기 등록
  createPick = async ({ postId, userId }) => {
    try {
      const pick = await Picks.create({
        userId,
        postId,
      });
      return pick;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // 찜하기 삭제
  deletePick = async ({ userId, postId }) => {
    try {
      const pick = await Picks.destroy({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
        userId,
        postId,
      });
      return pick;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = PicksRepository;
