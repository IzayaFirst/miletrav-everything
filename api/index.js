import axios from 'axios'
const baseURL  = 'http://localhost:3030'

export async function get({ url, params, authType, authToken }) {
  const method = 'get'
  const res = await axiosRequest({ baseURL, url, method, params, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function post({ url, data, authType = '', authToken = ''}) {
  const method = 'post'
  const res = await axiosRequest({ baseURL, url, method, data, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function put({ url, data, authType, authToken }) {
  const method = 'put'
  const res = await axiosRequest({ baseURL, url, method, data, authToken, authType })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

export async function del({ url, params, authType, authToken }) {
  const method = 'delete'
  const res = await axiosRequest({ url, method, params, authType, authToken })
  return {
    axiosData: res.data,
    data: res.data.data,
  }
}

function axiosRequest({ url, method, params, data, authType = 'Basic', authToken = '' }) {
    console.log(baseURL, url)
    return axios.request({
      baseURL,
      url,
      method,
      headers: Object.assign({ 'Content-Type': 'application/json' }, { Authorization: `${authType} ${authToken}` }),
      withCredentials: false,
      data: Object.assign({}, data),
      params: Object.assign({}, params),
    })
}