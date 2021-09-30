import { axiosGet, axiosPost } from "@/utils/http"

export function login(data) {
  // return axiosPost('api/users/login/', data)
  return new Promise((resolve, reject) => {
    if(!data.username || data.username.length < 3)
      reject(new Error('用户名错误'))
    else if(!data.password || data.password.length < 6)
      reject(new Error(data.type === 'name' ? '密码错误' : '验证码错误'))
    else
      resolve({
        code: 2000,
        data: {
          name: data.username,
          user_type: 'admin',
          Authorization: 'demo-token'
        }
      })
  })
}

export function getVerifyCode(tel) {
  // return axiosPost('api/users/login_mobile_phone_verification/', { tel: tel })
  return new Promise((resolve, reject) => {
    resolve({ code: Math.floor(Math.random()*9e5) + 1e5 })
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({ name: 'admin', user_type: 'admin' })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
