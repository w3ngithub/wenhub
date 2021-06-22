import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styles from './button.module.css'
function ButtonComponent(props) {
  const { style, btnConfig, onClick } = props

  return (
    <Button
      type={btnConfig.type}
      className={styles.btn}
      block={btnConfig.isBlock}
      style={style}
      onClick={onClick}
      disabled={btnConfig.isDisabled}
      size={btnConfig.size}
    >
      {btnConfig.btnText}
    </Button>
  )
}

ButtonComponent.propTypes = {
  style: PropTypes.number,
  btnConfig: PropTypes.object,
  onClick: PropTypes.func,
}

ButtonComponent.defaultProps = {
  style: {
    color: '#fff',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '20px',
  },
  btnConfig: {
    type: 'danger',
    isBlock: false,
    btnText: 'Demo Button',
    isDisabled: false,
    size: 'large',
  },
  onClick: () => {},
}

export default ButtonComponent
