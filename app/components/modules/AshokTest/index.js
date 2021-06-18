import React, { useState } from 'react'
import FormField from 'elements/Form'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

function Test() {
  const [input, setInput] = useState('')
  const onChnage = (e) => {
    console.log(e)
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Ashok Component Test</h3>
      <div>
        <h4>InputField Component</h4>
        <FormField
          component="InputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FormField
          component="InputField"
          placeholder="enter something"
          size="large"
          backgroundColor="green"
          textColor="red"
          width="30rem"
          borderRadius="6px"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
        <h4>DatePicker Component</h4>
        {/* <FormField component="DatePicker" /> */}
        <FormField component="DatePicker" size="large" onChange={onChnage} />
        {/* <FormField
          component="DatePicker"
          size="large"
          isRange
          onChange={onChnage}
        /> */}
      </div>
      <div>
        <h4>MultiSelectCalendar Component</h4>
        <div>
          <FormField
            component="MultiSelectCalendar"
            plugins={[<DatePanel />]}
            multiple
          />
        </div>
        <div>
          <h4>TextAreaField Component</h4>
          <FormField component="TextAreaField" size="small" />
          <FormField
            component="TextAreaField"
            rows={10}
            width="30%"
            allowClear
          />
        </div>
      </div>
    </div>
  )
}

export default Test
