import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Row, Col, Card } from 'antd'
import FormField from 'elements/Form'
import ButtonComponent from 'components/elements/Button'
import { Paginate } from 'components/elements/Pagination'
import parse from 'html-react-parser'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getDate } from 'utils/date'
import useDidMountEffect from 'hooks/useDidMountEffect'
import { fetchFilteredBlogs, changePage } from 'redux/blog/blogActions'
import styles from './styles.module.css'

const Blog = ({ blogs, totalData, categories, page, ...props }) => {
  const [searchBlog, setSearchBlog] = useState('')
  const [screenWidth, setScreenWidth] = useState(null)
  const [text, setText] = useState('')

  useDidMountEffect(
    () =>
      props.fetchFilteredBlogs(searchBlog, page.pageNumber, page.postPerPage),
    [searchBlog, page],
  )
  useEffect(() => {
    const HandleScreenWidthChange = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', HandleScreenWidthChange)
    HandleScreenWidthChange()
    return () => window.removeEventListener('resize', HandleScreenWidthChange)
  }, [])

  const getCategories = (ids) => categories.filter((x) => ids.includes(x.id))

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchBlog(text)
    props.changePage({ pageNumber: 1, postPerPage: 10 })
  }

  return (
    <div className={classNames(styles.blog, 'all_blogs')}>
      <form className={styles.form} onSubmit={handleSearch}>
        <FormField
          component="InputField"
          placeholder="Search Blog"
          borderRadius="3px"
          width="100%"
          padding="7px"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <ButtonComponent
          btnText="Search Blog"
          htmlType="submit"
          style={{ width: '100px' }}
        />
      </form>

      <Row gutter={[12, 24]}>
        {blogs.map((x) => (
          <Col sm={24} md={12} key={x.id}>
            <Card
              bodyStyle={
                screenWidth > 767 ? { padding: '0 24px' } : { padding: '0' }
              }
              title={
                <>
                  <Link
                    href={{
                      pathname: `/blog/${x.id}`,
                    }}
                  >
                    <h3 className={styles.heading}>
                      {x.excerpt.protected && 'Protected:'} {x.title.rendered}
                    </h3>
                  </Link>
                  <strong>
                    <i>Posted on {getDate(x.date)}</i>
                  </strong>
                </>
              }
            >
              <div className={styles.content}>
                <div className={styles.paragraph}>
                  {x.content.protected
                    ? 'There is no excerpt because this is a protected post.'
                    : parse(x.excerpt.rendered)}
                </div>
                <div className={styles.actionContent}>
                  Posted in&nbsp;
                  {getCategories(x.categories).map((y) => (
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
            </Card>
          </Col>
        ))}
        <Col sm={24} md={12}>
          <Paginate
            pageSize={page.postPerPage}
            length={+totalData}
            currentPage={page.pageNumber}
            handlePageChange={(pgNo, pgSz) =>
              props.changePage({ pageNumber: pgNo, postPerPage: pgSz })
            }
          />
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = ({
  blogData: { blogs, loading, totalData, page },
  commonData: { categories },
}) => ({
  blogs,
  loading,
  totalData,
  categories,
  page,
})

export default connect(mapStateToProps, { fetchFilteredBlogs, changePage })(
  Blog,
)
