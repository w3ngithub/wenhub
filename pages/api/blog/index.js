import { filterBlogs } from 'redux/blog/blogCrud'

export default async ({ query }, res) => {
  const response = await filterBlogs(
    query.search_blog,
    query.page,
    query.perPage,
  )
  res
    .status(200)
    .json({ data: response.data, totalData: response.headers['x-wp-total'] })
}
