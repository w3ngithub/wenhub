import React, { useState } from 'react'
// import FormField from 'elements/Form'
// import DatePanel from 'react-multi-date-picker/plugins/date_panel'
// import Calendar from 'elements/Calendar'
// import TimeLog from 'modules/TimeLog'
// import TimeLog from 'components/templates/ProjectLog'
import { Select } from 'antd'
const { Option } = Select

function Test() {
  function onChange(value) {
    console.log(`selected ${value}`)
  }

  function onBlur() {
    console.log('blur')
  }

  function onFocus() {
    console.log('focus')
  }

  function onSearch(val) {
    console.log('search:', val)
  }
  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </>
  )
}

export default Test
