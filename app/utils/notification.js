import { notification } from 'antd'

export const openNotification = ({
  type = 'warning',
  message = '',
  description = '',
}) => {
  notification[type]({
    message,
    description,
  })
}
