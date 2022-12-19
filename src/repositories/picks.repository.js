const { Picks, Posts, Users } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

const { Op } = require('sequelize');

class PicksRepository extends Picks {
  constructor() {
    super();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   **/

  //
  getAllPick = async ({}) => {
    try {
      return (pick = await Picks.findAll({
        where: {
          [Op.or]: [{ postId }],
        },
        include: [Users, Posts],
      }));
    } catch (error) {
      throw error;
    }
  };

  //
  findPick = async ({ userId, postId }) => {
    try {
      return (pick = await Picks.findone({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
      }));
    } catch (error) {
      throw error;
    }
  };

  //
  createPick = async ({ userId, postId }) => {
    try {
      return (pick = await Picks.create({
        userId,
        postId,
      }));
    } catch (error) {
      throw error;
    }
  };

  //
  deletePick = async ({ userId, postId }) => {
    try {
      return (pick = await Picks.destroy({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
        userId,
        postId,
      }));
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PicksRepository;
