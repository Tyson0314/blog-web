import axios from 'axios'
import {getCookie} from "../utils/cookieUtils";

/**
 * 第三方登录
 * @param params
 */
export function login(params) {
  return axios.get('/api/oauth/render/' + params)
}

export function authVerify(params) {
  return axios.get('/api/oauth/verify/' + params)
}

export function editUser(params) {
  return axios.post('/api/user/edit', params)
}

export function deleteUserAccessToken(params) {
  console.log('deleteUserAccessToken')
  return axios.post('/api/oauth/delete/' + params)
}

axios.defaults.headers.common['Authorization'] = getCookie("token")

// request拦截器
axios.interceptors.request.use(
  config => {
    console.log('getCookie:', getCookie("token"))
    if (getCookie("token") != undefined) {
      config.headers.Authorization = getCookie("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
