import React from 'react'
import FormField from 'elements/Form'

function Test() {
  const onChnage = (e) => {
    console.log(e)
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Ashok Component Test</h3>
      <div>
        <h4>InputField Component</h4>
        <FormField component="InputField" />
        <FormField
          component="InputField"
          placeholder="enter something"
          size="large"
          backgroundColor="green"
          textColor="red"
          width="30rem"
          borderRadius="6px"
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
        <h4>TextAreaField Component</h4>
        <FormField component="TextAreaField" size="small" />
        <FormField component="TextAreaField" rows={10} width="30%" allowClear />
      </div>
      <div>
        <h4>MultiSelectCalendar Component</h4>
        <FormField component="MultiSelectCalendar" />
      </div>
    </div>
  )
}

export default Test
