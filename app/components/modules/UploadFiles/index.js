import React, { useEffect, useState } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
  activeMediaTabAction,
  getAllMediaFiles,
  selectedfilesfromUplaodFetchAction,
} from 'redux/addMedia/addMediaActions'
import { API_URL } from 'constants/constants'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const { Dragger } = Upload
const allowedFileTypes = ['image', 'video']

const warning = (msg) => {
  message.warning(msg)
}

function UplaodFiles() {
  const [FileList, setFileList] = useState([])
  const [fileListStatus, setFileListStatus] = useState('')
  const [withToken, settWithToken] = useState([])
  const [isCancel, setIsCancel] = useState(false)

  const dispatch = useDispatch()

  const onChange = (info) => {
    setFileList([...info.fileList])
    const { status } = info.file
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`)
    }
  }

  const customRequest = (options) => {
    const cancelTokenSource = axios.CancelToken.source()
    settWithToken([...withToken, { cancelTokenSource, file: options.file }])
    const formData = new FormData()
    formData.append('file', options.file)
    formData.append('title', options.file.name)
    const headers = {}
    // eslint-disable-next-line prefer-template
    headers['Content-Disposition'] =
      "form-data; filename='" + options.file?.name + "'"
    headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userDetail'))?.token
    }`
    headers['Content-Type'] = 'multipart/form-data'

    axios
      .post(`${API_URL}/media`, formData, {
        cancelToken: cancelTokenSource.token,
        headers,
        onUploadProgress: ({ total, loaded }) => {
          options.onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            options.file,
          )
        },
      })
      .then((res) => {
        options.onSuccess(options.file)
        dispatch(getAllMediaFiles())
        openNotification({
          type: 'success',
          message: `${options.file.name} Uploaded Successfully`,
        })
        dispatch(selectedfilesfromUplaodFetchAction(res.data.id))
      })
      .catch(() => {
        if (isCancel) {
          console.log('iscancel', isCancel)
          openNotification({
            type: 'error',
            message: `Upload Failed`,
            description: `${options.file.name}`,
          })
          options.onError(`${options.file.name} Upload Failed`)
        }
      })
      .finally(() => {
        setIsCancel(false)
      })
  }

  useEffect(() => {
    if (FileList.length !== 0 && fileListStatus === 'done') {
      setFileList([])
      settWithToken([])
      dispatch(activeMediaTabAction('2'))
    }
    return () => {
      setFileListStatus('')
    }
  }, [FileList, fileListStatus])

  const props = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    onChange,
    fileList: FileList,
    customRequest,
    showUploadList: true,
    itemRender: (element, file, filelist) => {
      if (
        filelist.every((item) => item.status === 'done') &&
        file.status === 'done'
      ) {
        setFileListStatus('done')

        return null
      }
      setFileListStatus('')
      return element
    },
    beforeUpload: (file) => {
      if (!allowedFileTypes.includes(file.type.split('/')[0])) {
        warning('Invalid File.Only images and vedios are allowed')
      }
      if (file.size > 500 * 1024 * 1024) {
        warning('File size limit exceed 500MB.')
      }
      return allowedFileTypes.includes(file.type.split('/')[0]) &&
        file.size < 500 * 1024 * 1024
        ? true
        : Upload.LIST_IGNORE
    },
    onRemove: (e) => {
      setIsCancel(true)
      withToken.find((f) => f.file.uid === e.uid).cancelTokenSource.cancel()
      openNotification({
        type: 'error',
        message: ` Upload Cancel`,
        description: `${e.name}`,
      })
    },
  }

  return (
    <div className={styles.upload_files_container}>
      <div className={styles.upload_files_dropzone}>
        <Dragger {...props} fileList={FileList}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Maximum size limit is 500 MB</p>
        </Dragger>
      </div>
    </div>
  )
}

export default UplaodFiles
