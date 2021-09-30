import axios from 'axios'
import qs from 'qs'
import { ElMessageBox, ElMessage } from 'element-plus'
import { store } from '@/store'
import { getToken } from '@/utils/auth'


axios.defaults.baseURL = process.env.VUE_APP_BASE_API

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      var token = getToken()
      if(token && !token.startsWith('Bearer ')) token = 'Bearer ' + token
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 2000) {
      ElMessage({
        message: res.message || res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // TODO:
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 6000: logged out; 7000: access denied;
      if (res.code === 6000 || res.code === 7000) {
        // to re-login
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const service1 = axios.create({ baseURL: process.env.VUE_APP_BASE_API, timeout: 5000 })
service1.interceptors.request.use(
  config => {
    if (store.getters.token)
      var token = getToken()
      if(token && !token.startsWith('Bearer ')) token = 'Bearer ' + token
      config.headers['Authorization'] = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const Axios1 = (httpOpts) => {
  return new Promise(function (resolve, reject) {
    service1(httpOpts).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

const Axios = (httpOpts) => {
  // httpOpts.xsrfCookieName = 'aegicare_erp_token'
  // httpOpts.xsrfHeaderName = 'Authorization'
  return new Promise(function (resolve, reject) {
    service(httpOpts).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

const axiosGet = (url, data) => {
  data = data ? data : {}
  return Axios({
    method: 'get',
    url: url,
    params: data,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
}
const axiosPost = (url, data, config_headers = { "Content-Type": "application/json; charset=UTF-8" }) => {
  data = data ? data : {}
  return Axios({
    method: 'post',
    url: url,
    data: data,
    headers: config_headers

  })
}
const axiosPut = (url, data, config_headers = { "Content-Type": "application/json; charset=UTF-8" }) => {
  data = data ? data : {}
  return Axios({
    method: 'put',
    url: url,
    data: data,
    headers: config_headers
  })
}
const axiosDelete = (url, data) => {
  data = data ? data : {}
  return Axios({
    method: 'delete',
    url: url,
    data: data
  })
}

const axiosPostFormData = (url, data) => {
  data = data ? data : {}
  return Axios({
    method: 'post',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data; charset=UTF-8'
    }
  })
}
const axiosBlob = (url, data, configs) => {
  data = data ? data : {}
  return Axios1({
    method: 'get',
    url: url,
    params: data,
    responseType: 'blob',
    headers: configs
  })
}

export {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
  axiosBlob,
  axiosPostFormData
}
