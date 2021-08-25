import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Button from 'components/elements/Button'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import { fetchProjectDetailForTimeLog } from 'redux/projectLog/projectLogAction'
import { openNotification } from 'utils/notification'
import Item from './Item'
import styles from './checklist.module.css'

const CheckList = ({ projectId }) => {
  const [reduxList, setReduxList] = useState([])
  const [list, setList] = useState([])
  const [reviewSubmit, setReviewSubmit] = useState(false)
  const [switchCheckList, setSwitchCheckList] = useState('all')
  const [isSubmitting, setisSubmitting] = useState(false)

  const {
    projectDetailForTimeLog,
    checkListFrom,
    generalCheckList,
    clientCheckList,
    error: errorFromApi,
  } = useSelector((state) => state.projectLog, shallowEqual)

  const [checkListToUpdate, setCheckListToUpdate] = useState({
    checklist: { ...projectDetailForTimeLog?.checklist },
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const checkList = () => {
      if (typeof projectDetailForTimeLog?.checklist?.item_status === 'object') {
        if (checkListFrom === 'client')
          return clientCheckList[0]?.acf_fields?.list_items?.map((item, i) => ({
            id: i + 1,
            statustype:
              projectDetailForTimeLog.checklist.item_status[i + 1] || '',
            statusReason:
              projectDetailForTimeLog.checklist.checklist_skipped_reason[
                i + 1
              ] || '',
            ...item,
          }))
        if (checkListFrom === 'general')
          return generalCheckList[0]?.acf_fields?.list_items?.map(
            (item, i) => ({
              id: i + 1,
              statustype:
                projectDetailForTimeLog.checklist.item_status[i + 1] || '',
              statusReason:
                projectDetailForTimeLog.checklist.checklist_skipped_reason[
                  i + 1
                ] || '',
              ...item,
            }),
          )
        return []
      }
      if (checkListFrom === 'client')
        return clientCheckList[0]?.acf_fields?.list_items?.map((item, i) => ({
          id: i + 1,
          statustype: '',
          statusReason: '',
          ...item,
        }))
      if (checkListFrom === 'general')
        return generalCheckList[0]?.acf_fields?.list_items?.map((item, i) => ({
          id: i + 1,
          statustype: '',
          statusReason: '',
          ...item,
        }))
      return []
    }
    setReduxList(checkList)
  }, [
    projectDetailForTimeLog,
    checkListFrom,
    generalCheckList,
    clientCheckList,
  ])

  useEffect(() => {
    if (switchCheckList === 'all') {
      setList(reduxList)
    } else {
      setList([...reduxList.filter((x) => x.statustype === switchCheckList)])
    }
  }, [switchCheckList, reduxList])

  const handleChangeReasonForSkip = (reason, id) => {
    setReduxList(
      reduxList.map((ckl) =>
        ckl.id === id ? { ...ckl, statusReason: reason } : ckl,
      ),
    )
    setCheckListToUpdate({
      ...checkListToUpdate,
      checklist: {
        ...checkListToUpdate.checklist,
        checklist_skipped_reason: {
          ...checkListToUpdate.checklist.checklist_skipped_reason,
          [id]: reason,
        },
      },
    })
  }

  const handleChangeCheckBox = (e) => {
    setReviewSubmit(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setisSubmitting(true)
    const cleanValues = {
      ...checkListToUpdate,
      submit_for_review: reviewSubmit ? 'on' : 'off',
      login_user_id: JSON.parse(localStorage.getItem('userDetail'))?.user_id,
    }
    restClient
      .patch(`${API_URL}/projects/${projectId}`, cleanValues, true)
      .then(() => {
        dispatch(fetchProjectDetailForTimeLog(projectId))
        setReviewSubmit(false)
        openNotification({
          type: 'success',
          message: 'CheckList Saved Sucessfully',
        })
      })
      .catch((error) => {
        openNotification({
          type: 'error',
          message:
            error.response?.data?.message || 'could not update checklist',
        })
      })
      .finally(() => {
        setisSubmitting(false)
      })
  }

  const handleComplete = (id) => {
    const listData = reduxList.map((x) =>
      x.id === id
        ? {
            ...x,
            statustype: x.statustype === 'completed' ? '' : 'completed',
          }
        : x,
    )
    setReduxList(listData)
    setCheckListToUpdate({
      ...checkListToUpdate,
      checklist: {
        ...checkListToUpdate.checklist,
        item_status: {
          ...checkListToUpdate.checklist.item_status,
          [id]:
            reduxList.find((x) => x.id === id).statustype === 'completed'
              ? ''
              : 'completed',
        },
      },
    })
  }

  const handleSkip = (id) => {
    const listData = reduxList.map((x) =>
      x.id === id
        ? {
            ...x,
            statustype: x.statustype === 'skipped' ? '' : 'skipped',
          }
        : x,
    )
    setReduxList(listData)
    setCheckListToUpdate({
      ...checkListToUpdate,
      checklist: {
        ...checkListToUpdate.checklist,
        item_status: {
          ...checkListToUpdate.checklist.item_status,
          [id]:
            reduxList.find((x) => x.id === id).statustype === 'skipped'
              ? ''
              : 'skipped',
        },
      },
    })
  }

  const CheckListButtonText = () => {
    if (isSubmitting) return 'Saving CheckList ...'
    return reviewSubmit ? 'Submit for review >>' : 'Save Checklist'
  }

  if (errorFromApi !== null) {
    openNotification({
      type: 'error',
      message: errorFromApi,
    })
  }

  return (
    <Card className={styles.checkList}>
      <div className={`${styles.buttons}`}>
        <Button
          onClick={() => setSwitchCheckList('all')}
          btnText="All"
          style={{ fontWeight: 'bold', background: 'white', color: 'black' }}
        />
        <Button
          onClick={() => setSwitchCheckList('completed')}
          btnText="Completed"
          style={{
            fontWeight: 'bold',
            background: 'rgb(30, 128, 91)',
            color: 'white',
          }}
        />
        <Button
          onClick={() => setSwitchCheckList('skipped')}
          btnText="Skipped"
          style={{
            fontWeight: 'bold',
            background: 'rgb(187, 15, 70)',
            color: 'white',
          }}
        />
        <Button
          onClick={() => setSwitchCheckList('')}
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
              handleChangeReasonForSkip={handleChangeReasonForSkip}
            />
          ))}
        </ol>

        <div className={styles.row}>
          <div className={styles.checkbox}>
            <Checkbox onChange={handleChangeCheckBox} />
            <label htmlFor="submit_for_review">Submit for review:</label>
          </div>
          <div>
            <Button
              btnText={CheckListButtonText()}
              htmlType="submit"
              style={reviewSubmit ? { backgroundColor: '#5cb85c' } : {}}
              isDisabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </Card>
  )
}

export default CheckList
