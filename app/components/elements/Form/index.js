import React from 'react'
import InputField from 'components/elements/Form/InputField/InputField'

function index({ component, ...props }) {
  const DynamicComponent = (dynamicComponent) => {
    switch (dynamicComponent) {
      case 'InputField':
        return <InputField {...props} />

      default:
        console.log('no such component')
    }
  }

  return DynamicComponent(component)
}

export default index
