import moment from 'moment'

export const selectedDates = (weekOrMonth) => {
  if (weekOrMonth.value === '1')
    return [
      moment().startOf('isoWeek'),
      moment().startOf('isoWeek').add('4', 'days'),
    ]
  if (weekOrMonth.value === '2')
    return [
      moment().startOf('isoWeek').subtract('7', 'days'),
      moment().startOf('isoWeek').subtract('7', 'days').add('4', 'days'),
    ]
  if (weekOrMonth.value === '3') return [moment().startOf('month'), moment()]

  return [
    moment().startOf('month').subtract('1', 'month'),
    moment().startOf('month').subtract('1', 'month').endOf('month'),
  ]
}
