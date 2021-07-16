import React, { useState } from 'react'
import { Checkbox } from 'antd'
import QuillEditor from 'components/elements/QuillEditor'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'
import styles from './styles.module.css'

const categories = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Our Test', value: 'our_test' },
]

const AddBlog = () => {
  const [category, setCategory] = useState([])
  const [content, setContent] = useState('')

  return (
    <div className={styles.blog_editor}>
      <form className={styles.form_editor}>
        <h2 className={styles.text_center}>Add New Blog</h2>
        <div className={styles.blog_title}>
          <label htmlFor="blog_title">Blog Title</label>
          <FormField component="InputField" name="blog_title" value="" />
        </div>
        <div className={styles.blog_content}>
          <label htmlFor="blog_content">Content</label>
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
  )
}

export default AddBlog
