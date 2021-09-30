import Cookies from 'js-cookie'

const TokenKey = 'demo_token'
const UsernameKey = 'demo_user'
const UserAvatar = 'demo_avatar'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(UsernameKey)
}

export function setUserName(name) {
  return Cookies.set(UsernameKey, name)
}

export function removeUserName() {
  return Cookies.remove(UsernameKey)
}

export function getUserAvatar() {
  return Cookies.get(UserAvatar)
}

export function setUserAvatar(url) {
  return Cookies.set(UserAvatar, url)
}

export function removeUserAvatar() {
  return Cookies.remove(UserAvatar)
}