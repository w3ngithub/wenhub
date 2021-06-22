import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const Modals = ({
  title,
  visible,
  handleOk,
  handleCancel,
  style,
  bodyStyle,
  children,
  confirmText,
  cancelText,
  variant,
  footer,
}) => {
  let width

  if (variant === 'small') {
    width = '25%'
  } else if (variant === 'medium') {
    width = '50%'
  } else {
    width = '90%'
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      style={style}
      okText={confirmText}
      cancelText={cancelText}
      bodyStyle={bodyStyle}
      width={width}
      footer={footer}
    >
      {children}
    </Modal>
  )
}

Modals.defaultProps = {
  title: 'Basic Modal',
  visible: true,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  footer: null,
}

Modals.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.array,
}

export default Modals
