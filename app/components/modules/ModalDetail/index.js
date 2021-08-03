import React from 'react'
import { Row, Col } from 'antd'
import Modal from 'components/elements/Modal'
import Detail from 'components/elements/Detail'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

function ModalDetail({
  title,
  columns,
  detail,
  visible,
  variant,
  handleCancel,
  footer,
}) {
  return (
    <Modal
      title={title}
      visible={visible}
      handleCancel={handleCancel}
      variant={variant}
      footer={footer}
    >
      <div className={`${styles.containerFluid}`}>
        <Row>
          <Col span={24}>
            <Detail columns={columns} detail={detail} />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

ModalDetail.defaultProps = {
  title: 'Basic Modal',
  visible: true,
  variant: 'medium',
  footer: [],
}

ModalDetail.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      keyIndex: PropTypes.string,
    }),
  ).isRequired,
  detail: PropTypes.object,
  handleCancel: PropTypes.func,
  visible: PropTypes.bool,
  variant: PropTypes.string,
  footer: PropTypes.array,
}

export default ModalDetail
