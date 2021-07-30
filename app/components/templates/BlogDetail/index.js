import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getDate } from 'utils/date'
import HTMLReactParser from 'html-react-parser'
import PasswordProtected from 'components/elements/PasswordProtected'
import styles from './styles.module.css'

const BlogDetail = ({ blogDetail, blogs, categories }) => {
  const [anotherBlog, setAnotherBlog] = useState({ prev: {}, next: {} })
  const getCategories = (ids) => categories.filter((x) => ids.includes(x.id))

  useEffect(() => {
    const setBlogs = () => {
      const indexofBlog = blogs.findIndex((x) => x.id === blogDetail.id)
      const previousBlog = blogs[indexofBlog - 1] || {}
      const nextBlog = blogs[indexofBlog + 1] || {}
      setAnotherBlog({ prev: previousBlog, next: nextBlog })
    }
    setBlogs()
  }, [blogs, blogDetail])

  return (
    <div className={styles.blogDetail}>
      <div className={styles.header}>
        <h1 className={styles.entry_title}>
          {blogDetail.content.protected && 'Protected:'}{' '}
          {blogDetail.title.rendered}
        </h1>
        <strong>Posted on {getDate(blogDetail.date)} by Krishna</strong>
      </div>
      <div className={styles.entry_content}>
        {blogDetail.content.protected ? (
          <PasswordProtected />
        ) : (
          HTMLReactParser(blogDetail.content.rendered)
        )}
      </div>
      <div className={styles.entry_footer}>
        Posted in&nbsp;
        {getCategories(blogDetail.categories).map((y) => (
          <Link
            key={y.id}
            href={{
              pathname: `/category/${y.id}`,
            }}
          >
            <span className={styles.category}>{y.name},&nbsp;</span>
          </Link>
        ))}
        Edit
      </div>
      <div className={styles.navLinks}>
        {Object.values(anotherBlog.prev).length > 0 && (
          <div className={styles.navLink}>
            <Link href={{ pathname: `/blog/${anotherBlog.prev?.id}` }}>
              <span>
                <LeftOutlined /> {anotherBlog.prev?.title?.rendered}
              </span>
            </Link>
          </div>
        )}
        {Object.values(anotherBlog.next).length > 0 && (
          <div className={styles.navLink}>
            <Link href={{ pathname: `/blog/${anotherBlog.next?.id}` }}>
              <span>
                {anotherBlog.next?.title?.rendered} <RightOutlined />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({
  blogData: { blogDetail },
  commonData: { categories },
}) => ({
  blogDetail,
  categories,
})

export default connect(mapStateToProps)(BlogDetail)
