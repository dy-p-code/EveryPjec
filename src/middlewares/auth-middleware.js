const { Users } = require('../models');
require('dotenv').config();
const env = process.env;
const jwt = require('jsonwebtoken');
const UserService = require("../services/users.service.js");
const { AuthenticationError } = require("../exceptions/index.exception");

const validateToken = function (tokenType, tokenValue) {
  try {
      if (tokenType !== 'Bearer') {
          throw new AuthenticationError('전달된 쿠키에서 오류가 발생하였습니다.');
      }
      jwt.verify(tokenValue, env.SECRET_KEY);
      return true;
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
    let [tokenType, accessToken, ...refreshtoken] = token.split('%');
    const [ refreshToken ] = refreshtoken;
    // accessToken 만료 - 재발급
    if (!validateToken(tokenType, accessToken)) {
      if (!validateToken(tokenType, refreshToken)) {
          throw new AuthenticationError(
            'Token이 모두 만료되었습니다. 로그인 후 이용 가능합니다.',419)
      };
      const findUser = await Users.findOne({
          where: {refreshToken},
          attributes: ['userId']
      });
      if (!findUser) {
        throw new AuthenticationError(
            'Refresh Token의 정보가 서버에 존재하지 않습니다.',404
      )};

      const newAccessToken = jwt.sign({ userId: findUser.userId }, 
        env.SECRET_KEY, { expiresIn: '5s' });
      return res
        .status(200)
        .json({
          message: 'Token이 정상적으로 재발급되었습니다.',
          authorization: 'Bearer%' + newAccessToken 
        })
    }else {
      // 토큰 유효성 검증
      const { userId } = jwt.verify(accessToken, env.SECRET_KEY);
      res.locals.userId = userId;
    }
    next();
  } catch (error) {
    next(error);
  }
};