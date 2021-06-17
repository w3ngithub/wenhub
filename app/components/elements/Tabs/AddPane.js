import React from 'react'
import { Row, Col, Input, Button } from 'antd'

const getUniqueId = (data) =>
  data.reduce((a, c) => (+a.id > +c.id ? +a.id + 1 : +c.id + 1), 1)
const initialData = { tab: '', content: '' }

const AddPane = ({ onSubmit, panes }) => {
  const [data, setData] = React.useState(initialData)
  const handleData = (e) =>
    setData((th) => ({ ...th, [e.target.name]: e.target.value }))

  return (
    <Row>
      <Col span={12} offset={6}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ id: String(getUniqueId(panes)), ...data })
            setData(initialData)
          }}
        >
          <Input
            type="text"
            name="tab"
            placeholder="Add Header"
            onChange={handleData}
            value={data.tab}
          />
          <Input
            type="text"
            name="content"
            placeholder="Add Content"
            onChange={handleData}
            value={data.content}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </Col>
    </Row>
  )
}

export default AddPane
