import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

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
  centered,
}) => {
  useLockBodyScroll()
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
      centered={centered}
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
  footer: [],
  centered: true,
}

Modals.propTypes = {
  title: PropTypes.node,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.array,
  centered: PropTypes.bool,
}

export default Modals
