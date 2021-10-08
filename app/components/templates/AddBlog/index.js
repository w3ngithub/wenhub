import React, { useState } from 'react'
import { Tabs, Checkbox } from 'antd'
import dynamic from 'next/dynamic'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import {
  activeMediaTabAction,
  clearRemoteSelectedFiles,
  resetSelectedFilesFromMedia,
  resetselectedfilesfromUplaodFetchAction,
  setQuillRefAction,
} from 'redux/addMedia/addMediaActions'
import { CameraOutlined } from '@ant-design/icons'
// import QuillEditor from 'components/elements/QuillEditor'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import Modal from 'components/elements/Modal'
import UploadFiles from 'components/modules/UploadFiles'
import MediaLibrary from 'components/modules/MediaLibrary'
import restClient from 'api/restClient'
import { API_URL } from 'constants/constants'
import { openNotification } from 'utils/notification'
import styles from './styles.module.css'

const QuillEditor = dynamic(() => import('components/elements/QuillEditor'), {
  ssr: false,
})

const { TabPane } = Tabs

const AddBlog = () => {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [modelOpen, setModelOPen] = useState(false)

  const { remoteSelectedFiles, activeMediaTab } = useSelector(
    (state) => state.addMedia,
    shallowEqual,
  )
  const { categories } = useSelector((state) => state.commonData, shallowEqual)
  const dispatch = useDispatch()

  const isRemoteFileSelected = remoteSelectedFiles.length > 0

  const handleInsertIntoPage = () => {
    setContent((prev) =>
      prev.concat(`<p>
      ${remoteSelectedFiles
        .map((file) => {
          if (file.mime_type.split('/')[0] === 'image')
            return `<img src=${file.guid.rendered} />`
          return dispatch(setQuillRefAction(file.source_url))
        })
        .join('')}
        </p>`),
    )

    setModelOPen(false)
    dispatch(clearRemoteSelectedFiles())
    dispatch(resetSelectedFilesFromMedia())
    dispatch(resetselectedfilesfromUplaodFetchAction())
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
                      {remoteSelectedFiles.map((file) => {
                        if (file.mime_type.split('/')[0] === 'image')
                          return (
                            <img
                              key={file.id}
                              src={
                                file.media_details?.sizes?.thumbnail?.source_url
                              }
                              alt="media files"
                              height="30px"
                              width="30px"
                            />
                          )
                        return (
                          <video key={file.id} height="30px" width="30px">
                            <source src={file.source_url} />
                          </video>
                        )
                      })}
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
            <Tabs
              type="card"
              tabBarStyle={{
                background: '#fff',
                width: 'auto',
                overFlowX: 'scroll',
                whiteSpace: 'nowrap',
              }}
              activeKey={activeMediaTab}
              onChange={(value) => dispatch(activeMediaTabAction(value))}
            >
              {[
                {
                  id: '1',
                  tab: 'Upload Files',
                  contents: <UploadFiles />,
                },
                {
                  id: '2',
                  tab: 'Media Library',
                  contents: <MediaLibrary />,
                },
              ].map(({ id, tab, contents }) => (
                <TabPane key={id} tab={tab}>
                  <div style={{ paddingTop: '15px' }}>{contents}</div>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default AddBlog
