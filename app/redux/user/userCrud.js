import api from 'api/restClient'

export function getUserToken(user) {
  return api.post(
    'https://wendevs.com/wenhub-rt/wp-json/jwt-auth/v1/token',
    user,
  )
}
