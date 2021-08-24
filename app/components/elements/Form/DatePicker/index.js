import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

function DatePickerField({
  allowClear,
  autoFocus,
  bordered,
  disabled,
  dateRender,
  disabledDate,
  inputReadOnly,
  panelRender,
  picker,
  placeholder,
  size,
  onChange,
  value,
  monthCellRender,
  format,
  defaultValue,
  defaultPickerValue,
  showToday,
  isRange,
  ranges,
  onCalendarChange,
  style,
  ...rest
}) {
  return (
    <>
      {isRange ? (
        <RangePicker
          allowClear={allowClear}
          autoFocus={autoFocus}
          bordered={bordered}
          disabled={disabled}
          dateRender={dateRender}
          disabledDate={disabledDate}
          inputReadOnly={inputReadOnly}
          panelRender={panelRender}
          picker={picker}
          placeholder={placeholder}
          size={size}
          onChange={onChange}
          value={value}
          monthCellRender={monthCellRender}
          format={format}
          defaultValue={defaultValue}
          defaultPickerValue={defaultPickerValue}
          ranges={ranges}
          onCalendarChange={onCalendarChange}
          style={style}
          {...rest}
        />
      ) : (
        <DatePicker
          allowClear={allowClear}
          autoFocus={autoFocus}
          bordered={bordered}
          disabled={disabled}
          dateRender={dateRender}
          disabledDate={disabledDate}
          inputReadOnly={inputReadOnly}
          panelRender={panelRender}
          picker={picker}
          placeholder={placeholder}
          size={size}
          onChange={onChange}
          value={value}
          monthCellRender={monthCellRender}
          format={format}
          defaultValue={defaultValue}
          defaultPickerValue={defaultPickerValue}
          showToday={showToday}
          style={style}
          {...rest}
        />
      )}
    </>
  )
}

DatePickerField.propTypes = {
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  dateRender: PropTypes.func,
  disabledDate: PropTypes.func,
  inputReadOnly: PropTypes.bool,
  panelRender: PropTypes.func,
  picker: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  monthCellRender: PropTypes.func,
  showToday: PropTypes.bool,
  isRange: PropTypes.bool,
  ranges: PropTypes.object,
  onCalendarChange: PropTypes.func,
  style: PropTypes.object,
}

DatePickerField.defaultProps = {
  allowClear: true,
  autoFocus: false,
  bordered: true,
  disabled: false,
  inputReadOnly: false,
  picker: 'date',
  size: 'middle',
  showToday: true,
  isRange: false,
  style: {},
}

export default DatePickerField
