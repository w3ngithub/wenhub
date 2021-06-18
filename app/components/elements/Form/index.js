import React from 'react'
import InputField from 'elements/Form/InputField/InputField'
import DatePicker from 'elements/Form/DatePicker'
import TextAreaField from 'elements/Form/TextAreaField'

function index({ component, ...props }) {
  const DynamicComponent = (dynamicComponent) => {
    switch (dynamicComponent) {
      case 'InputField':
        return <InputField {...props} />

      case 'DatePicker':
        return <DatePicker {...props} />

      case 'TextAreaField':
        return <TextAreaField {...props} />

      default:
        throw new Error('no such component')
    }
  }

  return DynamicComponent(component)
}

export default index
