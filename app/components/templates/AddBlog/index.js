import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { emptyMediaFiles } from 'redux/addMedia/addMediaActions'
import { CameraOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import QuillEditor from 'components/elements/QuillEditor'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import Modal from 'components/elements/Modal'
import Tab from 'components/elements/Tabs'
import UploadFiles from 'components/modules/UploadFiles'
import MediaLibrary from 'components/modules/MediaLibrary'
import styles from './styles.module.css'

const categories = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Our Test', value: 'our_test' },
]

const AddBlog = () => {
  const [getKey, setGetKey] = useState('')
  const [category, setCategory] = useState([])
  const [content, setContent] = useState('')
  const [clearUploadFiles, setclearUploadFiles] = useState(false)
  const [modelOpen, setModelOPen] = useState(false)

  const { files, remoteSelectedFiles } = useSelector(
    (state) => state.addMedia,
    shallowEqual,
  )
  const dispatch = useDispatch()

  const isFilesSelected = files.length > 0
  const isRemoteFileSelected = remoteSelectedFiles.length > 0

  const handleInsertIntoPage = () => {
    if (+getKey === 1) {
      setContent(`<p>content</p>`)
    } else if (+getKey === 2) {
      setContent(
        `<p>${remoteSelectedFiles
          .map((file) => `<img src=${file.guid.rendered} />`)
          .join('')}</p>`,
      )
    }
    setModelOPen(false)
    setclearUploadFiles(true)
    dispatch(emptyMediaFiles())
  }

  return (
    <>
      <div className={styles.blog_editor}>
        <form className={styles.form_editor}>
          <h2 className={styles.text_center}>Add New Blog</h2>
          <div className={styles.blog_title}>
            <label htmlFor="blog_title">Blog Title</label>
            <FormField component="InputField" name="blog_title" value="" />
          </div>
          <div className={styles.blog_content}>
            <label htmlFor="blog_content">Content</label>
            <ButtonComponent
              btnText="Add Media"
              style={{ marginBottom: '5px' }}
              icon={<CameraOutlined />}
              htmlType="button"
              onClick={() => setModelOPen(true)}
            />
            <QuillEditor
              name="blog_content"
              value={content}
              onChange={(value) => setContent(value)}
              className={styles.content_editor}
            />
          </div>
          <div className={styles.blog_categories}>
            <label htmlFor="blog_categories">Choose Categories</label>
            <div id="blog_categories">
              <Checkbox.Group
                value={category}
                options={categories}
                onChange={(d) => setCategory(d)}
              />
            </div>
          </div>
          <ButtonComponent
            btnText="Publish"
            htmlType="submit"
            style={{ width: '90px', marginTop: '12px' }}
          />
        </form>
      </div>
      <div className="add_Blog_modal">
        <Modal
          visible={modelOpen}
          handleCancel={() => setModelOPen(false)}
          title="Add Media"
          footer={[
            <ButtonComponent
              key="insert_into_page"
              btnText="Insert Into Page"
              onClick={handleInsertIntoPage}
              isDisabled={
                +getKey === 1 ? !isFilesSelected : !isRemoteFileSelected
              }
            />,
          ]}
        >
          <div
            className={classNames(
              styles.modal_container,
              'modal_container_add_media',
            )}
          >
            <Tab
              type="card"
              tabBarStyle={{
                background: '#fff',
                width: 'auto',
                overFlowX: 'scroll',
                whiteSpace: 'nowrap',
              }}
              tabs={[
                {
                  id: '1',
                  tab: 'Upload Files',
                  content: <UploadFiles clearUploadFiles={clearUploadFiles} />,
                },
                {
                  id: '2',
                  tab: 'Media Library',
                  content: <MediaLibrary clearUploadFiles={clearUploadFiles} />,
                },
              ]}
              getKey={(key) => {
                setGetKey(key)
              }}
            />
          </div>
        </Modal>
      </div>
    </>
  )
}

export default AddBlog
