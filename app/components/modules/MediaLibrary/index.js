import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { SelectableGroup, createSelectable } from 'react-selectable'
import { Popconfirm } from 'antd'
import {
  deleteMediaFiles,
  getAllMediaFiles,
  remoteMediaFilesSelected,
} from 'redux/addMedia/addMediaActions'
import classNames from 'classnames'
import moment from 'moment'
import useScreenWidthHeightHook from 'hooks/useScreenWidthHeightHook'
import Loader from 'components/elements/Loader'
import SelectComponent from 'components/elements/Select'
import FormField from 'components/elements/Form'
import { openNotification } from 'utils/notification'
import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'
import styles from './styles.module.css'
import style from './styles.module.scss'

const SelectableFile = ({ children, selected, onClick }) => (
  <div className={style.card}>
    <div
      className={classNames(style.selectable, { [style.selected]: selected })}
      onClick={onClick}
      onKeyDown={onClick}
      aria-hidden="true"
    >
      {children}
      {selected && (
        <div className={style.check}>
          <span className={style.checkmark}></span>
        </div>
      )}
    </div>
  </div>
)

const SelectableComponent = createSelectable(SelectableFile)

function MediaLibrary() {
  let media = []
  const {
    loading,
    remoteMedialFiles,
    remoteSelectedFiles,
    error,
    remoteSelectedFilesfromMedia,
    selectedfilesfromUplaod,
  } = useSelector((state) => state.addMedia, shallowEqual)
  const dispatch = useDispatch()

  const [selectedKeys, setSelectedKeys] = useState([
    ...remoteSelectedFiles.map((file) => file?.id),
  ])
  const [searchValue, setSearchValue] = useState('')
  const [remoteMediaFilesDropDown, selectedRemoteFilesDropdown] = useState([])
  const [dateSearchFiles, setDateSearchFiles] = useState({
    label: 'All Dates',
    value: '',
  })
  const [medialTypeSearchFiles, setMedialTypeSearchFiles] = useState({
    label: 'All Media Items',
    value: '1',
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const [screenWidth] = useScreenWidthHeightHook()

  // useEffect(() => {
  //   if (selectedfilesfromUplaod.length !== 0) {
  //     console.log('selectedfilesfromUplaod', selectedfilesfromUplaod)
  //     setSelectedKeys([...selectedfilesfromUplaod])
  //   }
  // }, [selectedfilesfromUplaod])
  console.log('selectedfilesfromUplaod', selectedfilesfromUplaod)

  useEffect(() => {
    setSelectedKeys([
      ...selectedKeys,
      ...remoteSelectedFilesfromMedia.map((file) => file.id),
    ])
  }, [remoteSelectedFilesfromMedia])

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  if (error !== '') {
    openNotification({
      type: 'error',
      message: error || 'could not load files',
    })
  }

  if (searchValue) {
    media = remoteMediaFilesDropDown.filter((file) =>
      file.title.rendered.includes(searchValue),
    )
  } else {
    media = remoteMediaFilesDropDown
  }

  const mediaDetailsStyle = () => {
    if (screenWidth < 767) {
      if (remoteSelectedFiles.length > 0) {
        return 'block'
      }
      return 'none'
    }
    return 'block'
  }

  // delete remote media file
  const confirm = () => {
    setIsDeleting(true)
    restClient
      .del(
        `${API_URL}/media/delete?ids=${remoteSelectedFiles
          ?.map((file) => file.id)
          .toString()}`,
      )
      .then(() => {
        openNotification({
          type: 'success',
          message: 'File deleted successfully',
        })
        dispatch(
          deleteMediaFiles([...remoteSelectedFiles.map((file) => file.id)]),
        )
      })
      .catch((err) => {
        openNotification({
          type: 'error',
          message: err.response?.data?.message || 'Could not delete file',
        })
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  // selection of files by dragging
  const handleSelection = (selectedKeyss) => {
    setSelectedKeys(selectedKeyss)
  }

  // selection of files by clicking
  const handleSelectImageByClick = (id) => {
    if (selectedKeys.indexOf(id) > -1) {
      setSelectedKeys([...selectedKeys.filter((key) => key !== id)])
    } else {
      setSelectedKeys([...selectedKeys, id])
    }
  }

  // clear selectedKeys if remoteSelectedFiles is clear from model footer
  useEffect(() => {
    if (remoteSelectedFiles.length === 0) {
      setSelectedKeys([])
    }
  }, [remoteSelectedFiles])

  // api call to get media files from server and store to redux
  useEffect(() => {
    const getMediaFiles = async () => {
      dispatch(getAllMediaFiles())
    }
    getMediaFiles()
  }, [])

  // show date specific files and file type specific files to user
  useEffect(() => {
    selectedRemoteFilesDropdown(
      remoteMedialFiles.filter((file) => {
        if (dateSearchFiles.value === '' && medialTypeSearchFiles.value === '1')
          return true
        if (dateSearchFiles.value === '')
          return file.mime_type.split('/')[0] === medialTypeSearchFiles.value
        if (medialTypeSearchFiles.value === '1')
          return moment(file.date) >= moment(dateSearchFiles.value)
        return (
          moment(file.date) >= moment(dateSearchFiles.value) &&
          file.mime_type.split('/')[0] === medialTypeSearchFiles.value
        )
      }),
    )
  }, [dateSearchFiles.value, medialTypeSearchFiles.value, remoteMedialFiles])

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
                    value={medialTypeSearchFiles}
                    options={[
                      { label: 'All Media Items', value: '1' },
                      { label: 'Images', value: 'image' },
                      { label: 'Videos', value: 'video' },
                    ]}
                    style={{
                      width: '100%',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      minWidth: '155px',
                    }}
                    onChange={(value) => setMedialTypeSearchFiles(value)}
                  />
                  <SelectComponent
                    value={dateSearchFiles}
                    onChange={(value) => setDateSearchFiles(value)}
                    options={[
                      { label: 'All Dates', value: '' },
                      { label: 'July 2021', value: '2021/07' },
                      { label: 'June 2021', value: '2021/06' },
                      { label: 'May 2018', value: '2018/05' },
                      { label: 'August 2017', value: '2017/08' },
                      { label: 'July 2017', value: '2017/07' },
                      { label: 'June 2017', value: '2017/06' },
                    ]}
                    style={{
                      width: '100%',
                      minWidth: '155px',
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
                        onClick={() => handleSelectImageByClick(item.id)}
                      >
                        {item.mime_type.split('/')[0] === 'image' ? (
                          <Image
                            src={
                              item?.media_details?.sizes?.thumbnail?.source_url
                            }
                            alt={item.alt_text}
                            height={125}
                            width={125}
                          />
                        ) : (
                          <video style={{ width: '118px', height: '120px' }}>
                            <source src={item.source_url} />
                          </video>
                        )}
                      </SelectableComponent>
                    )
                  })
                )}
              </SelectableGroup>
            </div>
          </div>

          {isDeleting && (
            <div className={styles.deleting_loading_container}>
              <Loader />
            </div>
          )}
          <div
            className={styles.media_details}
            style={{
              display: mediaDetailsStyle(),
            }}
          >
            {remoteSelectedFiles.length > 0 && (
              <>
                <h4>ATTACHMENT DETAILS</h4>
                <div
                  className={style.card}
                  style={{ border: '4px solid transparent', margin: '0' }}
                >
                  {remoteSelectedFiles[
                    remoteSelectedFiles.length - 1
                  ].mime_type.split('/')[0] === 'image' ? (
                    <Image
                      src={
                        remoteSelectedFiles[remoteSelectedFiles.length - 1]
                          .media_details?.sizes?.thumbnail?.source_url
                      }
                      alt={
                        remoteSelectedFiles[remoteSelectedFiles.length - 1]
                          .alt_text
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
                  ) : (
                    <video style={{ width: '118px', height: '120px' }} autoPlay>
                      <source
                        src={
                          remoteSelectedFiles[remoteSelectedFiles.length - 1]
                            .source_url
                        }
                      />
                    </video>
                  )}
                </div>
                <p>
                  {
                    remoteSelectedFiles[remoteSelectedFiles.length - 1].title
                      .rendered
                  }
                </p>
                <p className={style.singleMediaDetail}>
                  {moment(
                    remoteSelectedFiles[remoteSelectedFiles.length - 1].date,
                  ).format('MMMM Do YYYY')}
                </p>
                <p className={style.singleMediaDetail}>
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
                <p className={style.singleMediaDetail}>
                  Original Image:
                  <span style={{ color: '#2271b1' }}>
                    {
                      remoteSelectedFiles[remoteSelectedFiles.length - 1]
                        .media_details.original_image
                    }
                  </span>
                </p>
                <p className={style.singleMediaDetail}>
                  <a
                    style={{ color: '#2271b1' }}
                    target="_blank"
                    href={`https://wendevs.com/wenhub-rt/wp-admin/post.php?post=${
                      remoteSelectedFiles[remoteSelectedFiles.length - 1].id
                    }&action=edit&image-editor`}
                  >
                    Edit Image
                  </a>
                </p>
                <p
                  className={style.singleMediaDetail}
                  style={{
                    color: '#d63638',
                    cursor: 'pointer',
                  }}
                >
                  <Popconfirm
                    title="Are you sure to delete Selected Files?"
                    onConfirm={() => confirm()}
                    okText="Yes"
                    cancelText="Cancel"
                  >
                    Delete Permanently
                  </Popconfirm>
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
