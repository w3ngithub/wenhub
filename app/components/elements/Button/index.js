import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
function ButtonComponent({
  type,
  btnText,
  size,
  style,
  onClick,
  isDisabled,
  htmlType,
  className,
  ...rest
}) {
  return (
    <Button
      className={className}
      type={type}
      disabled={isDisabled}
      size={size}
      style={style}
      onClick={onClick}
      htmlType={htmlType}
      {...rest}
    >
      {btnText}
    </Button>
  )
}

ButtonComponent.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  btnText: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  isDisabled: PropTypes.bool,
  htmlType: PropTypes.string,
  className: PropTypes.string,
}

ButtonComponent.defaultProps = {
  style: {
    color: '#fff',
    borderRadius: '3px',
    padding: '8px 10px',
    fontSize: '13px',
  },
  size: 'medium',
  onClick: () => {},
  type: 'primary',
  isDisabled: false,
  htmlType: 'button',
}

export default ButtonComponent
