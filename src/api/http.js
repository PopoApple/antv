// 全局 http 模块

import axios from 'axios'
import qs from 'qs'
import Store from 'common/js/store'
import { exitAccount, getUxtMark } from 'common/js/utils'
import handleErrorCode from "common/js/errorCode";
import { whiteList } from 'common/js/errorCode'
import { signature } from './signature'
import { Config } from '../config'
import Vue from 'Vue'
import { ToastPlugin } from 'plugins'
import uuidv4 from 'uuid/v4'

Vue.use(ToastPlugin)
const vm = new Vue()



function http (options) {
  const accessToken = Store.get('accessToken')
  
  const timestamp = Date.now()

  const method = options.method || 'get'
  const url = options.url || ''
  const params = method === 'post' ? options.data : options.params
  
  // 判断是否云图 API，云图 API 中包含路径 yuntu
  const isYuntuAPI = options.url.indexOf('yuntu') > -1 ? true : false
  
  const signParams = {
    AccessToken: accessToken,
    Timestamp: timestamp
  }

  Object.assign(signParams, params)

  const signaturn = signature(signParams)
  let xRequestID = uuidv4().replace(/-/g, '')

  const instance = axios.create({
    baseURL: isYuntuAPI ? Config.domain.yuntu : Config.domain.api,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'AccessToken': accessToken,
      'Signature': signaturn,
      'Sign-Type': 1,
      'Timestamp': timestamp,
    },
    method: method,
    responseType: 'json',
    url:  url,
    params: options.params,
    paramsSerializer: function (obj) {
      return qs.stringify(obj, { arrayFormat: 'repeat' })
    },
    data: qs.stringify(options.data ,{ indices: false }),
    timeout: 20000
  })

  instance.interceptors.request.use( config => {
    // 云图 API 需要更多的请求头公共参数
    // axios 0.17.1之前的版本会默认使用 get 请求
    config.method = method
    if(config.baseURL.indexOf(Config.domain.api) > -1) {
      config.headers['X-Request-ID'] = xRequestID
    }
    // console.log({config})
    if (isYuntuAPI) {
      if(params.familyId) {
        Object.assign(config.headers, {
          'AppId': 600274124,
          'FamilyId': params.familyId || '',
          'ClientType': 'ANDROID',
          'Version': '2.0.0'
        })
      } else {
        Object.assign(config.headers, {
          'AppId': 600786120,
          'ClientType': 'ANDROID',
          'Version': '2.0.0'
        })
      }
    }
    // config.headers['X-Request-ID'] = xRequestID
    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use( response => {
    const errorObject = {
      url: response.config.url,
      method: response.config.method,
      params: response.config.data,
      data: response.data,
      accessToken: Store.get('accessToken'),
      status: response.status,
      headers: response.config.headers
    };
    if (response && (response.code || response.res_code)) {
      if (response.code !== 'success' ||  response.res_code !== 'success') {
        // 错误处理
        window.app.$loading.hide()
        const errorCode = response.res_code || response.code

        vm.$toast.show({
          text: handleErrorCode(errorCode) || '网络错误',
          time: 1000
        })
      }
      else {
        if(response.code === 'MemberInfoNotExist') {
          // 成员信息不存在
        }
        return response
      }
      _uxt.push(['_trackEvent', getUxtMark(), '接口请求错误', JSON.stringify(errorObject)])
    }
    else {
      return response
    }
  }, error => {
    handleResponseError(error)
        return Promise.reject(error)
  })
  

  return new Promise((resolve, reject) => {
    instance()
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })

}


function handleResponseError(error) {
  if(error.response && error.response.data) {
    const errorCode = error.response.data.res_code || error.response.data.code

    // 当错误码处于错误码白名单时，什么都不做，直接退出函数
    for(let item of whiteList) {
      if(errorCode === item) return
    }

    vm.$toast.show({
      text: handleErrorCode(errorCode) || '网络错误',
      time: 1000
    })

    // 成员被踢出家庭云
    if(errorCode === 'MemberInfoNotExist') {
      window.app.$loading.hide()
      if (window.app.$route.name === 'family') {
        window.app.$router.push({
          path: '/family',
          query: {
            failType: 'notInFamily'
          }
        })
      } else {
        window.app.$router.push('/exception/notInFamily')
      } 
      
    }

    // accessToken 过期
    if(errorCode === 'AccessTokenHasExpired') {
      vm.$toast.show({
        text: '登录已过期',
        type: 'fail',
        time: 1000
      })
      exitAccount()
    }

    if(errorCode === 'AccountFreeze') {
      vm.$toast.show({
        text: '登录已失效',
        type: 'fail',
        time: 1000
      })
      exitAccount()
    }
  }

  // 网络错误
  if(error.message === 'Network Error') {
    vm.$toast.show({
      text: '网络错误',
      time: 1000
    })
  }
  
  // 响应超时
  if(error.code === 'ECONNABORTED') {
    vm.$toast.show({
      text: '网络连接超时',
      time: 1000
    })
  }
  // console.log(error.config)
  // 网络错误
}

export function get(url, params) {
  if (!params) params = {}

  return http({
    url: url,
    params: params,
    method: 'get'
  });
  
}

export function post(url, data) {
  if (!data) data = {}

  return http({
    url: url,
    data: data,
    method: 'post'
  });
}
