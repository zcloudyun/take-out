/*
  包含n个接口请求函数的模块
  函数的返回值：promise对象
*/

import ajax from "./ajax";
const baseurl='/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${baseurl}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(baseurl+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(baseurl+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => ajax(baseurl+'/search_shops', {geohash, keyword})
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(baseurl+'/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(baseurl+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(baseurl+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(baseurl+'/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(baseurl+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
