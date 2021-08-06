import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { SelectableGroup, createSelectable } from 'react-selectable'
import {
  getAllMediaFiles,
  remoteMediaFilesSelected,
} from 'redux/addMedia/addMediaActions'
import classNames from 'classnames'
import moment from 'moment'
import Loader from 'components/elements/Loader'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import styles from './styles.module.css'
import style from './styles.module.scss'

const SelectableFile = ({ children, selected }) => (
  <div className={style.card}>
    <div
      className={classNames(style.selectable, { [style.selected]: selected })}
    >
      {children}
      <div className={style.check}>
        <span className={style.checkmark}>✔</span>
      </div>
    </div>
  </div>
)
const SelectableComponent = createSelectable(SelectableFile)

function MediaLibrary({ clearUploadFiles }) {
  let media = []
  const dispatch = useDispatch()
  const [selectedKeys, setSelectedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [remoteMediaFilesDropDown, selectedRemoteFilesDropdown] = useState([])
  const [dateSearchFiles, setDateSearchFiles] = useState({
    label: 'All Dates',
    value: 'all',
  })

  const { loading, remoteMedialFiles, remoteSelectedFiles } = useSelector(
    (state) => state.addMedia,
    shallowEqual,
  )

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  if (searchValue) {
    media = remoteMediaFilesDropDown.filter((file) =>
      file.title.rendered.includes(searchValue),
    )
  } else {
    media = remoteMediaFilesDropDown
  }

  // selection of files by dragging
  const handleSelection = (selectedKeyss) => {
    setSelectedKeys(selectedKeyss)
  }

  const mediaDetailsStyle = () => {
    if (window.matchMedia('(max-width: 726px)').matches) {
      if (remoteSelectedFiles.length > 0) {
        return 'block'
      }
      return 'none'
    }
    return 'block'
  }

  // selection of files by clicking
  const handleSelectImageByClick = (id) => {
    if (selectedKeys.indexOf(id) > -1) {
      setSelectedKeys([...selectedKeys.filter((key) => key !== id)])
    } else {
      setSelectedKeys([...selectedKeys, id])
    }
  }

  // api call to get media files from server and store to redux
  useEffect(() => {
    const getMediaFiles = async () => {
      dispatch(getAllMediaFiles())
    }
    getMediaFiles()
  }, [])

  // show date specific files to user
  useEffect(() => {
    selectedRemoteFilesDropdown(
      remoteMedialFiles.filter((file) => {
        if (dateSearchFiles.value === 'all') return true
        return moment(file.date) >= moment(dateSearchFiles.value)
      }),
    )
  }, [dateSearchFiles.value, remoteMedialFiles])

  // send selectd files to redux store
  useEffect(() => {
    if (selectedKeys.length) {
      const selectedRemoteFiles = media.filter((file) =>
        selectedKeys.includes(file.id),
      )
      dispatch(remoteMediaFilesSelected(selectedRemoteFiles))
    } else {
      dispatch(remoteMediaFilesSelected([]))
    }
  }, [JSON.stringify(selectedKeys)])

  // clear selected files
  useEffect(() => {
    if (clearUploadFiles) {
      setSelectedKeys([])
    }
  }, [clearUploadFiles])
  return (
    <div className={styles.add_media_container}>
      {loading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.media_view}>
            <div className={styles.media_action}>
              <div className={styles.media_filter}>
                <span>Filter Media</span>
                <div className={styles.filter_action}>
                  <SelectComponent
                    value={{ label: 'All Media Items', value: '1' }}
                    options={[
                      { label: 'All Media Items', value: '1' },
                      { label: 'Uploaded to this page', value: '2' },
                      { label: 'Images', value: '3' },
                    ]}
                    style={{
                      width: '100%',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textAlign: 'left',
                    }}
                  />
                  <SelectComponent
                    value={dateSearchFiles}
                    onChange={(value) => setDateSearchFiles(value)}
                    options={[
                      { label: 'All Dates', value: 'all' },
                      { label: 'July 2021', value: '2021/07' },
                      { label: 'June 2021', value: '2021/06' },
                      { label: 'May 2018', value: '2018/05' },
                      { label: 'August 2017', value: '2017/08' },
                      { label: 'July 2017', value: '2017/07' },
                      { label: 'June 2017', value: '2017/06' },
                    ]}
                    style={{
                      width: '100%',
                      minWidth: '170px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textAlign: 'left',
                    }}
                  />
                </div>
              </div>
              <div className={styles.media_search}>
                <span>Search</span>
                <FormField
                  component="InputField"
                  styles={{
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    padding: '6px',
                    width: '100%',
                  }}
                  value={searchValue}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className={styles.media_list}>
              <SelectableGroup
                onSelection={handleSelection}
                className={styles.selectable_group}
              >
                {media.length === 0 ? (
                  <h3>No Files to Show</h3>
                ) : (
                  media.map((item) => {
                    const selected = selectedKeys.indexOf(item.id) > -1
                    return (
                      <SelectableComponent
                        key={item.id}
                        selected={selected}
                        selectableKey={item.id}
                      >
                        <Image
                          src={item.media_details?.sizes?.thumbnail?.source_url}
                          alt={item.alt_text}
                          height={100}
                          width={100}
                          onClick={() => handleSelectImageByClick(item.id)}
                        />
                      </SelectableComponent>
                    )
                  })
                )}
              </SelectableGroup>
            </div>
          </div>
          <div
            className={styles.media_details}
            style={{
              display: mediaDetailsStyle(),
            }}
          >
            {remoteSelectedFiles.length > 0 && (
              <>
                {' '}
                <h3>ATTACHMENT DETAILS</h3>
                <Image
                  src={
                    remoteSelectedFiles[remoteSelectedFiles.length - 1]
                      .media_details?.sizes?.thumbnail?.source_url
                  }
                  alt={
                    remoteSelectedFiles[remoteSelectedFiles.length - 1].alt_text
                  }
                  height={
                    remoteSelectedFiles[remoteSelectedFiles.length - 1]
                      .media_details?.sizes?.thumbnail?.height
                  }
                  width={
                    remoteSelectedFiles[remoteSelectedFiles.length - 1]
                      .media_details?.sizes?.thumbnail?.width
                  }
                />
                <p>
                  {
                    remoteSelectedFiles[remoteSelectedFiles.length - 1].title
                      .rendered
                  }
                </p>
                <p>
                  {
                    remoteSelectedFiles[remoteSelectedFiles.length - 1]
                      .media_details.height
                  }{' '}
                  By{' '}
                  {
                    remoteSelectedFiles[remoteSelectedFiles.length - 1]
                      .media_details.width
                  }{' '}
                  Pixels
                </p>
                <p>
                  Original Image:
                  {remoteSelectedFiles[0].media_details.original_image}
                </p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MediaLibrary
