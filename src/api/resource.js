import http from './request.js'

let path = {
    authCode: 'operator/getAuthCode',  //验证码
    getUserPermission: 'operator/getUserPermission',  //用户权限
    login: 'operator/login',  //用户登录
    loginOut: 'operator/logout',  //退出登录
    updatePass: 'operator/updatePassword',  //用户修改密码
	getUserInfo: 'operator/info',  //获取用户信息
	updateUserInfo: 'operator/editInfo',  //修改用户信息
}
export default{
    authCode(params){
        return http.get(path.authCode, params)
    },
    userPermission(params){
        return http.get(path.getUserPermission, params)
    },
    login(params){
        return http.post(path.login, params)
    },
    loginOut(params){
        return http.get(path.loginOut, params)
    },
    updatePass(params){
        return http.post(path.updatePass, params)
    },
    getUserInfo(params){
        return http.get(path.getUserInfo, params)
    },
    updateUserInfo(params){
        return http.get(path.updateUserInfo, params)
    }
}