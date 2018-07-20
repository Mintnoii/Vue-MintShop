/*与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
/**
 * 获取地址信息(根据经纬度串)
 * 这个接口的经纬度参数是在url路径里的，没有query参数
 */
export const reqAddress = geohash => ajax(`/api/position/${geohash}`)
/**
 * 获取 msite 页面食品分类列表
 */
export const reqCategorys = () => ajax('/api/index_category')
/**
 * 获取 msite 商铺列表(根据query参数：经纬度)
 * 将经纬度两个数据作为一个参数对象传入
 * 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的reqPwdLogin接口
 */
export const reqShops = ({
  latitude,
  longitude
}) => ajax('/api/shops', {
  latitude,
  longitude
})
/**
 * 账号密码登录
 */
export const reqPwdLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')
/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax('/api/sendcode', {
  phone
})
/**
 * 手机号验证码登录
 */
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {
  phone,
  code
}, 'POST')
/**
 * 获取用户信息(根据会话)
 */
export const reqUser = () => ajax('/api/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax('/api/logout')
