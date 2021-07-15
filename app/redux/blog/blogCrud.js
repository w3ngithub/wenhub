import api from 'api/restClient'
import { API_URL } from 'constants/constants'

// Fetching Blogs
const fetchBlog = `${API_URL}/posts?page=1&per_page=10`

export function getBlogs() {
  return api.get(fetchBlog)
}

// Paginating and Searching Blogs
function filterBlog(search_blog, page, perPage) {
  return `${API_URL}/posts?page=${page}&per_page=${perPage}${
    search_blog?.length > 0 ? `&search=${search_blog}` : ''
  }`
}

export function filterBlogs(search_blog, page, perPage) {
  return api.get(filterBlog(search_blog, page, perPage))
}

// Get Detail of Blog
function fetchDetailBlog(id) {
  return `${API_URL}/posts/${id}`
}

export function getDetailBlog(id) {
  return api.get(fetchDetailBlog(id))
}
