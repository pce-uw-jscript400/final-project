import * as TokenHelper from '../helpers/local-storage'
const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const login = async (user) => {
  const response = await fetch(`${BASE_URL}/login`, {
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()
  TokenHelper.setToken(json)
  return json;
}

export const signup = async (user) => {
  const response = await fetch(`${BASE_URL}/signup`, {
   body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const json = await response.json()
  const token = json.token

  TokenHelper.setToken(json)
  return json
}

export const getLoginToken = async () => {
    const token = TokenHelper.getToken();
    return token;
  }

export const profile = async () => {
  const token = TokenHelper.getToken();
   const response = await fetch(`${BASE_URL}/students/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
   })
   const json = await response.json()
   return json;
}