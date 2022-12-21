const { Users, Alerts } = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const env = process.env;
        
class UserRepository {
    findUser = async (value) => {
        const [valueType, valuevalue] = value.split(" ");
        if(valueType === "loginId"){
            const loginId = valuevalue;
            const user = await Users.findOne({raw: true, where: {loginId}});
            return user
        }else if(valueType === "nickname"){
            const nickname = valuevalue;
            const user = await Users.findOne({where: {nickname}});
            return user
        }else if(valueType === "userId"){
            const userId = valuevalue;
            const user = await Users.findOne({raw: true, where: {userId}});
            return user
        }
    };

    signUp = async(loginId, nickname, password, image) => {
        const stack = null;
        await Users.create({loginId, password, nickname, image, stack});
    }

    refreshToken = async(value) => {
        const [valueType, valuevalue] = value.split(" ");
        if(valueType === "create"){
            const userId = valuevalue;
            const refreshToken = jwt.sign({}, env.SECRET_KEY, { expiresIn: '7D'});
            await Users.update({refreshToken}, {where: {userId}});
            return refreshToken;
        }
        if(valueType === "valid"){
            const refreshToken = valuevalue;
            const result = await Users.findOne({raw:true, where: {refreshToken}});
            return result;
        }
    }

    deleteRefreshToken = async(userId) => {
        const existUser = await Users.findOne({raw: true, where: {userId}});
        if(existUser) {
            const refreshToken = null;
            await Users.update({refreshToken}, {where: {userId}});
            return true;
        }else {
            return false;
        }
    }

    update = async(userId, value) => {
        const [valueType, valuevalue] = value.split(" ");
        if(valueType === "image"){
            const image = valuevalue;
            await Users.update({image}, {where: {userId}});
        }else if(valueType === "nickname"){
            const nickname = valuevalue;
            await Users.update({nickname}, {where: {userId}});
        }else if(valueType === "stack"){
            const stack = valuevalue;
            await Users.update({stack}, {where: {userId}});
        }
        return true;
    }

    secession = async(userId) => {
        const existUser = await Users.findOne({raw: true, where: {userId}});
        if(existUser) {
            await Users.destroy({where: {userId}});
            return true;
        }else {
            return false;
        }
    }

    alert = async(userId) => {
        const findAlert = await Alerts.findAll({raw: true, where: {userId}});

        return findAlert;
    }
}
module.exports = UserRepository;