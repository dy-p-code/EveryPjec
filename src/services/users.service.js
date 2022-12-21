const UserRepository = require('../repositories/users.repository.js');
const { ValidationError, AuthenticationError } = require('../exceptions/index.exception');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  signUp = async (loginId, nickname, password, image) => {
    const pw_hash = crypto
      .createHash(env.HASH)
      .update(password)
      .digest(env.DIGEST);
    let value = 'loginId ' + loginId;
    const findUser = await this.userRepository.findUser(value);
    value = 'nickname ' + nickname;
    const findNick = await this.userRepository.findUser(value);
    if (findUser) {
      throw new ValidationError('중복된 아이디입니다.', 412);
    }
    if (findNick) {
      throw new ValidationError('중복된 닉네임입니다.', 412);
    }
    await this.userRepository.signUp(loginId, nickname, pw_hash, image);
    return;
  };

  login = async (loginId, password) => {
    const pw_hash = crypto
      .createHash(env.HASH)
      .update(password)
      .digest(env.DIGEST);

    let value = 'loginId ' + loginId;
    const findUser = await this.userRepository.findUser(value);
    if (!findUser || findUser.password !== pw_hash) {
      throw new ValidationError('닉네임 또는 패스워드를 확인해주세요.', 412);
    } else {
      let token = jwt.sign({ userId: findUser.userId }, env.SECRET_KEY, {
        expiresIn: '1h',
      });
      let value = 'create ' + findUser.userId;
      const refreshToken = await this.userRepository.refreshToken(value);
      token = token + '%' + refreshToken;
      return token;
    }
  };

  reissue = async(tokenType, refreshToken) => {
    const validateToken = function (tokenType, tokenValue) {
      try {
          if (tokenType !== 'Bearer') {
              throw new AuthenticationError('전달된 토큰에서 오류가 발생하였습니다.', 401);
          }
          jwt.verify(tokenValue, env.SECRET_KEY);
          return true;
      } catch (error) {
          return false;
      }
    };
    if (!validateToken(tokenType, refreshToken)) {
      throw new AuthenticationError(
        'Token이 모두 만료되었습니다. 다시 로그인해주세요.',401);
    };
    let value = 'valid ' + refreshToken;
    const validRefreshToken = await this.userRepository.refreshToken(value);
    if(!validRefreshToken) {
      throw new ValidationError('로그인 정보가 유효하지 않습니다.', 401);
    }else{
      const accessToken = jwt.sign({ 
        userId: validRefreshToken.userId},
        env.SECRET_KEY, 
        { expiresIn: '1h'});
      const token = accessToken + '%' + refreshToken;
      return token;
    }
  };

  logout = async (userId) => {
    const result = await this.userRepository.deleteRefreshToken(userId);
    return result;
  };

  check = async (value) => {
    const result = await this.userRepository.findUser(value);
    return result;
  };

  update = async (userId, value) => {
    const result = await this.userRepository.update(userId, value);
    return result;
  };

  secession = async (userId) => {
    const result = await this.userRepository.secession(userId);
    if(result){
      return true;
    }else{
      return null;
    }
  };

  alert = async (userId) => {
    const result = await this.userRepository.alert(userId);
    return result.map((e) => {
      return { 
        message: `작성한 ${e['Post.title'].slice(0,10)}...글에 댓글이 등록되었습니다.`}
    });
  }
}

module.exports = UserService;
