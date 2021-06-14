import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import styles from './button.module.css'

//!! Format of Providing Props to the Button Component
// const style = {
//   color: '#fff',
//   borderRadius: '12px',
//   padding: '20px',
//   fontSize: '20px',
// }

// const btnConfig = {
//   type: 'danger',
//   isBlock: false,
//   btnText: 'Demo Button',
//   onBtnClick: () => console.log('Clicked'),
//   isDisabled: false,
//   size: 'large',
// }
function ButtonComponent(props) {
  const { style, btnConfig, onBtnClick } = props

  return (
    <Button
      type={btnConfig.type}
      className={styles.btn}
      block={btnConfig.isBlock}
      style={style}
      onClick={onBtnClick}
      disabled={btnConfig.isDisabled}
      size={btnConfig.size}
    >
      {btnConfig.btnText}
    </Button>
  )
}

ButtonComponent.propTypes = {
  style: PropTypes.object.isRequired,
  btnConfig: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

ButtonComponent.defaultProps = {
  style: {},
  btnConfig: {
    type: 'danger',
    isBlock: false,
    btnText: 'Demo Button',
    isDisabled: false,
    size: 'large',
  },
  onBtnClick: () => console.log('Clicked'),
}

export default ButtonComponent
