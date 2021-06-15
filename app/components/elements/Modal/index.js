import React from 'react'
import { Modal } from 'antd';
import PropTypes from 'prop-types'
import { unmountComponentAtNode } from 'react-dom'

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
    headerBackground,
    headerTextColor,
    headerFontSize,
    footerBackground,
    variant
}) => {

    React.useEffect(() => {

        const header = document.getElementsByClassName("ant-modal-header")
        header[0].style.backgroundColor = headerBackground
        const headerTitle = document.getElementsByClassName("ant-modal-title")
        headerTitle[0].style.color = headerTextColor
        headerTitle[0].style.fontSize = headerFontSize
        const footer = document.getElementsByClassName("ant-modal-footer")
        footer[0].style.backgroundColor = footerBackground

        return () => {
            unmountComponentAtNode(document.getElementsByClassName("ant-modal-header"))
            unmountComponentAtNode(document.getElementsByClassName("ant-modal-title"))
            unmountComponentAtNode(document.getElementsByClassName("ant-modal-footer"))
        }

    }, [])

    const width = variant === "small" ? "25%" : variant === "medium" ? "50%" : "90%"


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
        >
            {children}
        </Modal>

    )
}

Modals.defaultProps = {
    title: "Basic Modal",
    visible: true,
    confirmText: "Confirm",
    cancelText: "Cancel",
    headerBackground: "white",
    headerFontSize: "1rem",
    headerTextColor: "blue",
    footerBackground: "white",
    variant: "small"
}

Modals.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    headerBackground: PropTypes.string,
    headerFontSize: PropTypes.string,
    headerTextColor: PropTypes.string,
    footerBackground: PropTypes.string,
    variant: PropTypes.string
}

export default Modals
