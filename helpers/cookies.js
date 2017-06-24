import Cookies from 'universal-cookie'

const MONTH = 60 * 60 * 60 * 24 * 30 // one month expire cookies
export function savingCookies({ cookieName = 'mttk', data }) {
  const cookie = new Cookies()
  cookie.set(cookieName, data, {
    maxAge: MONTH,
  })
}

export function removeCookies({ cookieName }) {
  const cookie = new Cookies()
  cookie.set(cookieName, '', {
    maxAge: 0,
  })
}
