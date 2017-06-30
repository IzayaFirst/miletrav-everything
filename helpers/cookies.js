import Cookies from 'universal-cookie'

const MONTH = 60 * 60 * 60 * 24 * 30 // one month expire cookies
export function savingCookies({ cookieName = 'mttk', data }) {
  const cookie = new Cookies()
  cookie.set(cookieName, data, {
    path: '/',
    maxAge: MONTH,
  })
}

export function removeCookies({ cookieName }) {
  const cookie = new Cookies()
  cookie.set(cookieName, '', {
    path: '/',
    maxAge: 0,
  })
}

export function getCookiesFromReq({ cookies = {} }) {
  if (cookies.mttk) {
    return JSON.parse(cookies.mttk)
  } else {
    return null
  }
}
