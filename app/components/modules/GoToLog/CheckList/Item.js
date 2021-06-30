import React from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import classnames from 'classnames'

function Item({ id, type, text, styles, completeAction, skipAction }) {
  const [show, setShow] = React.useState(false)

  let style
  if (type === 'completed') {
    style = { color: '#fff', background: 'rgb(30, 128, 91)' }
  } else if (type === 'skipped') {
    style = { color: '#fff', background: 'rgb(187, 15, 70)' }
  } else {
    style = { color: 'black', background: '#fff' }
  }
  return (
    <li
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={style}
    >
      <span>{text}</span>
      {show && (
        <div className={styles.itemActions}>
          <CheckOutlined
            className={`${styles.tickIcon}`}
            title="Mark as completed"
            onClick={() => completeAction(id)}
          />
          <CloseOutlined
            className={`${styles.crossIcon}`}
            title="Mark as skipped"
            onClick={() => skipAction(id)}
          />
        </div>
      )}

      <div
        className={classnames({
          [styles.skipNone]: type !== 'skipped',
          [styles.skippedReason]: type === 'skipped',
          [styles.skip]: true,
        })}
      >
        <div>
          <label htmlFor={`skipped_reason[${id}]`}>Skipped Reason</label>
        </div>
        <div>
          <textarea
            name={`skipped_reason[${id}]`}
            cols="20"
            rows="5"
            style={{
              fontSize: 13,
              color: 'black',
              padding: '6px 11px',
              height: 'auto',
            }}
            defaultValue="Test"
          />
        </div>
      </div>
    </li>
  )
}

export default Item
