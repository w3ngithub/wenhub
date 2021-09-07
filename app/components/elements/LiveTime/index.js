import React, { useEffect, useState } from 'react'
import moment from 'moment'

function LiveTime() {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const realTIme = setInterval(() => {
      setTime(moment().format('h:mm:ss A'))
    }, 1000)
    return () => clearInterval(realTIme)
  }, [])
  return <span>{time}</span>
}

export default LiveTime
