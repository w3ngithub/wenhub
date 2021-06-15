import React from 'react'
import PropTypes from 'prop-types';
import { Tabs } from 'antd'

const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => <DefaultTabBar {...props}>
    {node => (
        <>
            {
                React.cloneElement(node, {
                    className: `${node.props.className}`
                })
            }
        </>
    )}
</DefaultTabBar>;

const Tab = ({ type, tabs, onChange, tabBarStyle }) => {

    return (
        <Tabs
            defaultActiveKey="1"
            type={type}
            renderTabBar={renderTabBar}
            onChange={onChange}
            tabBarStyle={tabBarStyle}
        >
            {tabs.map(({ tab, key, content, style }) => (
                <TabPane tab={tab} key={key} style={style} >
                    {content}
                </TabPane>
            ))}
        </Tabs>
    )
}

Tab.defaultProps = {
    tabs: [
        {
            key: "1",
            tab: <div style={{ background: "yellow" }}>
                Tab 1
            </div>,
            content: <h1>Content First</h1>,
            style: { background: "red", height: "222px", fontSize: "33px", width: "50%" },
        },
        {
            key: "2",
            tab: <div style={{ background: "green" }}>
                Tab 2
            </div>,
            content: <h2>Content Second</h2>,
            style: { background: "blue", height: "122px", fontSize: "33px", width: "90%" },
        }
    ],
    onChange: (key) => console.log(key)
}

Tab.propTypes = {
    tabs: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string,
    headerBackground: PropTypes.string,
    tabBarStyle: PropTypes.object
}

export default Tab
