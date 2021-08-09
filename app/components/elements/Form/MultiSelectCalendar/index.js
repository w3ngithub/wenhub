import React from 'react'
import PropTypes from 'prop-types'
import { Calendar } from 'react-multi-date-picker'

function MultiSelectCalendar({
  value,
  multiple,
  range,
  onlyMonthPicker,
  onlyYearPicker,
  format,
  mapDays,
  onChange,
  className,
  weekDays,
  months,
  showOtherDays,
  minDate,
  maxDate,
  plugins,
  sort,
  numberOfMonths,
  shadow,
  children,
  style,
}) {
  return (
    <Calendar
      value={value}
      multiple={multiple}
      range={range}
      onlyMonthPicker={onlyMonthPicker}
      onlyYearPicker={onlyYearPicker}
      format={format}
      mapDays={mapDays}
      onChange={onChange}
      className={className}
      weekDays={weekDays}
      months={months}
      showOtherDays={showOtherDays}
      minDate={minDate}
      maxDate={maxDate}
      plugins={plugins}
      sort={sort}
      numberOfMonths={numberOfMonths}
      shadow={shadow}
      style={style}
    >
      {children}
    </Calendar>
  )
}

MultiSelectCalendar.propTypes = {
  value: PropTypes.any,
  multiple: PropTypes.bool,
  range: PropTypes.bool,
  onlyMonthPicker: PropTypes.bool,
  onlyYearPicker: PropTypes.bool,
  format: PropTypes.string,
  mapDays: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  weekDays: PropTypes.array,
  months: PropTypes.array,
  showOtherDays: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  sort: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  shadow: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object,
}
MultiSelectCalendar.defaultProps = {
  multiple: false,
  range: true,
  onlyYearPicker: false,
  onlyMonthPicker: false,
  format: 'DD/MM/YYYY',
  showOtherDays: false,
  sort: false,
  numberOfMonths: 1,
  shadow: true,
  style: {},
}

export default MultiSelectCalendar
