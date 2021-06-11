import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

function InputField({
  placeholder,
  onChange,
  value,
  name,
  disabled,
  onPressEnter,
  bordered,
  maxLength,
  size,
  addonBefore,
  addonAfter,
  width,
  backgroundColor,
  borderRadius,
  textColor,
  fontSize,
  padding,
}) {
  const style = {
    width: `${width}`,
    backgroundColor: `${backgroundColor}`,
    borderRadius: `${borderRadius}`,
    color: `${textColor}`,
    fontSize: `${fontSize}`,
    padding: `${padding}`,
  }
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      disabled={disabled}
      onPressEnter={onPressEnter}
      bordered={bordered}
      maxLength={maxLength}
      size={size}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      style={style}
    />
  )
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  bordered: PropTypes.bool,
  maxLength: PropTypes.number,
  size: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
}

InputField.defaultProps = {
  disabled: false,
  size: 'middle',
  bordered: true,
  width: '100%',
  backgroundColor: 'none',
  borderRadius: '0px',
}

export default InputField
