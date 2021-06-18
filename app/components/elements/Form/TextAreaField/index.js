import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

function TextAreaField({
  placeholder,
  onChange,
  value,
  name,
  disabled,
  onPressEnter,
  bordered,
  maxLength,
  size,
  borderRadius,
  fontSize,
  autoSize,
  allowClear,
  rows,
  width,
}) {
  const style = {
    borderRadius: `${borderRadius}`,
    fontSize: `${fontSize}`,
    width: `${width}`,
  }
  return (
    <Input.TextArea
      placeholder={placeholder}
      rows={rows}
      onChange={onChange}
      value={value}
      name={name}
      disabled={disabled}
      onPressEnter={onPressEnter}
      bordered={bordered}
      maxLength={maxLength}
      size={size}
      style={style}
      autoSize={autoSize}
      allowClear={allowClear}
    />
  )
}

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  bordered: PropTypes.bool,
  maxLength: PropTypes.number,
  size: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  allowClear: PropTypes.bool,
  rows: PropTypes.number,
  width: PropTypes.string,
  autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}

TextAreaField.defaultProps = {
  disabled: false,
  size: 'middle',
  bordered: true,
  borderRadius: '0px',
  allowClear: false,
  autoSize: false,
}

export default TextAreaField
