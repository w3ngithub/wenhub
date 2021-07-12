import React from 'react'
import Modal from 'components/elements/Modal'
import FormField from 'components/elements/Form'
import PropTypes from 'prop-types'

function MessageModal({
  title,
  bodyText,
  handleCancel,
  visible,
  variant,
  footer,
  value,
  onTextChange,
}) {
  return (
    <Modal
      title={title}
      visible={visible}
      handleCancel={handleCancel}
      variant={variant}
      footer={footer}
    >
      <div>{bodyText}</div>
      <div>
        <FormField
          component="TextAreaField"
          rows={12}
          onChange={onTextChange}
          value={value}
        />
      </div>
    </Modal>
  )
}

MessageModal.defaultProps = {
  title: 'Basic Modal',
  visible: false,
  variant: 'medium',
  bodyText: 'Enter some text',
  footer: [],
}

MessageModal.propTypes = {
  title: PropTypes.string,
  handleCancel: PropTypes.func,
  visible: PropTypes.bool,
  bodyText: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.array,
  value: PropTypes.string,
  onTextChange: PropTypes.func,
}

export default MessageModal
