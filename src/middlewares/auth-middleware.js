const { Users } = require('../models');
require('dotenv').config();
const env = process.env;
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require("../exceptions/index.exception");

const validateToken = function (tokenType, tokenValue) {
  try {
      if (tokenType !== 'Bearer') {
          throw new AuthenticationError('전달된 토큰에서 오류가 발생하였습니다.', 401);
      }
      const { userId } = jwt.verify(tokenValue, env.SECRET_KEY);
      return userId;
  } catch (error) {
      return false;
  }
};

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      throw new AuthenticationError();
    }
    const [tokenType, accessToken] = token.split('%');
    // 토큰 유효성 검증
    const userId = validateToken(tokenType, accessToken);
    if (!userId) {
      throw new AuthenticationError(
        'AccessToken이 만료되었습니다. 재발급을 진행해주세요', 401);
    }
    res.locals.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};