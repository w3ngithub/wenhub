import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import CalendarComponent from 'components/elements/Calendar'

const OnLeave = () => {
  const { allLeavesCalendar } = useSelector(
    (state) => state.lmsData,
    shallowEqual,
  )
  return (
    <CalendarComponent
      style={{ height: 500, color: 'black' }}
      events={
        allLeavesCalendar?.map((leave) => ({
          title: leave.title,
          start: new Date(leave.start),
          end: new Date(leave.end),
          allDay:
            new Date(leave.start).getTime() === new Date(leave.end).getTime(),
        })) || []
      }
    />
  )
}

export default OnLeave
