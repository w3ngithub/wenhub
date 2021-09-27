import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getDate } from 'utils/date'
import HTMLReactParser from 'html-react-parser'
import { changePage } from 'redux/blog/blogActions'
import PasswordProtected from 'components/elements/PasswordProtected'
import styles from './styles.module.css'

const BlogDetail = ({
  blogDetail,
  blogs,
  categories,
  allUsers,
  page,
  ...props
}) => {
  const router = useRouter()
  const [anotherBlog, setAnotherBlog] = useState({ prev: {}, next: {} })
  const getCategories = (ids) => categories.filter((x) => ids.includes(x.id))

  useEffect(() => {
    const setBlogs = () => {
      // First 0 index is previous and 2 last index is next blog
      const currentIndex = blogs.findIndex((x) => x.id === blogDetail.id)
      const previousBlog = blogs[currentIndex - 1] || {}
      const nextBlog = blogs[currentIndex + 1] || {}
      setAnotherBlog({ prev: previousBlog, next: nextBlog })
    }
    setBlogs()
  }, [blogs, blogDetail])

  const gotoPrev = () => {
    props.changePage({
      pageNumber: page.pageNumber,
      postPerPage: page.postPerPage,
      offset: page.offset - 1,
    })
    router.push(`/blog/${anotherBlog.prev?.id}`)
  }
  const gotoNext = () => {
    props.changePage({
      pageNumber: page.pageNumber,
      postPerPage: page.postPerPage,
      offset: page.offset + 1,
    })
    router.push(`/blog/${anotherBlog.next?.id}`)
  }

  return (
    <div className={styles.blogDetail}>
      <div className={styles.header}>
        <h1 className={styles.entry_title}>
          {blogDetail.content.protected && 'Protected:'}{' '}
          {blogDetail.title.rendered}
        </h1>
        <strong>
          Posted on {getDate(blogDetail.date)}{' '}
          {allUsers?.find((u) => u.id === blogDetail.author)?.name}
        </strong>
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
            <span
              role="link"
              onClick={gotoPrev}
              onKeyDown={() => {}}
              tabIndex={0}
            >
              <LeftOutlined /> {anotherBlog.prev?.title?.rendered}
            </span>
          </div>
        )}
        {Object.values(anotherBlog.next).length > 0 && (
          <div className={styles.nextLink}>
            <span
              role="link"
              onClick={gotoNext}
              onKeyDown={() => {}}
              tabIndex={0}
            >
              {anotherBlog.next?.title?.rendered} <RightOutlined />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({
  blogData: { blogDetail, page },
  commonData: { categories },
  lmsData: { allUsers },
}) => ({
  blogDetail,
  categories,
  allUsers,
  page,
})

export default connect(mapStateToProps, { changePage })(BlogDetail)
