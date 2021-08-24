import React from 'react'
import Modal from 'components/elements/Modal'
import FormField from 'components/elements/Form'
import PropTypes from 'prop-types'
import Loader from 'components/elements/Loader'

function MessageModal({
  title,
  bodyText,
  handleCancel,
  visible,
  variant,
  footer,
  value,
  onTextChange,
  loading,
}) {
  return (
    <Modal
      title={title}
      visible={visible}
      handleCancel={handleCancel}
      variant={variant}
      footer={footer}
    >
      {loading ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: '40%',
            left: '0%',
            width: '100%',
          }}
        >
          <Loader />
        </div>
      ) : null}
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
  loading: PropTypes.bool,
}

export default MessageModal
