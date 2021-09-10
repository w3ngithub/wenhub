import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Menu, Layout } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IoIosFingerPrint } from '@react-icons/all-files/io/IoIosFingerPrint'
import LiveTime from 'elements/LiveTime'
import wenLogo from 'assets/images/wenLogo.png'
import { setfirstPunchIn, setfirstPunchOut } from 'redux/tms/tmsActions'
import { punchInTime, punchOutTime } from 'constants/tmsConstants'
import { openNotification } from 'utils/notification'
import { TMS_PATH } from 'constants/routePath'
import style from './navbar.module.css'

const { SubMenu } = Menu
const { Header } = Layout

function NavBar({ navItems, backgroundColor, styles }) {
  const { firstPunchIn, firstPunchOut } = useSelector(
    (state) => state.tms,
    shallowEqual,
  )
  const dispatch = useDispatch()
  const [menuItemSelectedKey, setMenuItemSelecteKey] = useState(null)
  const { pathname, push } = useRouter()

  const handleMenuClicked = (navItem) => {
    setMenuItemSelecteKey(navItem.key)
  }

  React.useEffect(() => {
    const setActiveNavBarItem = () => {
      const urlNav = navItems.reduce((obj, item) => {
        if (item.subItem) {
          return {
            ...obj,
            ...item.subItem.reduce(
              (innerObj, innerItem) => ({
                ...innerObj,
                [innerItem.path]: innerItem.id,
              }),
              {},
            ),
          }
        }
        return { ...obj, [item.path]: item.id }
      }, {})

      setMenuItemSelecteKey(urlNav[pathname])
    }
    setActiveNavBarItem()
  }, [pathname])

  const handlePunch = () => {
    if (firstPunchOut) return
    const officeHour = moment().isBetween(
      moment(punchInTime, 'h:mm:ss A'),
      moment(punchOutTime, 'h:mm:ss A'),
    )
    if (officeHour) {
      if (!firstPunchIn) dispatch(setfirstPunchIn())
      else dispatch(setfirstPunchOut())
    } else {
      openNotification({ type: 'info', message: 'Please Add Punch Note' })
      push(TMS_PATH)
    }
  }

  return (
    <Layout style={{ width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor,
          width: '100%',
        }}
      >
        <div className={`${style.logo} nav-logo`}>
          <Link href="/">
            <span style={{ cursor: 'pointer' }}>
              <Image src={wenLogo} alt="WEN" width={130} height={40} />
            </span>
          </Link>
        </div>
        <div className={`${style.punch}`} onClick={handlePunch} aria-hidden>
          <IoIosFingerPrint style={{ fontSize: '24px' }} />
          {firstPunchOut ? (
            <span>OFFICE HOUR 9HR</span>
          ) : (
            <span>
              PUNCH {firstPunchIn ? 'OUT' : 'IN'} <LiveTime />
            </span>
          )}
        </div>
        <Menu
          onClick={handleMenuClicked}
          mode="horizontal"
          selectedKeys={[menuItemSelectedKey]}
          overflowedIndicator={<MenuFoldOutlined style={{ color: '#fff' }} />}
          defaultSelectedKeys={['1']}
          style={{
            backgroundColor: 'inherit',
            padding: '32px 0',
            ...styles,
          }}
        >
          {navItems.map((item) =>
            item.subItem ? (
              <SubMenu
                key={item.id}
                title={item.item}
                className={style.nav_subMenuitem}
              >
                {item.subItem.map((subitem) => (
                  <Menu.Item key={subitem.id} style={{ backgroundColor }}>
                    <Link href={subitem.path}>
                      <span className={style.nav_item}>{subitem.item}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.id}>
                <Link href={item.path}>
                  <span
                    className={
                      item.id === +menuItemSelectedKey
                        ? style.nav_item_active
                        : style.nav_item
                    }
                  >
                    {item.item}
                  </span>
                </Link>
              </Menu.Item>
            ),
          )}
        </Menu>
      </Header>
    </Layout>
  )
}

NavBar.propTypes = {
  navItems: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string,
  styles: PropTypes.object,
}

NavBar.defaultProps = {
  backgroundColor: 'none',
  styles: {},
}

export default NavBar
