/**
 * 设计规则：只有正确code为200时返回result结果对象，错误返回整个结果对象
 */
import axios from 'axios'
import store from '@/store'
import app_config from '@/config'
import * as utils from './utils'

axios.defaults.timeout = 30000;
// axios.defaults.headers.Authorization = 'Bearer ';
// axios.defaults.headers.AppKey = '9e8nbMCqDkMhSRkTo8nYb7VF3qUa43EI'

// const version = app_config.VERSION;
const baseUrl = app_config.API_URL

// 请求拦截器
axios.interceptors.request.use((config: Type.Object) => {
  // const access_token = store.state.currentUser.access_token;
  const url = config.url
  const values = new Object()
  // values.access_token = access_token;
  // values.version = version;

  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    url.indexOf('/') === 0 ? config.url = baseUrl + url : config.url = baseUrl + '/' + url
  }

  if (config.method === 'get') {
    config.params = utils.extend(config.params, values)
    // config.params = qs.stringify(config.params);
  } else {
    config.data = utils.extend(config.data, values)
    // config.data = qs.stringify(config.data);
  }
  // console.log(config);
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res: Type.Object) => {
  // store.dispatch('hideLoading');

  // if (res.status !== 200) {
  //   // return falseInfo
  // }  

  if (!res.data) {
    return Promise.reject(res)
  }
  // console.log(res.headers.authorization);
  if (res.data.code === 401) {
    console.log('登录失效');
    store.commit('changeOnline', false);
  }

  if (res.data.result && res.data.code === 200) {
    return Promise.resolve(res.data.result)
  } else { return Promise.resolve(res.data) }



}, (error) => {
  // if (error.response.status === 401) {
  //   setTimeout(() => {
  //     window.localStorage.clear()
  //     // window.location.href = app_config.login + "?" + "redirect=" + window.location.href;
  //   }, 1000)
  // }
  store.dispatch('hideLoading');
  return Promise.reject(error)
})

// export default axios;
const fetch = (url: string, params: Type.Object, type: string | undefined = 'get') => {
  if (params && params._noLoading) {
    delete params._noLoading
  } else {
    // store.commit('loading', '加载中..');
  }

  if (type === 'get') {
    return axios.get(url, {
      headers: {
        Authorization: '' + localStorage.getItem('token')
      },
      params
    })
  } else {
    const objtest: Type.Object = {}
    objtest.Authorization = '' + localStorage.getItem('token')
    return (axios as Type.Object)[type](url,
      params, {
        headers: objtest
      }
    )
  }
}

export default fetch
