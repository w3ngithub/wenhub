import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { getDate } from 'utils/date'
import HTMLReactParser from 'html-react-parser'
import styles from './styles.module.css'

const CategoryDetail = ({ category, blogs, categories }) => {
  const getCategories = (ids) => categories.filter((x) => ids.includes(x.id))
  return (
    <div>
      <div className={styles.categoryHead}>
        <h1>Category: {category.name}</h1>
      </div>
      {blogs.map((blog) => (
        <div className={styles.blog}>
          <div className={styles.postHead}>
            <Link
              href={{
                pathname: `/blog/${blog.id}`,
              }}
            >
              <h1 className={styles.head}>
                {blog.excerpt.protected && 'Protected:'} {blog.title.rendered}
              </h1>
            </Link>
            <strong>Posted on {getDate(blog.date)}</strong>
          </div>
          <div style={{ fontWeight: 'bold' }}>
            <div style={{ margin: '1.5em 0 0' }}>
              {blog.content.protected
                ? 'There is no excerpt because this is a protected post.'
                : HTMLReactParser(blog.excerpt.rendered)}
            </div>
          </div>
          <div style={{ fontWeight: 'bold' }}>
            Posted in&nbsp;
            {getCategories(blog.categories).map((y) => (
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
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  category: state.commonData.category,
  categories: state.commonData.categories,
  blogs: state.blogData.blogs,
})

export default connect(mapStateToProps)(CategoryDetail)
