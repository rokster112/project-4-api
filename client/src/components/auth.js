import { Buffer } from 'buffer'

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
  console.log(token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

const userId = getPayload() ? getPayload()['sub'] : null
export default userId

export const authUser = () => {
  const payload = getPayload()
  if (!payload) return

  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}