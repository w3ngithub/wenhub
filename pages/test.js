import React from 'react'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'

const test = () => {
    const [visible, setVisible] = React.useState(true)
    return (
        <div>
            <div>
                <h1>Table</h1>
                <PaginateTable />
            </div>
            <div>
                <h1>Modal</h1>
                <button onClick={() => setVisible(true)}>Modal</button>

                <Modal
                    visible={visible}
                    handleOk={() => setVisible(false)}
                    handleCancel={() => setVisible(false)}
                    bodyStyle={{ color: "purple", background:"red" }}
                    confirmText="Delete"
                    cancelText="No"
                    headerBackground="white"
                    headerFontSize="1rem"
                    headerTextColor="blue"
                    footerBackground="white"
                    variant="medium"
                >
                    These are the contents
                </Modal>
            </div>
        </div >
    )
}

export default test