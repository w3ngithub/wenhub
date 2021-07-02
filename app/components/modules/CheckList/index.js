import React, { useState } from 'react'
import { Card } from 'antd'
import Button from 'components/elements/Button'
import Item from './Item'
import styles from './checklist.module.css'

const data = [
  {
    id: 1,
    type: 'completed',
    text: "Remove 'Just Another WordPress site', from tagline in 'General Settings'",
  },
  {
    id: 2,
    type: 'skipped',
    text: 'Optimize site load speed',
  },
  {
    id: 3,
    type: 'remaining',
    text: 'Test all forms',
  },
  {
    id: 4,
    type: 'remaining',
    text: 'Check for broken links',
  },
]

const CheckList = () => {
  const [reduxList, setReduxList] = useState([...data])
  const [list, setList] = useState([])

  React.useEffect(() => setList(reduxList), [reduxList])

  const handleSwitch = (t) => {
    if (t === 'all') {
      setList(reduxList)
    } else {
      setList([...reduxList.filter((x) => x.type === t)])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('Submitted')
  }

  const handleComplete = (id) => {
    const listData = reduxList.map((x) =>
      x.id === id
        ? { ...x, type: x.type === 'completed' ? 'remaining' : 'completed' }
        : x,
    )
    setReduxList(listData)
  }

  const handleSkip = (id) => {
    const listData = reduxList.map((x) =>
      x.id === id
        ? { ...x, type: x.type === 'skipped' ? 'remaining' : 'skipped' }
        : x,
    )
    setReduxList(listData)
  }

  return (
    <Card className={styles.checkList}>
      <div className={`${styles.buttons}`}>
        <Button
          onClick={() => handleSwitch('all')}
          btnText="All"
          style={{ fontWeight: 'bold', background: 'white', color: 'black' }}
        />
        <Button
          onClick={() => handleSwitch('completed')}
          btnText="Completed"
          style={{
            fontWeight: 'bold',
            background: 'rgb(30, 128, 91)',
            color: 'white',
          }}
        />
        <Button
          onClick={() => handleSwitch('skipped')}
          btnText="Skipped"
          style={{
            fontWeight: 'bold',
            background: 'rgb(187, 15, 70)',
            color: 'white',
          }}
        />
        <Button
          onClick={() => handleSwitch('remaining')}
          btnText="Remaining"
          style={{ fontWeight: 'bold', background: 'white', color: 'black' }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ol className={styles.checkListItems}>
          {list.map((x) => (
            <Item
              {...x}
              key={x.id}
              styles={styles}
              completeAction={handleComplete}
              skipAction={handleSkip}
            />
          ))}
        </ol>

        <div className={styles.row}>
          <div className={styles.checkbox}>
            <input type="checkbox" name="submit_for_review" />
            &nbsp;
            <label htmlFor="submit_for_review">Submit for review:</label>
          </div>
          <div>
            <Button btnText="Save Checklist" htmlType="submit" />
          </div>
        </div>
      </form>
    </Card>
  )
}

export default CheckList
