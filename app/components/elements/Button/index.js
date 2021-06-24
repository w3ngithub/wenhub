import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styles from './button.module.css'
function ButtonComponent({ type, btnText, size, style, onClick, isDisabled }) {
  return (
    <Button
      type={type}
      disabled={isDisabled}
      size={size}
      className={styles.btn}
      style={style}
      onClick={onClick}
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
}

ButtonComponent.defaultProps = {
  style: {
    color: '#fff',
    borderRadius: '3px',
    padding: '8px 10px',
    fontSize: '17px',
  },
  size: 'medium',
  onClick: () => {},
  type: 'primary',
  isDisabled: false,
}

export default ButtonComponent
