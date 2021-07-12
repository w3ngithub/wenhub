import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
const { Option } = Select
const SelectComponent = ({
  options,
  style,
  placeholder,
  onChange,
  onFocus,
  onSearch,
  onBlur,
  dropdownClassName,
  value,
  mode,
  ...rest
}) => (
  <>
    <Select
      showSearch
      mode={mode}
      style={style}
      placeholder={
        <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
          {placeholder}
        </div>
      }
      onChange={(val) => {
        if (Array.isArray(val)) {
          const selectedData = options.filter((opt) => val.includes(opt.value))
          onChange(selectedData)
        } else {
          const selectedData = options.find((opt) => opt.value === val)
          onChange(selectedData)
        }
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      dropdownClassName={dropdownClassName}
      value={Array.isArray(value) ? value.map((x) => x?.value) : value?.value}
      filterOption={(input, opt) =>
        opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...rest}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  </>
)

SelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // [{label:'',value:''}] for multiple
  style: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSearch: PropTypes.func,
  dropdownClassName: PropTypes.string,
  mode: PropTypes.string,
}

SelectComponent.defaultProps = {
  placeholder: 'Select a person',
  style: { width: 190, fontSize: '0.7rem', fontWeight: 'bold' },
  mode: 'tag',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onSearch: () => {},
}

export default SelectComponent
