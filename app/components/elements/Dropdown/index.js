import { Menu, Dropdown } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { DownOutlined } from '@ant-design/icons'

const DropdownComponent = (props) => {
  const {
    dropdownConfig,
    titleClassname,
    dropdownList,
    dropdownTitle,
    dropdownArrow,
    menuClassname,
    menuListClassname,
    onMenuListClick,
  } = props

  const menu = (
    <Menu className={menuClassname}>
      {dropdownList &&
        dropdownList.map((list) => (
          <Menu.Item
            className={menuListClassname}
            key={list.key}
            onClick={onMenuListClick}
          >
            {list.dropdown}
          </Menu.Item>
        ))}
    </Menu>
  )

  return (
    <>
      <Dropdown
        overlay={menu}
        arrow={dropdownConfig.showArrow}
        disabled={dropdownConfig.isDisabled}
        trigger={[`${dropdownConfig.trigger}`]}
      >
        <span className={titleClassname}>
          {dropdownTitle} {dropdownArrow && <DownOutlined />}
        </span>
      </Dropdown>
    </>
  )
}

DropdownComponent.propTypes = {
  dropdownConfig: PropTypes.object,
  titleClassname: PropTypes.string,
  menuClassname: PropTypes.string,
  menuListClassname: PropTypes.string,
  dropdownTitle: PropTypes.string,
  dropdownList: PropTypes.array,
  dropdownArrow: PropTypes.bool,
  onMenuListClick: PropTypes.func,
}

DropdownComponent.defaultProps = {
  dropdownConfig: {
    showArrow: false,
    isDisabled: false,
    trigger: 'click', // can be click/hover && Default is hover
  },
  titleClassname: 'ant-dropdown-link', // used for formatting Dropdown Title
  menuClassname: 'ant-menu',
  menuListClassname: 'ant-menu-list',
  dropdownList: [
    { key: 0, dropdown: <span>Item 1</span> },
    { key: 1, dropdown: <span>Item 2</span> },
  ],
  dropdownTitle: 'Dropdown Here',
  dropdownArrow: true,
  onMenuListClick: () => {
    console.log('ee')
  },
}

export default DropdownComponent
