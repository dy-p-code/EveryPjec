const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js')
const UserController = require('../controllers/users.controller.js');
const userController = new UserController

// 회원 생성
router.post('/signup', userController.signUp);

// 로그인
router.post('/login', userController.login);

// 로그아웃
router.put('/logout', authMiddleware, userController.logout);

// 아이디 중복 검사
router.get('/signup/id', userController.idcheck);

// 닉네임 중복 검사
router.get('/signup/nickname', userController.nicknamecheck);

// 프로필 변경하기
router.put('/image', authMiddleware, userController.imageupdate);

// 닉네임 변경하기
router.put('/nick', authMiddleware, userController.nickupdate);

// 기술스택 변경하기
router.put('/stack', authMiddleware, userController.stackupdate);

// 마이페이지
router.get('/mypage', authMiddleware, userController.mypage);

// 회원 탈퇴
router.delete('/secession', authMiddleware, userController.secession);

// 알람 기능
router.get('/alert', authMiddleware, userController.alert);

module.exports = router;