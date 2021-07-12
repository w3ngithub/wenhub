import React from 'react'
import CalendarComponent from 'components/elements/Calendar'

const OnLeave = () => {
  return (
    <CalendarComponent
      style={{ height: 500, color: 'black' }}
      events={[
        {
          title: 'Mustang Visit',
          allDay: true,
          start: new Date(2021, 7, 1),
          end: new Date(2021, 7, 5),
        },
        {
          title: 'Pokhara Visit',
          start: new Date(2021, 7, 7),
          end: new Date(2021, 7, 10),
        },

        {
          title: 'Khaptad Visit',
          start: new Date(2021, 7, 13, 0, 0, 0),
          end: new Date(2021, 7, 20, 0, 0, 0),
        },
        {
          title: 'Badimalika Visit',
          start: new Date(2021, 6, 13, 0, 0, 0),
          end: new Date(2021, 7, 2, 0, 0, 0),
        },
      ]}
    />
  )
}

export default OnLeave
