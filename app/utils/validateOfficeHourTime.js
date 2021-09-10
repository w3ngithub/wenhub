import moment from 'moment'
import { punchInTime, punchOutTime } from 'constants/tmsConstants'

export const officeHour = moment().isBetween(
  moment(punchInTime, 'h:mm:ss A'),
  moment(punchOutTime, 'h:mm:ss A'),
)
