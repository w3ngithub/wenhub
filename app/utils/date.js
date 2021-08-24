import { months } from 'constants/constants'

export function changeDate(d) {
  const date = new Date(d)
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  const yyyy = date.getFullYear()
  if (dd < 10) {
    dd = `0${dd}`
  }
  if (mm < 10) {
    mm = `0${mm}`
  }
  return `${yyyy}-${mm}-${dd}`
}

export function getDate(da) {
  const date = new Date(da)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function calenderDate(date) {
  let dd = date.day
  let mm = date.month
  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`
  return `${date.year}-${mm}-${dd}`
}
