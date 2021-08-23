import React, { useState } from 'react'
import {
  CaretDownOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import classnames from 'classnames'
import HTMLReactParser from 'html-react-parser'
import FormField from 'elements/Form'

function Item({
  id,
  statustype,
  statusReason,
  list_item: listItem,
  description,
  extra_description_needed: extraDescriptionNeeded,
  styles,
  completeAction,
  skipAction,
  handleChangeReasonForSkip,
}) {
  const [show, setShow] = React.useState(false)
  const [seeMore, setSeeMore] = useState(false)

  const handleSeeMore = () => setSeeMore(!seeMore)

  let style
  if (statustype === 'completed') {
    style = { color: '#fff', background: 'rgb(30, 128, 91)' }
  } else if (statustype === 'skipped') {
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
      <span>
        {listItem}{' '}
        {extraDescriptionNeeded === 'yes' ? (
          <span className={styles.see_more} onClick={handleSeeMore} aria-hidden>
            <CaretDownOutlined />
          </span>
        ) : (
          ''
        )}
      </span>
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
      {seeMore && (
        <div className={`${styles.description}`}>
          {HTMLReactParser(description)}
        </div>
      )}

      <div
        className={classnames({
          [styles.skipNone]: statustype !== 'skipped',
          [styles.skippedReason]: statustype === 'skipped',
          [styles.skip]: true,
        })}
      >
        <div>
          <label htmlFor={`skipped_reason[${id}]`}>Skipped Reason</label>
        </div>
        <div>
          <FormField
            component="TextAreaField"
            rows={5}
            value={statusReason}
            onChange={(e) => handleChangeReasonForSkip(e.target.value, id)}
          />
        </div>
      </div>
    </li>
  )
}

export default Item
