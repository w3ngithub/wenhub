import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  clearRemoteSelectedFiles,
  resetSelectedFilesFromMedia,
} from 'redux/addMedia/addMediaActions'
import { CameraOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import QuillEditor from 'components/elements/QuillEditor'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import Modal from 'components/elements/Modal'
import Tab from 'components/elements/Tabs'
import UploadFiles from 'components/modules/UploadFiles'
import MediaLibrary from 'components/modules/MediaLibrary'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const AddBlog = () => {
  const [loading, setLoading] = useState(false)
  const [getKey, setGetKey] = useState(1)
  const [category, setCategory] = useState([])
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [modelOpen, setModelOPen] = useState(false)

  const { remoteSelectedFiles } = useSelector(
    (state) => state.addMedia,
    shallowEqual,
  )
  const { categories } = useSelector((state) => state.commonData, shallowEqual)
  const dispatch = useDispatch()

  const isRemoteFileSelected = remoteSelectedFiles.length > 0

  const handleInsertIntoPage = () => {
    setContent(
      `<p>${remoteSelectedFiles
        .map((file) => `<img src=${file.guid.rendered} />`)
        .join('')}</p>`,
    )

    setModelOPen(false)
    dispatch(clearRemoteSelectedFiles())
    dispatch(resetSelectedFilesFromMedia())
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (title !== '') {
      setLoading(true)
      const cleanValues = {
        title,
        content,
        categories: category.length ? category.toString() : '1',
        status: 'publish',
      }
      restClient
        .post(`${API_URL}/posts`, cleanValues, true)
        .then(() => {
          openNotification({
            type: 'success',
            message: 'Blog added sucessfully',
          })
          setContent('')
          setTitle('')
          setCategory([])
        })
        .catch((err) => {
          openNotification({
            type: 'error',
            message:
              err.response.data.message || 'Add Blog failed!. Try again later.',
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
    if (title === '') {
      openNotification({ type: 'info', message: 'please add title of blog' })
    }
  }

  return (
    <>
      <div className={styles.blog_editor}>
        <form className={styles.form_editor} onSubmit={handleSubmit}>
          <h2 className={styles.text_center}>Add New Blog</h2>
          <div className={styles.blog_title}>
            <label htmlFor="blog_title">Blog Title</label>
            <FormField
              component="InputField"
              name="blog_title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>
          <div className={styles.blog_content}>
            <label htmlFor="blog_content">Content</label>
            <ButtonComponent
              btnText="Add Media"
              style={{ maxWidth: '125px' }}
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
                options={categories.map((c) => ({
                  label: c?.name,
                  value: c?.id,
                }))}
                onChange={(d) => setCategory(d)}
              />
            </div>
          </div>
          <ButtonComponent
            btnText={loading ? 'Publishing...' : 'Publish'}
            htmlType="submit"
            style={{ width: '90px', marginTop: '12px' }}
            isDisabled={loading}
          />
        </form>
      </div>
      <div className="add_Blog_modal">
        <Modal
          visible={modelOpen}
          handleCancel={() => setModelOPen(false)}
          title="Add Media"
          footer={[
            <div className={styles.footer}>
              <div>
                {isRemoteFileSelected && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <div>
                      {' '}
                      <p>
                        {remoteSelectedFiles.length} item
                        {remoteSelectedFiles.length > 1 ? 's' : ''} selected
                      </p>
                      <div
                        onClick={() => dispatch(clearRemoteSelectedFiles())}
                        aria-hidden="true"
                      >
                        <p
                          style={{
                            color: '#d63638',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                          }}
                        >
                          clear
                        </p>
                      </div>
                    </div>
                    <span className={styles.footer_images}>
                      {remoteSelectedFiles.map((file) => (
                        <img
                          key={file.id}
                          src={file.media_details?.sizes?.thumbnail?.source_url}
                          alt="media files"
                          height="30px"
                          width="30px"
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>
              <ButtonComponent
                key="insert_into_page"
                btnText="Insert Into Page"
                onClick={handleInsertIntoPage}
                isDisabled={!isRemoteFileSelected}
              />
            </div>,
          ]}
        >
          <div
            className={classNames(
              styles.modal_container,
              'modal_container_add_media',
            )}
          >
            <Tab
              activeKey={getKey}
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
                  content: <UploadFiles />,
                },
                {
                  id: '2',
                  tab: 'Media Library',
                  content: <MediaLibrary />,
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
