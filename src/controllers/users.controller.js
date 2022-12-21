const UserService = require('../services/users.service.js')
// 에러 핸들러
const { ValidationError } = require("../exceptions/index.exception");
// 쿼리 스트링
const url = require('url');

class UserController {
  constructor () {
    this.userService = new UserService();
  }
  signUp = async (req, res, next) => {
    try {
        const { loginId, nickname, password, pwconfirm, image } = req.body;
        const IDCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,}$/;
        if (!IDCheck.test(loginId) ||
           (loginId.length < 4 || loginId > 12)) {
                throw new ValidationError('아이디의 형식이 일치하지 않습니다.', 412);
        }
        if (nickname.length < 4 || nickname.length > 12) {
            throw new ValidationError('닉네임 형식이 일치하지 않습니다.', 412);
        }
        if (password !== pwconfirm) {
            throw new ValidationError('패스워드가 패스워드 확인란과 다릅니다.', 412);
        }
        if (password.length < 4 || password.length > 12) {
            throw new ValidationError('패스워드 형식이 일치하지 않습니다.', 412);
        }
        if (password.indexOf(loginId) !== -1) {
            throw new ValidationError('패스워드에 아이디가 포함되어 있습니다.', 412);
        }
        await this.userService.signUp(
            loginId,
            nickname,
            password,
            image
        );
        return res.status(201).json({ message: `회원 가입에 성공하였습니다.` });
    }catch(error) {
        next(error);
    }
  }

  login = async (req, res, next) => {
    try {
        const { loginId, password } = req.body;
        const token = await this.userService.login(loginId, password);
        return res
          .status(200)
          .json({ 
            message: 'Token이 정상적으로 발급되었습니다.',
            authorization: 'Bearer%' + token
         });
    } catch (error) {
        next(error);
    }
  }

  reissuance = async (req, res, next) => {
    try{
        const token = req.headers['authorization'];
        if (!token) {
        throw new AuthenticationError();
        }
        let [tokenType, , refreshToken] = token.split('%');
        const tokenReissuance = await this.userService.reissue(tokenType, refreshToken);
        if(tokenReissuance){
            return res
              .status(200)
              .json({
                message: "Token이 정상적으로 재발급되었습니다.",
                authorization: 'Bearer%' + tokenReissuance
              })
        };
    }catch(error){
        next(error);
    }
  }

  logout = async (req, res, next) => {
    try{
        const { userId } = res.locals;
        const result = await this.userService.logout(userId);
        if(result){
            return res
              .status(200)
              .json({
                message: '로그 아웃 되었습니다.'
              })
        }else {
            throw error;
        }
    }catch(error){
        next(error);
    }
  }

  idcheck = async (req, res, next) => {
    try {
        const queryDate = url.parse(req.url, true).query;
        const { id } = queryDate;
        const loginId = id;
        const IDCheck = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{3,}$/;
        if (!IDCheck.test(loginId) ||
           (loginId.length < 4 || loginId.length > 12)) {
            throw new ValidationError('닉네임 형식이 일치하지 않습니다.', 412);
        }
        const value = "loginId "+ loginId;
        const IdCheck = await this.userService.check(value);
        if(IdCheck) {
            throw new ValidationError('중복된 아이디입니다.', 412);
        }else {
            return res
            .status(200)
            .json({ 
                result: true,
                message: '사용할 수 있는 아이디입니다.'
            });
        }
    }catch(error) {
        next(error);
    }
  }

  nicknamecheck = async (req, res, next) => {
    try {
        const queryDate = url.parse(req.url, true).query;
        const { nickname } = queryDate;
        if (nickname.length < 4 || nickname.length > 12) {
            throw new ValidationError('닉네임 형식이 일치하지 않습니다.', 412);
        }
        const value = "nickname " + nickname;
        const nickCheck = await this.userService.check(value);
        if(nickCheck) {
            throw new ValidationError('중복된 닉네임입니다.', 412);
        }else {
            return res
            .status(200)
            .json({ 
                result: true,
                message: '사용할 수 있는 닉네임입니다.'
            });
        }
    }catch(error) {
        next(error);
    }
  }

  mypage = async (req, res, next) => {
    try {
        const { userId } = res.locals;
        const value = "userId "+ userId;
        const user = await this.userService.check(value);
        if(!user) {
            return res
              .status(400)
              .json({ errorMessage: "userId가 잘못되었습니다."});
        }
        let { nickname, image, loginId, createdAt, stack } = user;
        return res
          .status(200)
          .json({
                userId: userId,
                nickname: nickname,
                image: image,
                loginId: loginId,
                createdAt: createdAt.toLocaleDateString(),
                stack: stack
          });
    }catch(error) {
        next(error);
    }
  }

  imageupdate = async (req, res, next) => {
    try {
        const { userId } = res.locals;
        const { image } = req.body;
        const value = "image " + image;
        const updateimage = await this.userService.update(userId, value);
        return res
          .status(200)
          .json({ result: true });
    }catch(error){
        next(error);
    }
  }

  nickupdate = async (req, res, next) => {
    try {
        const { userId } = res.locals;
        const { nickname } = req.body;
        if (nickname.length < 4 || nickname.length > 12) {
            throw new ValidationError('닉네임 형식이 일치하지 않습니다.', 412);
        }
        const value = "nickname " + nickname;
        const findnick = await this.userService.check(value);
        if(findnick){
            throw new ValidationError('중복된 닉네임입니다.', 412);
        }else {
            const updatenick = await this.userService.update(userId, value);
            return res
              .status(200)
              .json({ result: true });
        }
    }catch(error){
        next(error);
    }
  }

  stackupdate = async (req, res, next) => {
    try {
        const { userId } = res.locals;
        const { stack } = req.body;
        const value = "stack " + stack;
        const updatestack = await this.userService.update(userId, value);
        return res
          .status(200)
          .json({ result: true });
    }catch(error){
        next(error);
    }
  }

  secession = async (req, res, next) => {
    try{
        const { userId }= res.locals;
        const resultSecession = await this.userService.secession(userId);
        if(resultSecession){
            return res
              .status(200)
              .json({ result: true });
        }
    }catch(error){
        next(error);
    }
  }

  alert = async (req, res, next) => {
    try{
        const { userId } = res.locals;
        const alerts = await this.userService.alert(userId);
        return res
          .status(200)
          .json({ alerts })
    }catch(error){
        next(error);
    }
  }

  alertdelete = async (req, res, next) => {
    try{
      console.log(req.params);
      const { alertId } = req.params;
      console.log(alertId);
      const result = await this.userService.alertdelete(alertId);
      if(result){
        return res
        .status(200)
        .json({ message: true })
      }
    }catch(error){
      next(error);
    }
  }
}

module.exports = UserController