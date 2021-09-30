import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
  activeMediaTabAction,
  // addingselectedFilesFromMedia,
  addMediaFiles,
  getAllMediaFiles,
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
  const dispatch = useDispatch()

  const onChange = (info) => {
    setFileList(info.fileList)
    const { status } = info.file
    if (status !== 'uploading') {
      dispatch(addMediaFiles(info.fileList.map((file) => file.originFileObj)))
    }
    if (status === 'done') {
      console.log(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`)
    }
  }

  const customRequest = (options) => {
    console.log(options)
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
      .post(`${API_URL}/media`, formData, { headers })
      .then((res) => {
        options.onSuccess(options.file)
        // dispatch(addingselectedFilesFromMedia(res.data))
        dispatch(getAllMediaFiles())
        openNotification({
          type: 'success',
          message: `${options.file.name} Uploaded Successfully`,
        })

        dispatch(activeMediaTabAction('2'))
      })
      .catch((err) => {
        console.log('err', JSON.stringify(err))
        openNotification({
          type: 'error',
          message: `${options.file.name} Upload failed`,
        })
        options.onError(`${options.file.name} Upload failed`)
      })
  }

  const props = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    onChange,
    customRequest,
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
