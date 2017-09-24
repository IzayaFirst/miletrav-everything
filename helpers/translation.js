import axios from 'axios'
import languageMaster from './language'

export async function getContent({ language, path, req, res }) {
  let lang = language
  if (!lang) {
    const { country_code } = await getGeoLocation()
    if (country_code) {
      lang = country_code.toLowerCase()
    }
  }
  let host
  if (!req) {
    host = window.location.origin // eslint-disable-line
  } else {
    host = `${req.protocol}://${req.headers.host}`
  }

  const languageValue = matchLanguage(lang || getDefaultLanguage())
  const response = await axios.request({
    url: `${host}/asset/language/${languageValue}/${path}.json`,
  })
  if (res) {
    res.cookie('language', languageValue, {
      maxAge: 60*60*60*24,
    })
  }

  const { data } = await response
  return data
}

export function getDefaultLanguage() {
  return languageMaster[0].country_code
}

function matchLanguage(lang) {
  const master = languageMaster
  const matchLang = master.filter(value => lang === value.country_code)
  return matchLang.length > 0 ? lang : getDefaultLanguage()
}

export async function getGeoLocation() {
  const geo = await axios.request({
    baseURL: 'https://freegeoip.net/',
    url: '/json',
    method: 'get',
  })
  const { data } = geo
  return data
}

