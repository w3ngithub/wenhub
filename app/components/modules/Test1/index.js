import React from 'react'
import PaginateTable from 'components/modules/PaginateTable'
import Modal from 'components/elements/Modal'
import Tab from 'components/elements/Tabs'

const ContentOne = () => {

    return (
        <div>
            <h1>Hey this is first Content</h1>
        </div>
    )
}

const ContentTwo = () => {

    return (
        <div>
            <h1>Hey this is second Content</h1>
        </div>
    )
}

const Test1 = () => {
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
                    bodyStyle={{ color: "purple", background: "red" }}
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
            <div>
                <h1>Tabs</h1>
                <Tab
                    tabBarStyle={{ background: "blue", width: "90%" }}
                    tabs={[
                        {
                            key: "1",
                            tab: <div style={{ background: "yellow", color: "red", fontSize: "2rem" }}>
                                Tab 1
                            </div>,
                            content: <ContentOne />,
                            style: { background: "red", height: "222px", fontSize: "33px", width: "50%" },
                        },
                        {
                            key: "2",
                            tab: <div style={{ background: "green", color: "pink", fontSize: "2rem" }}>
                                Tab 2
                            </div>,
                            content: <ContentTwo />,
                            style: { background: "blue", height: "122px", fontSize: "33px", width: "90%" },
                        }
                    ]} />
            </div>
        </div >
    )
}

export default Test1