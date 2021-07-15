import { months } from 'constants/constants'

export function getDate(da) {
  const date = new Date(da)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
