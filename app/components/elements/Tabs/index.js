import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import useOutsideClick from 'hooks/outsideClickHook'
import AddPane from './AddPane'

const { TabPane } = Tabs

const renderTabBar = (props, DefaultTabBar) => <DefaultTabBar {...props} />

const Tab = ({ type, tabs, tabBarStyle, style }) => {
  const ref = useRef()
  const [activeKey, setActiveKey] = useState('1')
  const [panes, setPanes] = useState([...tabs])

  useEffect(() => panes.length === 0 && setActiveKey('0'), [panes])

  useOutsideClick(ref, () => setActiveKey(panes[0].id))

  const add = () => setActiveKey('0')

  const remove = (key) =>
    setPanes((pane) => [...pane].filter((x) => x.id !== key))
  const onEdit = (targetKey, action) =>
    action === 'add' ? add() : remove(targetKey)

  const addTab = (datas) => {
    setPanes((p) => [...p, { ...datas }])
    setActiveKey(datas.id)
  }

  return (
    <div ref={ref}>
      <Tabs
        defaultActiveKey="1"
        type={type}
        renderTabBar={renderTabBar}
        onChange={(key) => {
          setActiveKey(key)
        }}
        tabBarStyle={tabBarStyle}
        style={style}
        activeKey={activeKey}
        onEdit={onEdit}
      >
        {panes.map(({ tab, id, content, st }) => (
          <TabPane tab={tab} key={id} style={st}>
            {content}
          </TabPane>
        ))}
        {type === 'editable-card' && (
          <TabPane tab="+" key="0" closable={false}>
            <AddPane onSubmit={addTab} panes={panes} />
          </TabPane>
        )}
      </Tabs>
    </div>
  )
}

Tab.defaultProps = {
  type: 'editable-card',
  tabBarStyle: { background: 'blue', width: '90%' },
  tabs: [
    {
      id: '1',
      tab: <div style={{ background: 'yellow' }}>Tab 1</div>,
      content: <h1>Content First</h1>,
      style: {
        background: 'red',
        height: '222px',
        fontSize: '33px',
        width: '50%',
      },
    },
    {
      id: '2',
      tab: <div style={{ background: 'green' }}>Tab 2</div>,
      content: <h2>Content Second</h2>,
      style: {
        background: 'blue',
        height: '122px',
        fontSize: '33px',
        width: '90%',
      },
    },
  ],
  style: { background: 'black' },
}

Tab.propTypes = {
  tabs: PropTypes.array,
  type: PropTypes.string,
  tabBarStyle: PropTypes.object,
  style: PropTypes.object,
}

export default Tab
