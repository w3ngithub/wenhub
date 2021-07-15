import { filterBlogs } from 'redux/blog/blogCrud'

export default async ({ query: { search_blog, page, perPage } }, res) => {
  const response = await filterBlogs(search_blog, page, perPage)
  res
    .status(200)
    .json({ data: response.data, totalData: response.headers['x-wp-total'] })
}
