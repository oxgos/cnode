import Cookies from 'js-cookie'
const userToken = 'userToken'

export function getToken () {
  return Cookies.get(userToken)
}

export function setToken (Token) {
  return Cookies.set(userToken, Token)
}

export function removeToken () {
  return Cookies.remove(userToken)
}
